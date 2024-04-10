import Head from "next/head";
import styles from "./layout.module.css";
import Menu from "../../features/navigation/menu";
import { FC, useEffect, useRef, useState } from "react";
import Footer from "./Footer";

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
      path: "../../../public/fonts/Netflix-Light.otf",
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
    <QueryRenderer
      environment={environment}
      query={graphql`
        query UserQuery {
          viewer {
            id
          }
        }
      `}
      variables={{}}
      render={({ error, props }: any) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (
          <div className={netflixFont.className}>
            <div className="font-netflix grid h-screen grid-rows-[min-content,1fr,300px] text-white md:px-10 lg:px-[60px]">
              <Menu />
              {children}
              <Footer />
            </div>
          </div>
        );
      }}
    />
  );
};

export default Layout;
