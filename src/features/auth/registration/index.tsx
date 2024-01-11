import { IPaymentIntent } from "../../../components/checkoutForm";
import ChoosePlan from "./ChoosePlan";
import PaymentForm from "./PaymenForm";
import UserForm from "./UserForm";
import React, { FC, useState } from "react";

export enum RegistrationStage {
  LoginForm = "LOGIN_FORM",
  PaymentForm = "PAYMENT_FORM",
  PaymentPlan = "PAYMENT_PLAN",
}

const Registration: FC<{ paymentIntent: IPaymentIntent }> = ({
  paymentIntent,
}) => {
  const [stage, setStage] = useState(RegistrationStage.PaymentForm);

  const renderForm = () => {
    switch (stage) {
      case RegistrationStage.LoginForm:
        return (
          <UserForm
            stage={stage}
            handleSubmit={() => setStage(RegistrationStage.PaymentPlan)}
          />
        );
      case RegistrationStage.PaymentPlan:
        return (
          <ChoosePlan
            stage={stage}
            handleSubmit={() => setStage(RegistrationStage.PaymentForm)}
          />
        );
      case RegistrationStage.PaymentForm:
        return (
          <PaymentForm
            paymentIntent={paymentIntent}
            stage={stage}
            handleSubmit={() => setStage(RegistrationStage.LoginForm)}
          />
        );
    }
  };

  return (
    <div className="h-[100vh] bg-white text-left text-black">
      {renderForm()}
    </div>
  );
};

export default Registration;
