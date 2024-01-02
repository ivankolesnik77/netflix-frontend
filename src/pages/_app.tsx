import React from "react";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import "../fontawesome";
import "../styles/globals.css";
import Registration from "../features/auth/registration";
import LoginLayout from "../components/layout/LoginLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
