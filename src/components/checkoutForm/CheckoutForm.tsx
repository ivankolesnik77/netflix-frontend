import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "../../utils/hooks";
import { RootState } from "../../store";
import { BASE_URL } from "../../services/api";
import { fetcher } from "../../services/fetcher";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { IUserSliceState, setUser } from "../../store/redux.store";
import { subscriptionRates } from "../../utils/constansts";

import io, { Socket } from "socket.io-client";
import { setAuth } from "../../store/auth.store";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { IPaySubscription } from "./types";

export const CreateSubscriptionDocument = gql`
  mutation CreateSubscription($subscription: CreateSubscriptionInput!) {
    createSubscription(subscription: $subscription) {
      token
      clientSecret
    }
  }
`;

const cardPaymentOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#000",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

let socket: Socket;

export default function CheckoutForm({ clientSecret }: any) {
  const paymentMethod = useAppSelector(
    (state: RootState) => state.cart.paymentMethod,
  );
  const currentUser = useAppSelector((state: RootState) => state.user);
  const auth = useAppSelector((state: RootState) => state.auth);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [createSubscription] = useMutation<{
    createSubscription: {
      token: string;
      clientSecret: string;
    };
  }>(CreateSubscriptionDocument, {
    onError: (err: any) => {
      console.log(err);
    },
  });

  useEffect(() => {
    const runSocket = async () => {
      await socketInitializer();
    };
    runSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  async function socketInitializer() {
    const socket = io("http://localhost:8080");

    await fetch("/api/socket");

    socket.on("connect", () => {
      console.log("Connected to the server");
    });
  }

  const paySubscription = async ({
    currentUser,
    paymentMethodId,
  }: IPaySubscription) => {
    if (!stripe) return;

    const { email, subscriptionType } = currentUser;
    const subscriptionPrice =
      subscriptionType && subscriptionRates[subscriptionType];

    const params = {
      subscription: {
        user: { email, name, surname, password: auth.password },
        type: subscriptionType,
        price: subscriptionPrice,
        paymentMethod: paymentMethodId,
      },
    };
    const { data } = await createSubscription({
      variables: params,
    });

    if (data) {
      const confirmPayment = await stripe.confirmCardPayment(
        data?.createSubscription.clientSecret,
      );
      if (confirmPayment?.error) {
        console.log(confirmPayment.error.message);
      } else {
        dispatch(setAuth());
        localStorage.setItem("token", data.createSubscription.token);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { subscriptionType } = currentUser;
    if (!stripe || !elements || !subscriptionType) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement("card")!,
      billing_details: {
        name: name,
        email: "stonebo0sh@gmail.com",
      },
    });

    if (result.error) {
      console.log(result.error);
      return;
    }

    paySubscription({ currentUser, paymentMethodId: result.paymentMethod.id });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        options={cardPaymentOptions}
        className="w-full rounded border border-gray-300 p-2"
      />

      <div className="relative my-3">
        <input
          type="text"
          id="hs-floating-input-email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="peer block w-full rounded-lg border border-solid border-gray-200  p-4 text-sm outline-none placeholder:text-transparent autofill:pb-2 autofill:pt-6 focus:border-blue-400 focus:pb-2 focus:pt-6 focus:shadow-field
         focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 [&:not(:placeholder-shown)]:pb-2
            [&:not(:placeholder-shown)]:pt-6"
          placeholder="email@gmail.com"
        />
        <label
          htmlFor="hs-floating-input-email"
          className=" pointer-events-none absolute start-0 top-0 h-full truncate border border-transparent p-4 text-sm text-gray-500 transition duration-100 ease-in-out peer-focus:-translate-y-1.5 peer-focus:text-xs peer-focus:text-gray-500
    peer-disabled:pointer-events-none
    peer-disabled:opacity-50
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:text-gray-200"
        >
          Имя
        </label>
      </div>
      <div className="relative">
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          id="hs-floating-input-email"
          className="peer block w-full rounded-lg border border-solid border-gray-200  p-4 text-sm outline-none placeholder:text-transparent autofill:pb-2 autofill:pt-6 focus:border-blue-400 focus:pb-2 focus:pt-6 focus:shadow-field
         focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 [&:not(:placeholder-shown)]:pb-2
            [&:not(:placeholder-shown)]:pt-6"
          placeholder="email@gmail.com"
        />
        <label
          htmlFor="hs-floating-input-email"
          className="pointer-events-none absolute start-0 top-0 h-full truncate border border-transparent p-4 text-sm text-gray-500 transition duration-100 ease-in-out peer-focus:-translate-y-1.5 peer-focus:text-xs peer-focus:text-gray-500
    peer-disabled:pointer-events-none
    peer-disabled:opacity-50
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:text-gray-200"
        >
          Фамилия
        </label>
      </div>
      <button
        className="my-5 w-full rounded-md bg-red-600 px-8 py-3 font-semibold text-white"
        disabled={!stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
    </form>
  );
}
