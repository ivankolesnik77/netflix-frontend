import React, { useEffect, useMemo, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { PaymentIntentDocument } from "../../services/api";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";
import { fetcher } from "../../services/fetcher";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

type Repo = {
  createPaymentIntent: string;
};

const graphqlEndpoint = "http://localhost:3001/graphql";

// export const getServerSideProps = async () => {
//   const data: Repo = await fetcher(PaymentIntentDocument, { amount: 500 });

//   return { props: { data } };
// };

export default function Payments() {
  const token = useSelector((state: RootState) => state.cart.orderToken);
  const [stripeElements, setStripeElements] = useState<any>(null);

  useEffect(() => {
    const stripePromise = loadStripe(
      "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9",
    );
    setStripeElements(stripePromise);
  }, []);

  const options = useMemo(() => ({ clientSecret: token! }), [token]);

  if (!token || !stripeElements) return null;

  return (
    <Elements stripe={stripeElements} options={options}>
      <CheckoutForm
        clientSecret={options.clientSecret}
        // onSubmit={handleClick}
      />
    </Elements>
  );
}
