import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import Video from 'next-video'
import { icons } from '@/utils/constants'
import { MoviesStringQuery } from '@/graphql/queries/movies'
import classNames from 'classnames'

export const getServerSideProps = async () => {
    try {
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

const Watchpage = ({ data }: any) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const router = useRouter()
    const slug = router.query.slug
    const [isActive, setIsActive] = useState(false)
    const [isTimeBarActive, setIsTimeBarActive] = useState(false)
    console.log(slug)

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => {
                setIsActive(false)
                setIsTimeBarActive(false)
            }, 2000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [isActive])

    const videoHeight = (window.innerWidth * 9) / 18.8
    console.log(videoHeight)
    return (
        <div
            style={{ backgroundColor: '#000' }}
            className="font-nkufi w-full h-[100vh] overflow-auto"
        >
            {isActive && (
                <div>
                    <div className="absolute left-0 flex justify-between  w-full p-[32px]">
                        <Image
                            src={icons.back}
                            width={24}
                            height={24}
                            alt="back"
                            className="w-[3.2rem]"
                        />
                        <Image
                            src={icons.report}
                            width={24}
                            height={24}
                            alt="passTime"
                            className="w-[3.2rem]"
                        />
                    </div>
                    <div className="absolute bottom-[48px] w-full left-0 flex flex-col gap-8">
                        <div>
                            <div
                                onMouseMove={() => setIsTimeBarActive(true)}
                                onMouseLeave={() => setIsTimeBarActive(false)}
                                className={`${isTimeBarActive ? 'h-[1.3rem]' : 'h-[1rem]'} bg-[rgb(255,0,0)] mx-[32px] pt-[0.25rem]`}
                            >
                                <button
                                    aria-label="Seek time scrubber"
                                    aria-orientation="horizontal"
                                    aria-valuemax={2446652}
                                    aria-valuemin={0}
                                    aria-valuenow={957034}
                                    aria-valuetext="957 of 2446"
                                    data-uia="timeline-knob"
                                    className="ml-[600px] rounded-full bg-[rgb(255,0,0)] h-[1.3rem] w-[1.3rem] -translate-y-[50%]"
                                    role="slider"
                                    type="button"
                                ></button>
                            </div>
                        </div>
                        <div className=" px-[40px] flex justify-between w-full items-start">
                            <div className="flex gap-[24px]">
                                <Image
                                    src={icons.play}
                                    width={24}
                                    height={24}
                                    alt="play"
                                    color="#fff"
                                    className="w-[2.6rem]"
                                />
                                <Image
                                    src={icons.passTimeBack}
                                    width={24}
                                    height={24}
                                    alt="passTime-back"
                                    color="#fff"
                                    className="w-[2.8rem]"
                                />
                                <Image
                                    src={icons.passTimeForward}
                                    width={24}
                                    height={24}
                                    alt="passTime-back"
                                    color="#fff"
                                    className="w-[2.8rem]"
                                />

                                <Image
                                    src={icons.sound}
                                    width={32}
                                    height={32}
                                    alt="sound"
                                    color="#fff"
                                />
                            </div>
                            <div className="flex gap-[12px] text-xl font-medium text-white">
                                <h3 className="text-xl font-medium">
                                    Devil in Ohio
                                </h3>
                                <span className="mr-2">E1</span>
                                <span>Broken Fall</span>
                            </div>

                            <div className="flex gap-[32px]">
                                <Image
                                    src={icons.nextEpisode}
                                    width={24}
                                    height={24}
                                    alt="next episode"
                                    className="w-[2.8rem]"
                                />
                                <Image
                                    src={icons.series}
                                    width={24}
                                    height={24}
                                    alt="series"
                                    className="mr-[16px] w-[2.8rem]"
                                />
                                <Image
                                    src={icons.subtitles}
                                    width={24}
                                    height={24}
                                    alt="subtitles"
                                    className="w-[2.8rem]"
                                />
                                <Image
                                    src={icons.speed}
                                    width={24}
                                    height={24}
                                    alt="speed"
                                    className="w-[2.8rem]"
                                />
                                <Image
                                    src={icons.fullScreen}
                                    width={24}
                                    height={24}
                                    className="w-[2.8rem]"
                                    alt="fullScreen"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <video
                src={
                    'https://netflix-static.s3.us-west-2.amazonaws.com/devilInOhio/season1/S1_E1.mp4'
                }
                ref={videoRef}
                onMouseMove={() => setIsActive(true)}
                loop
                autoPlay
                muted
                style={{ height: videoHeight }}
                className={classNames('w-full', {
                    'animation-cursorHide': !isActive,
                })}
            />
        </div>
    )
}

export default Watchpage
