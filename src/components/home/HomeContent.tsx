// import Layout from "../../components/layout";
import topTenMovie from "public/images/top10.png";
import NSeries from "public/images/n-series.png";
import PlaySvg from "public/icons/play.svg";
import InfoImg from "public/images/info.png";
import Image from "next/image";
// import Popular from "../../components/home/popular";
// import Footer from "../../components/layout/Footer";
import React, { useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";

import Popular from "./popular";

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

const introMovie = mockData[0];
const baseStaticPath = "http://localhost:3000/images/";
export default function HomeContent({ bannerUri = baseStaticPath + "banner.jpg" }: any) {
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVideo(!isVideo);
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [isVideo]);

  const { isTop10, movieScene, ratingTitle, description, movieTitleLogo } = introMovie;
  return (
    <>
      <div className={`font-netflix inline-block -z-10 absolute top-0 left-0`}>
        {bannerUri && (
          <img
            src={bannerUri}
            alt="background"
            className={`-z-10  w-[100vw] object-cover animate-fade ${isVideo ? "opacity-0" : "opacity-100"}`}
          />
        )}
        <div className="absolute bottom-0 left-0 h-[200px] w-full bg-linearGradient" />

        <video
          loop
          autoPlay
          muted
          src="/video/banner.mp4"
          poster="/images/main-bg-lg.png"
          className="-z-20 absolute top-0 left-0 w-full object-cover"
        ></video>
      </div>

      <div className="pt-5 z-0 h-[400px] flex flex-col justify-center text-white">
        <img
          src={movieTitleLogo}
          alt="movie-title"
          className={`min-w-[250px] max-w-[600px] w-[50%] mb-6 mt-[80px] md:mt-2 ${
            isVideo ? "reduce-size" : "recover-size"
          }`}
        />
        <div
          className={`transition duration-300 delay-700 ${
            isVideo ? "animate-fade opacity-0" : "animate-fadeIn opacity-1"
          }`}
        >
          <div className="flex gap-2 text-white mb-6">
            {isTop10 && <Image src={topTenMovie} alt="top movie" width="25" />}
            <p className="font-netflixMedium text-xl">{ratingTitle}</p>
          </div>
          <p className="max-w-[650px]">{description}</p>
        </div>

        <div className="mt-3 flex gap-2 font-semibold">
          <div className="bg-white flex gap-3 items-center text-black px-[20px] py-[5px]  text-lg rounded-sm cursor-pointer hover:animate-pulse">
            <Image src={PlaySvg} alt="play" width="15" />
            <span>Play</span>
          </div>
          <div className="flex gap-3 items-center bg-slate-500 text-white px-[25px] py-[5px] text-sm rounded-sm cursor-pointer hover:animate-pulse">
            <Image src={InfoImg} alt="info" width="20" />
            <span>More Info</span>
          </div>
        </div>
      </div>
      <Popular items={mockItems} />
    </>
  );
}
