import Head from "next/head";
import styles from "./layout.module.css";
import Menu from "./navigation/menu";
import { FC, useEffect, useRef, useState } from "react";
import Footer from "./footer";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Provider, useDispatch, useSelector } from "react-redux";

import StoreProvider from "../../store/StoreProvider";

import localFont from "next/font/local";

import LoginMenu from "./navigation/loginMenu";

const netflixFont = localFont({
  src: [
    {
      path: "../../../public/fonts/Netflix-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Netflix-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-netflix",
});

interface IProps {
  children: React.ReactNode[] | React.ReactNode;
}

const LoginLayout: FC<IProps> = ({ children }) => {
  return (
    <StoreProvider>
      <div className={netflixFont.className}>
        <div className="font-netflix grid h-screen grid-rows-[min-content,1fr,300px] bg-white text-white ">
          <LoginMenu />
          {children}
          <Footer />
        </div>
      </div>
    </StoreProvider>
  );
};

export default LoginLayout;
