import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("../components/home/HomeContent"), {
  ssr: false, // Disable server-side rendering
});

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import StoreProvider from "../store/StoreProvider";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:3002/graphql/",
  cache: new InMemoryCache(),
});

loadDevMessages();
loadErrorMessages();

export default function Home(props: any) {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  );
}
