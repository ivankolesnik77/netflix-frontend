import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useAppSelector } from "../../../../utils/hooks";
import PaymentForm from "./PaymentForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9",
);

export default function PaymentFormWrapper() {
  const cart = useAppSelector((state) => state.cart);
  if (!cart.clientSecret) return null;
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: cart.clientSecret }}
    >
      <PaymentForm />
    </Elements>
  );
}
