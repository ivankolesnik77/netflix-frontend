// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9"
//   "sk_test_51OJfncBX7glaLMPlZXighIdG9OwSr99B20L8BrKHrDkRdrdsRNVGNJpdnlY6BhUBoatkRPWB5MEsPWEqLvSNaO9000jCetdXjk",
// );

import React, { FC, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { fetcher } from "../../services/fetcher";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CheckoutForm: FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const token = useSelector((state: RootState) => state.cart.orderToken);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const isValidForm = elements?.getElement(PaymentElement);
    if (!stripe || !elements || !isValidForm || !token) return;

    const return_url = `http://localhost:3000/confirmOrder?token=${token}`;
    console.log(return_url);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log("Payment succeeded!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "#fff" }}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="border-1 mx-auto mt-3 w-full rounded-md border border-white px-5 py-2 font-bold hover:bg-white hover:text-gray-800"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
