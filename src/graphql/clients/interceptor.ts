import {
    ApolloLink,
    FetchResult,
    GraphQLRequest,
    createHttpLink,
    gql,
} from '@apollo/client'
import Cookies from 'js-cookie'

import { Observable, print } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { GraphQLError } from 'graphql'
import { apolloClient } from './apolloClient'
import { parse } from 'url'
import { log } from 'console'
import { redirect } from 'next/navigation'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'

export const REFRESH_TOKEN = gql`
    mutation refreshTokens {
        refreshTokens {
            accessToken
            error
        }
    }
`

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
})

const authLink = setContext((operation, { headers }) => {
    let token = localStorage.getItem('accessToken') || ''
    console.log('token', token)
    return {
        headers: {
            ...headers,
            authorization: !!token ? `Bearer ${token}` : '',
        },
    }
})

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                console.log(err)
                switch ((err as any).code) {
                    case 'UNAUTHENTICATED':
                        console.log(1)

                        // ignore 401 error for a refresh request
                        if (operation.operationName === 'refreshTokens') return

                        const observable = new Observable<
                            FetchResult<Record<string, any>>
                        >((observer) => {
                            // used an annonymous function for using an async function
                            ;(async () => {
                                try {
                                    const response: any = await refreshToken()

                                    if (!response?.accessToken) {
                                        throw new GraphQLError(
                                            'Refresh token is expired '
                                        )
                                    }

                                    // Retry the failed request
                                    const subscriber = {
                                        next: observer.next.bind(observer),
                                        error: observer.error.bind(observer),
                                        complete:
                                            observer.complete.bind(observer),
                                    }

                                    forward(operation).subscribe(subscriber)
                                } catch (err) {
                                    if (typeof err == 'object') {
                                        observer.error({
                                            ...err,
                                            isAuth: false,
                                        })
                                    }
                                    observer.error(err)
                                }
                            })()
                        })

                        return observable
                }
            }
        }

        if (networkError) console.log(`[Network error]: ${networkError}`)
    }
)

const protectedRoutes = ['/', '/profile']

const requestLink = new ApolloLink((operation, forward) => {
    const href = window.location.href.split('localhost:3001').at(-1)
    const isProtectedRoute = protectedRoutes.includes(href!)
    const tokenNeedsRefresh = !localStorage.getItem('accessToken')
    const isNotRefreshOperation = operation.operationName !== 'refreshTokens'

    if (isProtectedRoute && tokenNeedsRefresh && isNotRefreshOperation) {
        return new ApolloLink((operation) => {
            return new Observable((observer) => {
                refreshToken().then(() => {
                    const subscriber = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    })

                    return () => {
                        if (subscriber) subscriber.unsubscribe()
                    }
                })
            })
        }).request(operation)
    }

    return forward(operation)
})

const refreshToken = async () => {
    try {
        const refreshResolverResponse = await apolloClient.mutate<{
            refreshTokens: string
        }>({
            mutation: REFRESH_TOKEN,
        })

        const response = refreshResolverResponse.data?.refreshTokens
        const token = (response as any).accessToken
        !!token && localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token))
        return response
    } catch (err) {
        console.log(err)

        throw err
    }
}

export { httpLink, errorLink, authLink, requestLink }
