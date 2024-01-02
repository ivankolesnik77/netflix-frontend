import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/checkoutForm";

import { PaymentIntentDocument } from "../../services/api";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../services/fetcher";

type Repo = {
  createPaymentIntent: string;
};

const graphqlEndpoint = "http://localhost:3001/graphql";

export const getServerSideProps = async () => {
  const data: Repo = await fetcher(PaymentIntentDocument, { amount: 500 });

  return { props: { data } };
};

export default function Payments({ data }: any) {
  const [stripeElements, setStripeElements] = useState<any>(null);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: data?.createPaymentIntent,
  };
  useEffect(() => {
    const stripePromise = loadStripe(
      "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9",
    );
    setStripeElements(stripePromise);
  }, []);

  if (!data?.createPaymentIntent || !stripeElements) return null;

  return (
    <Elements stripe={stripeElements} options={options}>
      <CheckoutForm clientSecret={(data as any)?.createPaymentIntent} />
    </Elements>
  );
}