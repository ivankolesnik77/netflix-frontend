import dynamic from "next/dynamic";

const Home = dynamic(() => import("../components/home"), {
  ssr: false, 
});

import { ApolloClient, InMemoryCache } from "@apollo/client";

import StoreProvider from "../store/StoreProvider";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:3002/graphql/",
  cache: new InMemoryCache(),
});

loadDevMessages();
loadErrorMessages();

export default function HomePage(props: any) {
  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  );
}
