// import HomeContent from "../components/home/HomeContent";
import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("../components/home/HomeContent"), {
  ssr: false, // Disable server-side rendering
});
import Layout from "../components/layout";
import LoginLayout from "../components/layout/LoginLayout";
import Registration from "../features/auth/registration";
import { BASE_URL, PaymentIntentDocument } from "../services/api";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { fetcher } from "../services/fetcher";
import StoreProvider from "../store/StoreProvider";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from "@apollo/client/utilities/globals";
import { addApolloState, initializeApollo } from "../lib/apoloClient";
import { StripeProvider } from "react-stripe-elements";
import { STRIPE_PUBLIC_KEY } from "@env";
export const apolloClient = new ApolloClient({
  uri: "http://localhost:3001/graphql/",
  cache: new InMemoryCache(),
});

loadDevMessages();
loadErrorMessages();

export default function Home(props: any) {
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <StripeProvider stripe={STRIPE_PUBLIC_KEY}>
          <Layout>
            <HomeContent />
          </Layout>
        </StripeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
}
