"use client";

import React, { useEffect } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/checkoutForm";
import { useCreatePaymentIntentMutation } from "../../services/api";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9"
);

export default function Payments() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "sk_test_51OJfncBX7glaLMPlZXighIdG9OwSr99B20L8BrKHrDkRdrdsRNVGNJpdnlY6BhUBoatkRPWB5MEsPWEqLvSNaO9000jCetdXjk",
  };

  const [createPayment, { isLoading, data }] = useCreatePaymentIntentMutation();

  return <h2>test</h2>;
}
