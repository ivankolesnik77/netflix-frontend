import React, { FC, useEffect } from "react";
import { RegistrationStage } from "..";

import { IPaymentIntent } from "../../../../components/checkoutForm";
import { useMutation } from "@apollo/client";
import { PaymentIntentDocument } from "../../../../services/api";
import { setPaymentCredentials } from "../../../../store/redux.store";
import { useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import { Payments } from "../../../payments";
const subscriptionPrice = 300;

const PaymentForm: FC<{
  stage: RegistrationStage;
  handleSubmit: () => void;
}> = ({ stage, handleSubmit }) => {
  const dispatch = useDispatch();
  const [createPaymentIntent, { data }] = useMutation(PaymentIntentDocument, {
    variables: { amount: subscriptionPrice },
  });

  useEffect(() => {
    const getRequestPaymentIntent = async () => {
      const paymentIntent: any = await createPaymentIntent();

      const { clientSecret } = paymentIntent.data.paymentIntent;
      dispatch(setPaymentCredentials({ clientSecret }));
    };

    getRequestPaymentIntent();
  }, []);

  return (
    <div className=" mx-auto w-[400px]  max-w-sm">
      <div className="mt-[20px]" data-uia="header">
        <div className="stepHeader" role="status">
          <span id="" className="text-xs" data-uia="">
            ШАГ 3 ИЗ 3
          </span>
          <h1 className="text-3xl" data-uia="stepTitle">
            Мы принимаем Visa, Mastercard и American Express.
          </h1>
        </div>
      </div>
      <div>
        <span
          className="my-3 flex gap-2"
          aria-label="Мы принимаем Visa, Mastercard и American Express."
        >
          <img
            src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png"
            alt="Visa"
          />
          <img
            src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png"
            alt="Mastercard"
          />
          <img
            src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png"
            alt="American Express"
          />
        </span>
      </div>
      <Payments />
      <small>
        <span className="mt-3 text-gray-500">
          Устанавливая флажок ниже, вы соглашаетесь с Правилами использования и
          Положением о конфиденциальности, а также подтверждаете, что вам есть
          18 лет/год. Netflix будет автоматически продлевать вашу подписку и
          взимать плату за нее (в настоящее время 9,99 €/месяц), используя
          указанный вами способ оплаты, пока вы не отмените подписку. Отменить
          подписку можно в любой момент, и плата больше взиматься не будет.
        </span>
      </small>
    </div>
  );
};

export default PaymentForm;
