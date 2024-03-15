import React, { useMemo } from "react";

import type { AppProps } from "next/app";
import "../fontawesome";
import "../styles/globals.css";
import Layout from "../components/layout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import StoreProvider from "../store/StoreProvider";
import { apolloClient } from "../services/apolloClient";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </ApolloProvider>
  );
}
