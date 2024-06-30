import { SubscriptionType } from '../store/reducers/redux.slice'

export const menuItems = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'TV Shows',
        href: '/tv',
    },
    {
        name: 'Movies',
        href: '/movies',
    },
    {
        name: 'New & Popular',
        href: '/news',
    },
    {
        name: 'My List',
        href: '/my-list',
    },
    {
        name: 'Browse by Languages',
        href: '/browse',
    },
]

export const subscriptionRates = {
    [SubscriptionType.Basic]: 10,
    [SubscriptionType.Advanced]: 50,
    [SubscriptionType.Premium]: 15,
}

export const cardPaymentOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#000',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#e53e3e',
        },
    },
}

export const ACCESS_TOKEN_KEY = 'accessToken'
export const REFRESH_TOKEN_KEY = 'refreshToken'
