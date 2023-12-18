// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9"
//   "sk_test_51OJfncBX7glaLMPlZXighIdG9OwSr99B20L8BrKHrDkRdrdsRNVGNJpdnlY6BhUBoatkRPWB5MEsPWEqLvSNaO9000jCetdXjk",
// );

import React, { FC, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm: FC<{ onSubmit: any }> = ({ onSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    onSubmit();

    const card = elements?.getElement(CardElement);
    if (!stripe || !elements || !card) return;
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
