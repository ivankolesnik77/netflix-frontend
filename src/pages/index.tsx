import dynamic from 'next/dynamic'

const Home = dynamic(() => import('../components/home'), {
    ssr: false,
})

import StoreProvider from '../store/StoreProvider'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { useEffect } from 'react'
import { useAppSelector } from '@/utils/hooks'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'
import React from 'react'

loadDevMessages()
loadErrorMessages()

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { apolloClient } from '@/graphql/clients/apolloClient'
import { gql } from '@/__generated__'
import { IntroMovieQuery, MoviesStringQuery } from '@/graphql/queries/movies'

type Repo = {
    name: string
    stargazers_count: number
}

export const getServerSideProps = async () => {
    try {
        // const api = process.env.SERVER_API

        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need, such as authorization headers
            },
            body: JSON.stringify({
                query: MoviesStringQuery,
            }),
        })

        const result = await response.json()

        return {
            props: {
                data: result?.data.movies,
            },
        }
    } catch (err) {
        console.log(err)
        return {
            props: {
                data: {},
            },
        }
    }
}

export default function HomePage({ data }: any) {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    useEffect(() => {
        if (isAuth == false) {
            localStorage.removeItem(ACCESS_TOKEN_KEY)
        }
    }, [isAuth])

    return (
        <StoreProvider>
            <Home introMovie={data} />
        </StoreProvider>
    )
}
