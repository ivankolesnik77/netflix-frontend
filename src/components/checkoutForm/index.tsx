// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9"
//   "sk_test_51OJfncBX7glaLMPlZXighIdG9OwSr99B20L8BrKHrDkRdrdsRNVGNJpdnlY6BhUBoatkRPWB5MEsPWEqLvSNaO9000jCetdXjk",
// );

import React, { FC, createRef, useEffect, useRef, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { fetcher } from "../../services/fetcher";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export type IPaymentIntent = { createPaymentIntent?: string };
const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },

  hidePostalCode: true, // Optionally hide the postal code field
};

const CheckoutForm: FC<IPaymentIntent> = () => {
  const token = useSelector((state: RootState) => state.cart.clientSecret);
  const stripe = useStripe();
  // const [cardElement, setCardElement] = useState<any>(null);
  // const [cardElementContainer, setCardElementContainer] = useState<any>(null);

  // useEffect(() => {
  //   if (elements && !cardElement) {
  //     const card = elements.create("card");
  //     setCardElement(card);
  //     card.mount(cardElementContainer);
  //     console.log("Mounted card: ");
  //   }
  // }, [elements]);

  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const isValidForm = elements?.getElement(PaymentElement);
    if (!stripe || !elements || !isValidForm || !token) return;

    const return_url = `http://localhost:3000/confirmOrder?token=${token}`;

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
      <PaymentElement
        {...cardStyle}
        options={{ wallets: { applePay: undefined, googlePay: undefined } }}
      />
      {/* <CardElement />
      <div className="flex gap-3">
        <CardCvcElement />
      </div> */}
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
