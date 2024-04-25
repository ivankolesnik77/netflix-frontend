import React from "react";

import { useAppSelector } from "../../utils/hooks";
import Link from "next/link";

import LoginForm from "../../features/auth/components/login";

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
