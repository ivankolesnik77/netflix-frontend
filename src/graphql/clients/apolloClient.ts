import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { errorLink, authLink, httpLink, requestLink } from './interceptor'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([requestLink, errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
})
