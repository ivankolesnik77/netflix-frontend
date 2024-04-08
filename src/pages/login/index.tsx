import React from "react";

import { useAppSelector } from "../../utils/hooks";
import Link from "next/link";

import LoginForm from "../../features/auth/components/login";

const LoginPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return <LoginForm />;
};

export default LoginPage;
