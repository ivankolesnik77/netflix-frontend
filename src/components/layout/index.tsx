import Head from "next/head";
import styles from "./layout.module.css";
import Menu from "./Menu";
import { FC, useRef } from "react";
import Footer from "./Footer";
import { api } from "../../services/api";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../../store";
import StoreProvider from "../../StoreProvider";

import localFont from "next/font/local";

const netflixFont = localFont({
  src: "../../../public/fonts/Netflix-Regular.otf",
  display: "swap",
  variable: "--font-netflix",
});

interface IProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <StoreProvider>
      <div className={netflixFont.variable}>
        <div className="font-netflix flex flex-col md:px-10 lg:px-[60px]">
          <Menu />

          <div>{children}</div>

          <Footer />
        </div>
      </div>
    </StoreProvider>
  );
};

export default Layout;
