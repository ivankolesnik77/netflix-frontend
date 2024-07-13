import Video from 'next-video'

import Image from 'next/image'

import { mockData } from '../mock.data'
import playSvg from '/public/icons/play.svg'
import plusSvg from '/public/icons/plus.svg'
import likeSvg from '/public/icons/like.svg'
import SoundIcon from '../../../public/icons/sound.svg'
import closeIcon from '/public/icons/close.svg'
import previewTitle from '/public/images/devilInOhio/preview.webp'

import audioDescriptionIcon from '/public/icons/audioDescription.svg'

import subtitlesIcon from '/public/icons/subtitles.svg'
import topTenMovie from '/public/images/top10.png'

import introVideo from '/videos/intro.mp4'
import classNames from 'classnames'
import { FC, useState } from 'react'
import Link from 'next/link'

interface IProps {
    data: any
    visibility: boolean
    onClose: () => void
}
const mock = {
    episodes: [
        {
            title: 'Broken Fall',
            duration: '40m',
            imgUrl: 'https://netflix-static.s3.us-west-2.amazonaws.com/devilInOhio/episode1_preview.jpg',
            description:
                "After a teen girl with a strange wound is found in Amon County, Ohio, she is taken to the hospital in a nearby town and put in Dr. Suzanne Mathis' care.",
        },
        {
            title: 'Sanctuary',
            duration: '47m',
            imgUrl: 'https://netflix-static.s3.us-west-2.amazonaws.com/devilInOhio/episode2_preview.jpg',
            description:
                'Mae adjusts to life with the Mathis family while Suzanne tries to find her a foster home. Detective Alex Lopez makes an unsettling discovery.',
        },
        {
            title: "Mother's Keeper",
            duration: '43m',
            imgUrl: 'https://netflix-static.s3.us-west-2.amazonaws.com/devilInOhio/episode3_preview.jpg',
            description:
                "After enrolling in Jules' school, Mae attracts attention from the newspaper editor. Suzanne reaches out to Mae's parents. Peter asks a friend for help.",
        },
        {
            title: 'Rely-upon',
            duration: '42m',
            imgUrl: 'https://netflix-static.s3.us-west-2.amazonaws.com/devilInOhio/episode4_preview.jpg',
            description:
                "Alex digs for answers about Amontown and Suzanne consults an expert. Jules' photo of Mae causes a stir at school, with unexpected consequences.",
        },
        {
            title: 'Alight',
            duration: '46m',
            imgUrl: 'https://netflix-static.s3.us-west-2.amazonaws.com/devilInOhio/episode5_preview.jpg',
            description:
                "Suzanne gains more clarity on what Mae experienced at Amontown. Halloween night doesn't go as planned for Jules, who begins to question Mae's motives.",
        },
    ],
    minAge: 16,
    releaseYear: 2016,
    keyWords: ['violence', ' substances', ' self-harm', ' child abuse'],
    genres: ['TV Dramas', 'TV Shows Based on Books', 'TV Mysteries'],
    cast: ['Emily Deschanel', 'Sam Jaeger', 'Gerardo Celasco'],
    characteristics: ['Ominous', 'Psychological', 'Suspenseful'],
    description:
        "After a teen girl with a strange wound is found in Amon County, Ohio, she is taken to the hospital in a nearby town and put in Dr. Suzanne Mathis' care.",
}

const PreviewVideo: FC<IProps> = ({ data, visibility = false, onClose }) => {
    const [currentSeason, setCurrentSeason] = useState(1)
    const [currentEpisode, setCurrentEpisode] = useState(1)
    const [focusedEpisode, setFocusedEpisode] = useState<number | null>(null)
    const [isFocusedSound, setIsFocusedSound] = useState(false)

    const renderPreviewVideoSection = () => {
        return (
            <div className="h-[500px] w-full overflow-hidden relative">
                <div className="absolute  right-0 top-0 m-[1em] z-20 flex items-center justify-center rounded-full bg-[#181818] w-[36px] h-[36px]">
                    <button onClick={onClose} aria-label="close" title="close">
                        <Image
                            src={closeIcon}
                            alt="play"
                            width={18}
                            height={18}
                        />
                    </button>
                </div>
                <Video
                    src={data.source}
                    loop
                    autoPlay
                    muted
                    controls={false}
                    poster="/images/main-bg-lg.png"
                    className={'w-full object-cover scale-125'}
                />

                <div className="absolute h-full w-full bg-previewGradient gap-2 top-0 flex justify-between">
                    <div className="absolute left-[3em] bottom-[5%] w-[40%]">
                        <Image
                            src={previewTitle}
                            className="w-full mb-6"
                            alt="preview title"
                        />
                        <div className="my-2 h-[20px]"></div>
                        <div className="flex gap-2 items-center mb-4">
                            <button className="flex m-1 max-h-[42px] min-h-[32px] cursor-pointer pl-[17px] pr-[20px] gap-2 rounded-[4px] bg-white items-center h-8 text-lg text-black hover:animate-pulse">
                                <Image
                                    src={playSvg}
                                    alt="play"
                                    className="w-5 h-5"
                                />

                                <span className="text-[1.6rem] text-[#000] leading-[2.4rem] font-semibold">
                                    Play
                                </span>
                            </button>
                            <div className=" rounded-full bg-[rgba(42,42,42,.6)] opacity-60 border-2 border-[#fff] will-change-['background-color, color'] flex items-center justify-center w-[33px] h-[33px]">
                                <Image src={plusSvg} alt="like" width={17} />
                            </div>
                            <div className="rounded-full bg-[rgba(42,42,42,.6)] opacity-60 border-2 border-[#fff] will-change-['background-color, color'] flex items-center justify-center w-[33px] h-[33px]">
                                <Image src={likeSvg} alt="like" width={17} />
                            </div>
                        </div>
                        <div className="h-[20px]"></div>
                    </div>
                    <div className="absolute block overflow-hidden bottom-[10%] right-[3em] mb-4 ">
                        <button
                            onMouseOver={() => setIsFocusedSound(true)}
                            onMouseLeave={() => setIsFocusedSound(false)}
                            className={classNames(
                                'bg-[rgba(42, 42, 42, .6)] rounded-full opacity-60  border-2 border-[#fff] p-[0.8rem]',
                                {
                                    '!opacity-100': !!isFocusedSound,
                                }
                            )}
                        >
                            <div className="flex items-center justify-center w-[1.8rem] h-[1.8rem]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#fff"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    data-icon="VolumeHighStandard"
                                    aria-hidden="true"
                                    className="w-full h-full"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z"
                                        fill="#fff"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const infoBlockClassName = classNames(
        'relative xl:max-w-[1024px] lg:max-w-[86.5rem] text-[16px] min-w-[850px] max-w-[90%] rounded-md overflow-hidden overflow-y-auto bg-[#141414]  w-full mx-auto  z-50 font-netflix',
        { 'animate-[fadeIn_ease-in_1s]': visibility }
    )

    return (
        <div
            className={classNames('absolute h-full w-full top-[32px]', {
                hidden: !visibility,
            })}
        >
            <div className={infoBlockClassName}>
                {renderPreviewVideoSection()}

                <div className="bg-[#181818] h-full px-[3em]">
                    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10">
                        <div className="my-[0.8em]">
                            <div className="flex gap-2.5  items-center text-[16px]">
                                <div className="text-[#46d369] font-semibold m-[.25em_.5em_.25em_0]">
                                    {/* New */}
                                </div>
                                <div className="text-secondary">2022</div>
                                <div className="text-secondary">
                                    Limited series
                                </div>
                                <span className="text-secondary">1h 57m</span>
                                <span className="border font-medium border-white/40 rounded-[3px] text-white text-[0.7em] px-[0.4em] py-0 whitespace-nowrap">
                                    HD
                                </span>

                                <div
                                    aria-labelledby="standaloneAudioDescriptionAvailable"
                                    data-tooltip="Audio description is available"
                                >
                                    <Image
                                        src={audioDescriptionIcon}
                                        width={32}
                                        height={16}
                                        alt="audio description"
                                        color="#fff"
                                    />
                                </div>
                                <div
                                    aria-labelledby="standaloneTextClosedCaptionsAvailable"
                                    data-tooltip="Subtitles for the deaf and hard of hearing are available"
                                >
                                    <Image
                                        src={subtitlesIcon}
                                        alt="subtitles"
                                        width={16}
                                        height={16}
                                    />
                                </div>
                            </div>
                            <div className="flex text-[14px] gap-2 mt-[0.1rem] pb-[1.3em]">
                                <span className="border  border-white/40 leading-[19px] text-white  px-1.5 py-0 whitespace-nowrap">
                                    {mock.minAge}+
                                </span>
                                <span>{mock.keyWords.join(' ')}</span>
                            </div>

                            <div className="flex text-[20px]  mt-[25px] mb-2.5">
                                <b>
                                    S{currentSeason}:E{currentEpisode}
                                </b>
                                {`"${mock.episodes[currentEpisode].title}"`}
                            </div>
                            <div className="mb-[0.5em] mt-[14px] text-[14px] leading-[24px]">
                                {data.description}
                            </div>
                        </div>
                        <div className="leading-[20px] flex flex-col">
                            <div className="my-2 mr-2 paragraph">
                                <span className="text-subtitle">Cast: </span>
                                {mock.cast.map((item, index) => (
                                    <Link
                                        key={`cast-${index}`}
                                        href={`#${item}`}
                                    >
                                        {index !== 2 ? item.concat(', ') : item}
                                    </Link>
                                ))}
                            </div>
                            <div className="my-2 mr-2 paragraph">
                                <span className="text-subtitle">Genres: </span>

                                {mock.genres.map((item, index) => (
                                    <Link key={`genre-${index}`} href="#">
                                        {index !== 2 ? item.concat(', ') : item}
                                    </Link>
                                ))}
                            </div>
                            <div className="my-2 mr-2 paragraph">
                                <span className="text-subtitle">
                                    {'This show is: '}
                                </span>
                                {mock.characteristics.map((item, index) => (
                                    <Link key={`link-about-${index}`} href="#">
                                        <span>
                                            {index !== 2
                                                ? item.concat(', ')
                                                : item}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 items-baseline grid-cols-[2fr_1fr]">
                        <h3 className="pt-2 mt-[1.25em] mb-[16px] font-medium text-[24px]">
                            Episodes
                        </h3>
                        <div className="mb-[0.5em] text-[18px] justify-self-end text-[#fff]">
                            Limited series
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {mock.episodes.map((item, index) => (
                            <div
                                key={`epidose-${index}`}
                                onMouseOver={() => setFocusedEpisode(index)}
                                onMouseLeave={() => setFocusedEpisode(null)}
                                onClick={() => setCurrentEpisode(index + 1)}
                                className={classNames(
                                    'flex rounded-t-lg cursor-pointer items-center p-[1em] border-b border-[#404040]',
                                    { 'bg-[#333]': index + 1 == currentEpisode }
                                )}
                            >
                                <div className="text-2xl flex items-center justify-center flex-[0_0_7%] text-[#d2d2d2]">
                                    {index + 1}
                                </div>
                                <div className="flex-col items-center flex-[0_0_18%] relative">
                                    <Image
                                        src={mock.episodes[index].imgUrl}
                                        alt="episode"
                                        className="max-w-full w-full h-auto block rounded-t-lg "
                                        width={256}
                                        height={144}
                                    />

                                    <div
                                        className={classNames(
                                            'absolute transition-opacity duration-200  opacity-0 flex items-center justify-center bg-playGradient top-0 left-0 right-0 bottom-0',
                                            {
                                                'opacity-100':
                                                    focusedEpisode == index,
                                            }
                                        )}
                                    >
                                        <Image
                                            src={'/icons/playButton.svg'}
                                            alt="play button"
                                            width={48}
                                            height={48}
                                            className="border rounded-full border-white p-2 w-[48px] h-[48px]"
                                        />
                                    </div>
                                </div>
                                <div className="flex-[0_0_70%]">
                                    <div className="flex justify-between p-[1em_1em_.5em] pb-2">
                                        <p className="p-0 m-0 text-[1em] font-semibold">
                                            {mock.episodes[index].title}
                                        </p>
                                        <p className="p-0 m-0 text-[1em]">
                                            {mock.episodes[index].duration}
                                        </p>
                                    </div>
                                    <div className="p-[14px] pt-0 text-[14px]">
                                        {mock.episodes[index].description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className={`animate-fade p-3 px-0`}>
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PreviewVideo
