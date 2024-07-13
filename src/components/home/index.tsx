import Image from 'next/image'
import PlaySvg from '../../../public/icons/play.svg'
import InfoImg from '../../../public/images/info.png'
import topTenMovie from '../../../public/images/top10.png'

import Video from 'next-video'
import { useEffect, useState } from 'react'
import { clearInterval, setInterval } from 'timers'

import introVideo from 'https://netflix-static.s3.us-west-2.amazonaws.com/intro.mp4'
import Popular from './popular'

import { useDispatch } from 'react-redux'
import { setAuthData } from '../../store/reducers/auth.slice'

import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { setUser } from '../../store/reducers/user.slice'
import { useAppSelector } from '../../utils/hooks'
import { mockData } from './mock.data'
import PreviewVideo from './previewVideo'
import Link from 'next/link'

const mockItems = [
    {
        href: '',
        title: 1,
        src: '/images/main-bg.png',
    },
    {
        href: '',
        title: 2,
        src: '/images/main-bg.png',
    },
    {
        href: '',
        title: 3,
        src: '/images/main-bg.png',
    },
    {
        href: '',
        title: 4,
        src: '/images/main-bg.png',
    },
    {
        href: '',
        title: 5,
        src: '/images/main-bg.png',
    },
]

const VerifyTokenDocument = gql`
    query AuthMe {
        authMe {
            email
            userName
            resetPasswordToken
        }
    }
`

export const fileName = 'intro'

export default function Home({ introMovie }: any) {
    const dispatch = useDispatch()
    const [isVideo, setIsVideo] = useState(false)
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const [isPreviewVideo, setIsPreviewVideo] = useState(false)
    const router = useRouter()

    useQuery(VerifyTokenDocument, {
        onCompleted(data) {
            console.log(data)
            if (data.authMe !== null) {
                const user = data.authMe
                dispatch(
                    setAuthData({
                        isAuth: true,
                        resetPasswordToken: user.resetPasswordToken,
                    })
                )
                dispatch(
                    setUser({ email: user.email, userName: user.userName })
                )
            }
        },
        onError(err) {
            if ((err.networkError as any)?.isAuth == false) {
                router.push('/login')
            }
        },

        skip: !!isAuth,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            if (isPreviewVideo) return
            setIsVideo(!isVideo)
        }, 10000)
        return () => {
            clearInterval(timer)
        }
    }, [isVideo])

    const previewVideo = (e: any) => {
        e.preventDefault()
        setIsPreviewVideo(!isPreviewVideo)
        setIsVideo(false)
    }

    const { isTop10, ratingTitle, description, movieTitleLogo } = mockData

    return (
        <div>
            <PreviewVideo
                data={introMovie}
                visibility={isPreviewVideo}
                onClose={() => setIsPreviewVideo(false)}
            />
            <div className="-top-65 relative z-10 inline-block h-full font-netflix">
                <Image
                    src={'/images/main-bg.png'}
                    alt="background"
                    className={`relative animate-fade object-cover ${
                        isVideo ? 'opacity-0' : 'opacity-1'
                    }`}
                    quality="100"
                    height={1920}
                    width={1080}
                    style={{ width: '100vw', height: '100vh' }}
                />

                <div className="absolute bottom-[-120px] left-0 z-20 h-[200px] w-full bg-linearGradient" />
                {isVideo && !isPreviewVideo && (
                    <Video
                        src={introVideo}
                        loop
                        autoPlay
                        muted
                        controls
                        poster="/images/main-bg-lg.png"
                        className="!absolute top-0 left-0 -z-20 max-h-[100vh] h-[100%] min-w-[100vw] scale-125 object-cover "
                    />
                )}

                {/* <DefaultPlayer
                    fileName="intro"
                    onCanPlay={() => setIsVideo(true)}
                    loop
                    autoPlay
                    muted
                    controls
                    poster="/images/main-bg-lg.png"
                    className="!absolute top-0 left-0 -z-20 max-h-[100vh] h-[100%] min-w-[100vw] scale-125 object-cover "
                /> */}
            </div>

            <div className="z-20 absolute top-0 mt-[165px] flex  flex-col justify-center  text-white md:px-10 lg:px-[60px]">
                <Image
                    src={movieTitleLogo}
                    alt="movie-title"
                    sizes="50%"
                    style={{ width: '50%', height: 'auto' }}
                    width={100}
                    height={140}
                    priority
                    className={`mb-6 mt-[80px] w-[50%] min-w-[250px] max-w-[600px] md:mt-2 ${
                        isVideo ? 'reduce-size' : 'recover-size'
                    }`}
                />
                <div
                    className={`transition delay-700 duration-300 ${
                        isVideo
                            ? 'animate-fade opacity-0'
                            : 'animate-fadeIn opacity-1'
                    }`}
                >
                    <div className="mb-6 flex gap-2 text-white">
                        {isTop10 && (
                            <Image
                                src={topTenMovie}
                                alt="top movie"
                                width={32}
                                height={32}
                            />
                        )}
                        <p className="font-netflixMedium text-2xl font-semibold">
                            {ratingTitle}
                        </p>
                    </div>
                    <p className="max-w-[36%] min-w-[300px] text-xl">
                        {description}
                    </p>
                </div>

                <div className="mb-[60px] mt-3 flex gap-2 font-semibold">
                    <div className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-[32px]  py-[10px] text-lg text-black hover:animate-pulse">
                        <Image src={PlaySvg} alt="play" width={24} />
                        <Link href={`/watch/${introMovie.id}`}>
                            <span className="text-xl font-semibold">Play</span>
                        </Link>
                    </div>
                    <div
                        onClick={previewVideo}
                        className=" flex cursor-pointer items-center gap-3 rounded-md bg-slate-500 px-[25px] py-[5px] text-sm text-white hover:animate-pulse"
                    >
                        <Image src={InfoImg} alt="info" width={30} />
                        <span className="text-xl font-semibold">More Info</span>
                    </div>
                </div>
                <Popular items={mockItems} />
            </div>
        </div>
    )
}
