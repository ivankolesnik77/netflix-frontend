import Head from "next/head";
import styles from "./layout.module.css";
import Menu from "./navigation/menu";
import { FC, useEffect, useRef, useState } from "react";
import Footer from "./footer";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Provider, useDispatch, useSelector } from "react-redux";

import StoreProvider from "../../store/StoreProvider";

import localFont from "next/font/local";
import LoginLayout from "./LoginLayout";
import { RootState } from "../../store";
import { graphql } from "relay-runtime";
import environment from "@/services/customFetch";
import { QueryRenderer } from "react-relay";

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

    {
      path: "../../../public/fonts/Netflix-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-netflix",
});

interface IProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (!isAuth) {
    return <LoginLayout>{children}</LoginLayout>;
  }

  return (
    <div>
      <div className="grid h-screen grid-rows-[min-content,1fr,300px] font-netflix text-white ">
        <Menu />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
