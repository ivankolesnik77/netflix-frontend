import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "../../utils/hooks";
import { RootState } from "../../store";
import { BASE_URL } from "../../services/api";
import { fetcher } from "../../services/fetcher";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/redux.store";
import { subscriptionRates } from "../../utils/constansts";
import { setAuth } from "../../store/auth.store";

const PAYMENT_CREDENTIALS = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      email
    }
  }
`;

export const CreateSubscriptionDocument = gql`
  mutation CreateSubscription($subscription: CreateSubscriptionInput!) {
    createSubscription(subscription: $subscription) {
      name
      surname
      subscriptionId
      expiredAt
      token
    }
  }
`;

type UserSubscription = {
  name: string;
  email: string;
  surname: string;
  subscriptionId: number;
  expiredAt: Date;
};

export default function CheckoutForm({ clientSecret }: any) {
  // const token = useAppSelector((state: RootState) => state.cart.orderToken);
  const currentUser = useAppSelector((state: RootState) => state.user);
  const auth = useAppSelector((state: RootState) => state.auth);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [createSubscription] = useMutation<UserSubscription>(
    CreateSubscriptionDocument,
  );
  // const [mutate, data] = useMutation(PAYMENT_CREDENTIALS);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const paymentIntentToken = new URLSearchParams(window.location.search).get(
      clientSecret,
    );

    if (!paymentIntentToken) {
      return;
    }

    try {
      stripe
        .retrievePaymentIntent(paymentIntentToken)
        .then(({ paymentIntent }) => {
          if (!paymentIntent) return;
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { email, subscriptionType } = currentUser;
    const subscriptionPrice =
      subscriptionType && subscriptionRates[subscriptionType];
    if (!stripe || !elements || !subscriptionPrice) {
      return;
    }

    const data = await createSubscription({
      variables: {
        subscription: {
          user: { email, name, surname, password: auth.password },
          type: subscriptionType,
          price: subscriptionPrice,
        },
      },
    });

    if (data.data) {
      const { token, ...userPayload } = (data.data as any).createSubscription;
      localStorage.setItem("token", token);
      dispatch(setUser(userPayload));
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              address: {
                country: "UK",
              },
            },
          },
          return_url: `http://localhost:3000`,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "");
      } else {
        setMessage("An unexpected error occurred.");
      }

      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          fields: {
            billingDetails: { address: { country: "never" }, name: "auto" },
          },
        }}
      />

      <div className="relative mb-3">
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
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
