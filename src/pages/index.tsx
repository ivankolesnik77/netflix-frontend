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

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql/",
  cache: new InMemoryCache(),
});

const INTRO_VIDEO = gql`
  query Video {
    videos {
      id
      file
      title
    }
  }
`;

export const getServerSideProps = async () => {
  const videoResponse = await fetcher(INTRO_VIDEO);
  const paymentIntent = await fetcher(PaymentIntentDocument, { amount: 500 });
  return { props: { videos: videoResponse.videos, paymentIntent } };
};

export default function Home(props: any) {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Layout>
          <HomeContent {...props} />
        </Layout>
      </StoreProvider>
    </ApolloProvider>
  );
}
