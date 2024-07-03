import topTenMovie from '../../../public/images/top10.png'
import NSeries from '../../../public/images/n-series.png'
import PlaySvg from '../../../public/icons/play.svg'
import InfoImg from '../../../public/images/info.png'
import Image from 'next/image'

import React, { createRef, useEffect, useState } from 'react'
import { clearInterval, setInterval } from 'timers'
import Video from 'next-video'
// import introVideo from '/videos/intro.mp4'
import introVideo from 'https://netflix-static.s3.us-west-2.amazonaws.com/intro.mp4'
import Popular from './popular'

import { useDispatch } from 'react-redux'
import { setAuthData } from '../../store/reducers/auth.slice'

import { gql, useQuery } from '@apollo/client'
import { setUser } from '../../store/reducers/user.slice'
import { useAppSelector } from '../../utils/hooks'
import { useRouter } from 'next/router'

const mockData = {
    movieScene: '/images/main-bg.png',
    movieTitleLogo: '/images/intro-logo.png',
    isTop10: true,
    ratingTitle: '#1 in TV Shows Today',
    description:
        'Determined to protect a young patient who escaped a mysterious cult, a psychiatrist takes the girl in, putting her own family — and life — in danger.',
}
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

const PreviewVideo = () => {
    return (
        <div className="absolute h-full w-full top-[30px]">
            <div className="relative xl:max-w-[1024px] lg:max-w-[83%] rounded-md overflow-hidden h-[90vh] bg-[#141414]  w-full mx-auto  z-50 font-netflix">
                <Video
                    src={introVideo}
                    loop
                    autoPlay
                    muted
                    controls={false}
                    poster="/images/main-bg-lg.png"
                    className="h-[500px] w-full object-cover"
                />
                <div className="absolute right-0 top-0 m-4">
                    <span
                        data-uia="previewModal-closebtn"
                        role="button"
                        aria-label="close"
                        title="close"
                    >
                        <svg
                            className="bg-[#181818] rounded-full h-9 w-9 p-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            role="img"
                            data-icon="XStandard"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </span>
                </div>
                <div className="absolute top-[400px] flex-col-reverse left-0 z-20 h-[100px] w-full bg-linearGradient">
                    <div className="flex">
                        <div className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-[32px]  py-[10px] text-lg text-black hover:animate-pulse">
                            <Image src={PlaySvg} alt="play" width={24} />
                            <span className="text-xl font-semibold">Play</span>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="flex gap-2.5 mt-5 px-2 pt-3 items-center">
                        <div className="text-[#46d369] font-semibold">New</div>
                        <div className="text-secondary">2024</div>
                        <span className="text-secondary">1h 57m</span>
                        <span className="border font-medium border-white/40 rounded-[3px] text-white text-[0.7em] px-1.5 py-0 whitespace-nowrap">
                            HD
                        </span>
                        <div className="spatial-audio spatial-audio-icon-en spatial-audio-icon-en-ua">
                            <svg viewBox="0 0 50 16" className="w-16 h-8">
                                <g fill="currentColor">
                                    <path d="M0 8C0 9.87632 0.645949 11.6018 1.7276 12.9661L2.46553 12.3819C1.51113 11.178 0.941177 9.65557 0.941177 8C0.941177 6.42141 1.45936 4.96384 2.33491 3.78813L1.57956 3.22654C0.587274 4.55902 0 6.21093 0 8Z"></path>
                                    <path d="M16 8C16 6.21093 15.4127 4.55902 14.4204 3.22654L13.6651 3.78813C14.5406 4.96384 15.0588 6.42141 15.0588 8C15.0588 9.65557 14.4889 11.178 13.5345 12.3819L14.2724 12.9661C15.3541 11.6018 16 9.87632 16 8Z"></path>
                                    <path d="M8 0C9.83269 0 11.5214 0.616258 12.8703 1.65286L12.2974 2.39958C11.1072 1.48493 9.61708 0.941177 8 0.941177C6.38293 0.941177 4.89285 1.48493 3.70265 2.39957L3.12967 1.65285C4.47857 0.616256 6.16732 0 8 0Z"></path>
                                    <path d="M8 2.19608C9.3296 2.19608 10.5548 2.64317 11.5334 3.39521L10.9604 4.14193C10.1405 3.51184 9.11399 3.13726 8 3.13726C6.88602 3.13726 5.85952 3.51184 5.0396 4.14193L4.46662 3.39521C5.44523 2.64317 6.67041 2.19608 8 2.19608Z"></path>
                                    <path d="M3.34204 4.5369L4.09738 5.09849C3.49423 5.90843 3.13726 6.91253 3.13726 8C3.13726 9.14051 3.52989 10.1893 4.18737 11.0186L3.44944 11.6029C2.66471 10.613 2.19608 9.36125 2.19608 8C2.19608 6.70205 2.62214 5.5036 3.34204 4.5369Z"></path>
                                    <path d="M12.8627 8C12.8627 9.14051 12.4701 10.1893 11.8126 11.0186L12.5506 11.6029C13.3353 10.613 13.8039 9.36125 13.8039 8C13.8039 6.70205 13.3779 5.5036 12.658 4.5369L11.9026 5.09849C12.5058 5.90843 12.8627 6.91253 12.8627 8Z"></path>
                                    <path d="M10.3529 8C10.3529 9.29949 9.29949 10.3529 8 10.3529C6.70051 10.3529 5.64706 9.29949 5.64706 8C5.64706 6.70051 6.70051 5.64706 8 5.64706C9.29949 5.64706 10.3529 6.70051 10.3529 8Z"></path>
                                    <path d="M2.87389 14.1422C3.75688 12.4329 5.53805 11.2941 7.5516 11.2941H8.4484C10.462 11.2941 12.2431 12.4329 13.1261 14.1422C11.7379 15.302 9.95045 16 8 16C6.04955 16 4.26212 15.302 2.87389 14.1422Z"></path>
                                    <path d="M21.1 7.96799C20.2467 7.96799 19.5633 7.77466 19.05 7.38799C18.5367 7.00133 18.2067 6.46133 18.06 5.76799H19.67C19.7433 6.00799 19.9033 6.20466 20.15 6.358C20.3967 6.51133 20.7067 6.58799 21.08 6.58799C21.4267 6.58799 21.7067 6.52466 21.92 6.39799C22.1333 6.27133 22.24 6.09466 22.24 5.86799C22.24 5.72799 22.2067 5.60799 22.14 5.50799C22.08 5.40799 21.9567 5.32133 21.77 5.24799C21.59 5.16799 21.3167 5.09799 20.95 5.03799L20.21 4.90799C19.57 4.79466 19.0867 4.58466 18.76 4.27799C18.44 3.96466 18.28 3.51133 18.28 2.91799C18.28 2.45799 18.4 2.06133 18.64 1.72799C18.88 1.39466 19.2067 1.13799 19.62 0.957994C20.0333 0.777995 20.4933 0.687995 21 0.687995C21.7667 0.687995 22.4 0.867995 22.9 1.22799C23.4 1.58799 23.7033 2.10466 23.81 2.77799H22.2C22.14 2.55133 22.01 2.37799 21.81 2.25799C21.6167 2.13133 21.3533 2.068 21.02 2.068C20.6733 2.068 20.4 2.13133 20.2 2.25799C20.0067 2.38466 19.91 2.55466 19.91 2.76799C19.91 2.96133 19.99 3.11466 20.15 3.22799C20.31 3.34133 20.63 3.44133 21.11 3.52799L21.84 3.64799C23.2 3.88133 23.88 4.56466 23.88 5.69799C23.88 6.18466 23.76 6.59799 23.52 6.93799C23.2867 7.27799 22.96 7.53466 22.54 7.70799C22.1267 7.88133 21.6467 7.96799 21.1 7.96799Z"></path>
                                    <path d="M24.8462 9.858V2.59799H26.2962V3.19799C26.4696 2.95799 26.6829 2.77466 26.9362 2.64799C27.1896 2.51466 27.4796 2.44799 27.8062 2.44799C28.2529 2.44799 28.6462 2.56466 28.9862 2.79799C29.3329 3.03133 29.6029 3.35799 29.7962 3.77799C29.9962 4.19133 30.0962 4.66799 30.0962 5.20799C30.0962 5.75466 29.9962 6.23466 29.7962 6.64799C29.6029 7.05466 29.3329 7.37466 28.9862 7.608C28.6462 7.84133 28.2529 7.95799 27.8062 7.95799C27.4996 7.95799 27.2229 7.898 26.9762 7.778C26.7362 7.658 26.5296 7.48799 26.3562 7.26799V9.858H24.8462ZM27.4262 6.62799C27.7596 6.62799 28.0296 6.50133 28.2362 6.24799C28.4496 5.99466 28.5562 5.64799 28.5562 5.20799C28.5562 4.76799 28.4496 4.42133 28.2362 4.16799C28.0296 3.90799 27.7596 3.77799 27.4262 3.77799C27.0929 3.77799 26.8196 3.90799 26.6062 4.16799C26.3929 4.42133 26.2862 4.76799 26.2862 5.20799C26.2862 5.64799 26.3929 5.99466 26.6062 6.24799C26.8196 6.50133 27.0929 6.62799 27.4262 6.62799Z"></path>
                                    <path d="M32.4981 7.95799C31.9515 7.95799 31.5148 7.80799 31.1881 7.50799C30.8615 7.20133 30.6981 6.79799 30.6981 6.29799C30.6981 5.75133 30.8948 5.32799 31.2881 5.02799C31.6815 4.72799 32.2248 4.57799 32.9181 4.57799H33.8681V4.39799C33.8681 4.13799 33.7915 3.94799 33.6381 3.82799C33.4915 3.70133 33.2948 3.63799 33.0481 3.63799C32.8281 3.63799 32.6515 3.68133 32.5181 3.76799C32.3848 3.84799 32.3015 3.94133 32.2681 4.04799H30.8381C30.9248 3.59466 31.1615 3.21466 31.5481 2.90799C31.9348 2.60133 32.4515 2.44799 33.0981 2.44799C33.7915 2.44799 34.3381 2.61799 34.7381 2.95799C35.1448 3.29799 35.3481 3.83466 35.3481 4.568V7.80799H33.9681V7.21799C33.8081 7.47799 33.5915 7.66799 33.3181 7.78799C33.0515 7.90133 32.7781 7.95799 32.4981 7.95799ZM32.8981 6.778C33.0515 6.778 33.2015 6.74466 33.3481 6.67799C33.5015 6.61133 33.6248 6.51466 33.7181 6.38799C33.8181 6.25466 33.8681 6.09133 33.8681 5.89799V5.59799H32.9881C32.7215 5.59799 32.5148 5.65133 32.3681 5.75799C32.2281 5.85799 32.1581 6.00466 32.1581 6.19799C32.1581 6.38466 32.2281 6.52799 32.3681 6.62799C32.5081 6.72799 32.6848 6.778 32.8981 6.778Z"></path>
                                    <path d="M38.4983 7.84799C37.9583 7.84799 37.5383 7.70133 37.2383 7.408C36.9449 7.11466 36.7983 6.68466 36.7983 6.11799V3.89799H35.9983V2.59799H36.7983V1.07799C37.0449 1.06466 37.2983 1.04133 37.5583 1.00799C37.8183 0.967994 38.0716 0.911328 38.3183 0.837995V2.59799H39.2683V3.89799H38.3183V5.948C38.3183 6.148 38.3683 6.30133 38.4683 6.408C38.5683 6.508 38.7049 6.55799 38.8783 6.55799H39.2683V7.84799H38.4983Z"></path>
                                    <path d="M40.9676 2.08799C40.7209 2.08799 40.5076 2.00133 40.3276 1.82799C40.1542 1.65466 40.0676 1.44133 40.0676 1.18799C40.0676 0.934661 40.1542 0.721328 40.3276 0.547995C40.5076 0.374661 40.7209 0.287994 40.9676 0.287994C41.2209 0.287994 41.4342 0.374661 41.6076 0.547995C41.7876 0.721328 41.8776 0.934661 41.8776 1.18799C41.8776 1.44133 41.7876 1.65466 41.6076 1.82799C41.4342 2.00133 41.2209 2.08799 40.9676 2.08799ZM40.2076 7.80799V2.59799H41.7276V7.80799H40.2076Z"></path>
                                    <path d="M44.422 7.95799C43.8753 7.95799 43.4386 7.80799 43.112 7.50799C42.7853 7.20133 42.622 6.79799 42.622 6.29799C42.622 5.75133 42.8186 5.32799 43.212 5.02799C43.6053 4.72799 44.1486 4.57799 44.842 4.57799H45.792V4.39799C45.792 4.13799 45.7153 3.94799 45.562 3.82799C45.4153 3.70133 45.2186 3.63799 44.972 3.63799C44.752 3.63799 44.5753 3.68133 44.442 3.76799C44.3086 3.84799 44.2253 3.94133 44.192 4.04799H42.762C42.8486 3.59466 43.0853 3.21466 43.472 2.90799C43.8586 2.60133 44.3753 2.44799 45.022 2.44799C45.7153 2.44799 46.262 2.61799 46.662 2.95799C47.0686 3.29799 47.272 3.83466 47.272 4.568V7.80799H45.892V7.21799C45.732 7.47799 45.5153 7.66799 45.242 7.78799C44.9753 7.90133 44.702 7.95799 44.422 7.95799ZM44.822 6.778C44.9753 6.778 45.1253 6.74466 45.272 6.67799C45.4253 6.61133 45.5486 6.51466 45.642 6.38799C45.742 6.25466 45.792 6.09133 45.792 5.89799V5.59799H44.912C44.6453 5.59799 44.4386 5.65133 44.292 5.75799C44.152 5.85799 44.082 6.00466 44.082 6.19799C44.082 6.38466 44.152 6.52799 44.292 6.62799C44.432 6.72799 44.6086 6.778 44.822 6.778Z"></path>
                                    <path d="M48.4302 7.80799V0.557995H49.9502V7.80799H48.4302Z"></path>
                                    <path d="M22.464 15.608L21.832 14.016H19.272L18.648 15.608H18L20.248 10.04H20.88L23.136 15.608H22.464ZM19.496 13.448H21.608L20.552 10.776L19.496 13.448Z"></path>
                                    <path d="M26.5971 13.968V11.528H27.1891V15.608H26.6131V15.024C26.4798 15.2427 26.3065 15.4133 26.0931 15.536C25.8798 15.6533 25.6425 15.712 25.3811 15.712C24.9225 15.712 24.5571 15.56 24.2851 15.256C24.0185 14.9466 23.8851 14.5413 23.8851 14.04V11.528H24.4771V13.968C24.4771 14.3306 24.5705 14.6213 24.7571 14.84C24.9438 15.0533 25.1945 15.16 25.5091 15.16C25.8078 15.16 26.0638 15.056 26.2771 14.848C26.4905 14.64 26.5971 14.3466 26.5971 13.968Z"></path>
                                    <path d="M30.0164 15.712C29.6537 15.712 29.3364 15.6213 29.0644 15.44C28.7924 15.2587 28.579 15.008 28.4244 14.688C28.2697 14.3627 28.1924 13.9893 28.1924 13.568C28.1924 13.1467 28.2697 12.776 28.4244 12.456C28.579 12.1306 28.7924 11.8773 29.0644 11.696C29.3364 11.5147 29.6537 11.424 30.0164 11.424C30.3204 11.424 30.5897 11.496 30.8244 11.64C31.0644 11.7786 31.259 11.9733 31.4084 12.224V9.80798H32.0004V15.608H31.4244V14.888C31.275 15.144 31.0804 15.3467 30.8404 15.496C30.6057 15.64 30.331 15.712 30.0164 15.712ZM30.1044 15.16C30.3657 15.16 30.595 15.0933 30.7924 14.96C30.995 14.8267 31.1524 14.64 31.2644 14.4C31.3817 14.16 31.4404 13.8827 31.4404 13.568C31.4404 13.2533 31.3817 12.976 31.2644 12.736C31.1524 12.496 30.995 12.3093 30.7924 12.176C30.595 12.0427 30.3657 11.976 30.1044 11.976C29.8484 11.976 29.6217 12.0427 29.4244 12.176C29.227 12.3093 29.0724 12.496 28.9604 12.736C28.8484 12.976 28.7924 13.2533 28.7924 13.568C28.7924 13.8827 28.8484 14.16 28.9604 14.4C29.0724 14.64 29.227 14.8267 29.4244 14.96C29.6217 15.0933 29.8484 15.16 30.1044 15.16Z"></path>
                                    <path d="M33.5571 10.904C33.4344 10.904 33.3277 10.8613 33.2371 10.776C33.1517 10.6853 33.1091 10.5786 33.1091 10.456C33.1091 10.3333 33.1517 10.2293 33.2371 10.144C33.3277 10.0533 33.4344 10.008 33.5571 10.008C33.6797 10.008 33.7837 10.0533 33.8691 10.144C33.9597 10.2293 34.0051 10.3333 34.0051 10.456C34.0051 10.5786 33.9597 10.6853 33.8691 10.776C33.7837 10.8613 33.6797 10.904 33.5571 10.904ZM33.2611 15.608V11.528H33.8531V15.608H33.2611Z"></path>
                                    <path d="M36.7844 15.712C36.4058 15.712 36.0698 15.6213 35.7764 15.44C35.4884 15.2587 35.2618 15.008 35.0964 14.688C34.9364 14.3627 34.8564 13.9893 34.8564 13.568C34.8564 13.1467 34.9364 12.776 35.0964 12.456C35.2618 12.1306 35.4884 11.8773 35.7764 11.696C36.0698 11.5147 36.4058 11.424 36.7844 11.424C37.1631 11.424 37.4964 11.5147 37.7844 11.696C38.0778 11.8773 38.3044 12.1306 38.4644 12.456C38.6298 12.776 38.7124 13.1467 38.7124 13.568C38.7124 13.9893 38.6298 14.3627 38.4644 14.688C38.3044 15.008 38.0778 15.2587 37.7844 15.44C37.4964 15.6213 37.1631 15.712 36.7844 15.712ZM36.7844 15.16C37.1738 15.16 37.4911 15.016 37.7364 14.728C37.9871 14.4347 38.1124 14.048 38.1124 13.568C38.1124 13.088 37.9871 12.704 37.7364 12.416C37.4911 12.1226 37.1738 11.976 36.7844 11.976C36.3951 11.976 36.0751 12.1226 35.8244 12.416C35.5791 12.704 35.4564 13.088 35.4564 13.568C35.4564 14.048 35.5791 14.4347 35.8244 14.728C36.0751 15.016 36.3951 15.16 36.7844 15.16Z"></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            aria-labelledby="standaloneAudioDescriptionAvailable"
                            data-tooltip="Audio description is available"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                role="img"
                                data-icon="AudioDescriptionStandard"
                                aria-hidden="true"
                                className="w-8 h-8"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M21.9782 7.52002H22.2621C23.37 8.81831 24.0001 10.4801 24.0001 12.2077C24.0001 13.7414 23.505 15.2301 22.6221 16.4453H22.3348H21.8501H21.5662C22.5598 15.2613 23.1207 13.7691 23.1207 12.2077C23.1207 10.449 22.404 8.75599 21.1611 7.52002H21.445H21.9782ZM6.91381 16.4796H8.87336V7.52661H6.42566L0 16.4796H2.87701L3.63174 15.2956H6.91381V16.4796ZM4.8625 13.4299H6.92592V10.224L4.8625 13.4299ZM12.3019 9.62283C13.621 9.62283 14.6839 10.6926 14.6839 12.0048C14.6839 13.3203 13.621 14.3901 12.3019 14.3901H11.6787V9.62283H12.3019ZM12.5443 16.4743C15.0128 16.4743 17.0208 14.4698 17.0208 12.0048C17.0208 9.52935 15.0335 7.52826 12.565 7.52826H12.5373H9.79883V16.4778H12.5443V16.4743ZM20.0103 7.52002H19.7264H19.1932H18.9093C20.1522 8.75599 20.8689 10.449 20.8689 12.2077C20.8689 13.7691 20.308 15.2613 19.3144 16.4453H19.5983H20.083H20.3634C21.2531 15.2301 21.7482 13.7414 21.7482 12.2077C21.7482 10.4801 21.1181 8.81831 20.0103 7.52002ZM17.4745 7.52002H17.7584C18.8663 8.81831 19.4895 10.4801 19.4895 12.2077C19.4895 13.7414 19.0013 15.2301 18.1116 16.4453H17.8277H17.3464H17.0625C18.0492 15.2613 18.6101 13.7691 18.6101 12.2077C18.6101 10.449 17.9004 8.75599 16.6575 7.52002H16.9344H17.4745Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <div
                            aria-labelledby="standaloneTextClosedCaptionsAvailable"
                            data-tooltip="Subtitles for the deaf and hard of hearing are available"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                width="16"
                                className="w-5 h-5"
                                height="16"
                                viewBox="0 0 16 16"
                                role="img"
                                data-icon="SubtitlesSmall"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 1.75C0 1.33579 0.335786 1 0.75 1H15.25C15.6642 1 16 1.33579 16 1.75V12.25C16 12.6642 15.6642 13 15.25 13H12.75V15C12.75 15.2652 12.61 15.5106 12.3817 15.6456C12.1535 15.7806 11.8709 15.785 11.6386 15.6572L6.80736 13H0.75C0.335786 13 0 12.6642 0 12.25V1.75ZM1.5 2.5V11.5H7H7.19264L7.36144 11.5928L11.25 13.7315V12.25V11.5H12H14.5V2.5H1.5ZM6 6.5L3 6.5V5L6 5V6.5ZM13 7.5H10V9H13V7.5ZM3 9V7.5L9 7.5V9L3 9ZM13 5H7V6.5H13V5Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={`animate-fade p-3`}>
                    <div className="mb-6 flex gap-2 text-white">
                        <Image
                            src={topTenMovie}
                            alt="top movie"
                            width={32}
                            height={32}
                        />

                        <p className="font-netflixMedium text-2xl text-white font-semibold">
                            {mockData.ratingTitle}
                        </p>
                    </div>
                    <p className="max-w-[650px] text-xl">
                        {mockData.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
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
            setIsVideo(!isVideo)
        }, 10000)
        return () => {
            clearInterval(timer)
        }
    }, [isVideo])

    const previewVideo = () => {
        setIsPreviewVideo(!isPreviewVideo)
        setIsVideo(!isVideo)
    }

    const { isTop10, ratingTitle, description, movieTitleLogo } = mockData

    return (
        <div>
            {isPreviewVideo && <PreviewVideo />}
            <div className="-top-65 relative z-10 inline-block h-full font-netflix">
                <Image
                    src={'/images/main-bg.png'}
                    alt="background"
                    className={`relative animate-fade object-cover ${
                        isVideo ? 'opacity-0' : 'opacity-0'
                    }`}
                    quality="100"
                    height={1920}
                    width={1080}
                    style={{ width: '100vw', height: '100vh' }}
                />

                <div className="absolute bottom-[-120px] left-0 z-20 h-[200px] w-full bg-linearGradient" />
                <Video
                    src={introVideo}
                    loop
                    autoPlay
                    muted
                    controls
                    poster="/images/main-bg-lg.png"
                    className="!absolute top-0 left-0 -z-20 max-h-[100vh] h-[100%] min-w-[100vw] scale-125 object-cover "
                />

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
                    <p className="max-w-[650px] text-xl">{description}</p>
                </div>

                <div className="mb-[60px] mt-3 flex gap-2 font-semibold">
                    <div className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-[32px]  py-[10px] text-lg text-black hover:animate-pulse">
                        <Image src={PlaySvg} alt="play" width={24} />
                        <span className="text-xl font-semibold">Play</span>
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
