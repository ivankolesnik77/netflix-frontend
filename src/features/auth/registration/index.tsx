import ChoosePlan from "./ChoosePlan";
import UserForm from "./UserForm";
import React, { useState } from "react";

export enum RegistrationStage {
  LoginForm = "LOGIN_FORM",
  PaymentPlan = "PAYMENT_PLAN",
}

const Registration = () => {
  const [stage, setStage] = useState(RegistrationStage.LoginForm);

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
        return <ChoosePlan stage={stage} />;
    }
  };

  return (
    <div className="h-[100vh] bg-white text-left text-black">
      {renderForm()}
    </div>
  );
};

export default Registration;
