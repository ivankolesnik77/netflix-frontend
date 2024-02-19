import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

export const Payments = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [stripeElements, setStripeElements] = useState<any>(null);

  useEffect(() => {
    const stripePromise = loadStripe(
      "pk_test_51OJfncBX7glaLMPlUJuYKEOxCpg8PX2WikiduFHNd5dFgR1xFHfBxYp5xXhuLMVGbALFhf0ay1oJHud0SG9fXoYz00PbeG8AD9",
    );
    setStripeElements(stripePromise);
  }, []);

  const options = useMemo(
    () => ({ clientSecret: cart.clientSecret! }),
    [cart.clientSecret],
  );

  if (!cart.clientSecret || !stripeElements) return null;

  return (
    <Elements stripe={stripeElements} options={options}>
      <CheckoutForm />
    </Elements>
  );
};
