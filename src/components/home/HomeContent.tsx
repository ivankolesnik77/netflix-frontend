// import Layout from "../../components/layout";
import topTenMovie from "../../../public/images/top10.png";
import NSeries from "../../../public/images/n-series.png";
import PlaySvg from "../../../public/icons/play.svg";
import InfoImg from "../../../public/images/info.png";
import Image from "next/image";
// import Popular from "../../components/home/popular";
// import Footer from "../../components/layout/Footer";
import React, { createRef, useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";

import Popular from "./popular";
import VideoPlayer from "./VideoPlayer";

const mockData = [
  {
    movieScene: "/images/main-bg.png",
    movieTitleLogo: "/images/intro-logo.png",
    isTop10: true,
    ratingTitle: "#1 in TV Shows Today",
    description:
      "Determined to protect a young patient who escaped a mysterious cult, a psychiatrist takes the girl in, putting her own family — and life — in danger.",
  },
];

const mockItems = [
  {
    href: "",
    title: 1,
    src: "/images/main-bg.png",
  },
  {
    href: "",
    title: 2,
    src: "/images/main-bg.png",
  },
  {
    href: "",
    title: 3,
    src: "/images/main-bg.png",
  },
  {
    href: "",
    title: 4,
    src: "/images/main-bg.png",
  },
  {
    href: "",
    title: 5,
    src: "/images/main-bg.png",
  },
];
export const fileName = "intro";
const introMovie = mockData[0];
const baseStaticPath = "http://localhost:3001/images/";
export default function HomeContent({
  bannerUri = baseStaticPath + "banner.jpg",
}: any) {
  const videoRef = createRef();
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVideo(!isVideo);
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [isVideo]);

  const { isTop10, movieScene, ratingTitle, description, movieTitleLogo } =
    introMovie;
  return (
    <>
      <div className={`font-netflix absolute left-0 top-0 -z-10 inline-block`}>
        {bannerUri && (
          <img
            src={bannerUri}
            alt="background"
            className={`-z-10  w-[100vw] animate-fade object-cover ${
              isVideo ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
        <div className="absolute bottom-0 left-0 h-[200px] w-full bg-linearGradient" />
        <VideoPlayer />
        {/* <video
          loop
          autoPlay
          muted
          poster="/images/main-bg-lg.png"
          className="absolute left-0 top-0 -z-20 w-full object-cover"
        >
          <source
            src={`/api/stream/${encodeURIComponent(fileName)}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>*/}
      </div>

      <div className="z-0 flex h-[400px] flex-col justify-center pt-5 text-white">
        <img
          src={movieTitleLogo}
          alt="movie-title"
          className={`mb-6 mt-[80px] w-[50%] min-w-[250px] max-w-[600px] md:mt-2 ${
            isVideo ? "reduce-size" : "recover-size"
          }`}
        />
        <div
          className={`transition delay-700 duration-300 ${
            isVideo ? "animate-fade opacity-0" : "animate-fadeIn opacity-1"
          }`}
        >
          <div className="mb-6 flex gap-2 text-white">
            {isTop10 && <Image src={topTenMovie} alt="top movie" width="25" />}
            <p className="font-netflixMedium text-xl">{ratingTitle}</p>
          </div>
          <p className="max-w-[650px]">{description}</p>
        </div>

        <div className="mt-3 flex gap-2 font-semibold">
          <div className="flex cursor-pointer items-center gap-3 rounded-sm bg-white px-[20px]  py-[5px] text-lg text-black hover:animate-pulse">
            <Image src={PlaySvg} alt="play" width="15" />
            <span>Play</span>
          </div>
          <div className="flex cursor-pointer items-center gap-3 rounded-sm bg-slate-500 px-[25px] py-[5px] text-sm text-white hover:animate-pulse">
            <Image src={InfoImg} alt="info" width="20" />
            <span>More Info</span>
          </div>
        </div>
      </div>
      <Popular items={mockItems} />
    </>
  );
}
