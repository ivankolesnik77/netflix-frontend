import { SubscriptionType } from '../store/reducers/redux.slice'
import backIcon from '/public/icons/back.svg'
import passTimeBackIcon from '/public/icons/passTimeBack.svg'
import passTimeForwardIcon from '/public/icons/passTimeForward.svg'
import soundIcon from '/public/icons/sound.svg'
import reportIcon from '/public/icons/report.svg'
import playIcon from '/public/icons/play.svg'
import nextEpisodeIcon from '/public/icons/nextEpisode.svg'
import subtitlesIcon from '/public/icons/subtitles.svg'
import seriesIcon from '/public/icons/series.svg'
import speedIcon from '/public/icons/speed.svg'
import fullScreenIcon from '/public/icons/fullScreen.svg'

export const icons = {
    sound: soundIcon,
    report: reportIcon,
    passTimeBack: passTimeBackIcon,
    passTimeForward: passTimeForwardIcon,
    play: playIcon,
    back: backIcon,
    nextEpisode: nextEpisodeIcon,
    subtitles: subtitlesIcon,
    series: seriesIcon,
    speed: speedIcon,
    fullScreen: fullScreenIcon,
}

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
