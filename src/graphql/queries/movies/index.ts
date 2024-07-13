import { gql } from '@apollo/client'

export const IntroMovieQuery = gql`
    query Movies {
        movies {
            id
            title
            duration
            rating
            source
            actors
        }
    }
`

export const MoviesStringQuery = `
    query Movies {
        movies {
            id
            title
            duration
            rating
            source
            actors {
                id
                name
            }
    }
}
`
