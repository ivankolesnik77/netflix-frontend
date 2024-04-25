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
import Video from "next-video";
import introVideo from "@/videos/intro.mp4";
import Popular from "./popular";
import VideoPlayer from "../VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Registration from "../../features/auth/registration";

import { setAuth } from "../../store/auth.store";

import {
  gql,
  useApolloClient,
  useMutation,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { setUser } from "../../store/redux.store";
import { useAppSelector } from "../../utils/hooks";
import { REFRESH_TOKEN } from "../../services/interceptor";
import { Router, useRouter } from "next/router";
const mockData = {
  movieScene: "/images/main-bg.png",
  movieTitleLogo: "/images/intro-logo.png",
  isTop10: true,
  ratingTitle: "#1 in TV Shows Today",
  description:
    "Determined to protect a young patient who escaped a mysterious cult, a psychiatrist takes the girl in, putting her own family — and life — in danger.",
};
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

const VerifyTokenDocument = gql`
  query AuthMe {
    authMe {
      email
      userName
    }
  }
`;

export const fileName = "intro";

const baseStaticPath = "http://localhost:3002/images";

export default function Home() {
  const dispatch = useDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useQuery(VerifyTokenDocument, {
    onCompleted(data) {
      console.log(data);
      if (data.authMe !== null) {
        const user = data.authMe;
        dispatch(setAuth(true));
        dispatch(setUser({ email: user.email, userName: user.userName }));
      }
    },
    skip: !!isAuth,
  });

  const [refreshTokens] = useMutation(REFRESH_TOKEN, {
    onCompleted(data) {
      console.log(data);
      localStorage.setItem("accessToken", data.refreshTokens.accessToken);
      dispatch(setAuth(true));
    },
  });

  useEffect(() => {
    if (!isAuth && isAuth !== null) {
      refreshTokens();
    }
  }, [isAuth]);

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
    mockData;
  const router = useRouter();
  if (!isAuth) {
    router.push("/login");
    return;
  }

  return (
    <div>
      <div
        className={`-top-65 absolute -z-10 inline-block h-[100vh] font-netflix`}
      >
        {/* <Image
          src={"/images/main-bg-lg.png"}
          alt="background"
          className={`absolute z-20 animate-fade object-cover ${
            isVideo ? "opacity-0" : "opacity-100"
          }`}
          quality="100"
          layout="fill"
          sizes="100vw"
          priority
        /> */}

        <div className="absolute -bottom-10 left-0 z-20 h-[200px] w-full bg-linearGradient" />

        <Video
          src={introVideo}
          loop
          autoPlay
          muted
          controls
          // poster="/images/main-bg-lg.png"
          className="absolute  left-0 -z-20 h-[100%] min-w-[100vw] object-cover"
        />
      </div>

      <div className="z-10 mt-[165px] flex  flex-col justify-center  text-white md:px-10 lg:px-[60px]">
        <Image
          src={movieTitleLogo}
          alt="movie-title"
          sizes="50%"
          style={{ width: "50%", height: "auto" }}
          width={100}
          height={140}
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
            {isTop10 && (
              <Image src={topTenMovie} alt="top movie" width={32} height={32} />
            )}
            <p className="font-netflixMedium text-2xl font-semibold">
              {ratingTitle}
            </p>
          </div>
          <p className="max-w-[650px] text-xl">{description}</p>
        </div>

        <div className="mb-[60px] mt-3 flex gap-2 font-semibold">
          <div className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-[32px]  py-[10px] text-lg text-black hover:animate-pulse">
            <Image src={PlaySvg} alt="play" width={24} height={26} />
            <span className="text-xl font-semibold">Play</span>
          </div>
          <div className=" flex cursor-pointer items-center gap-3 rounded-md bg-slate-500 px-[25px] py-[5px] text-sm text-white hover:animate-pulse">
            <Image src={InfoImg} alt="info" width={30} />
            <span className="text-xl font-semibold">More Info</span>
          </div>
        </div>
        <Popular items={mockItems} />
      </div>
    </div>
  );
}
