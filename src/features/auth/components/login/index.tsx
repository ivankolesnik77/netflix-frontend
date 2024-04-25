import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/auth.store";
import { useRouter } from "next/router";
import Link from "next/link";
import DefaultButton from "@/components/layout/buttons/DefaultButton";
// import bcrypt from "bcryptjs";
export type AuthDataType = {
  password: string;
  email: string;
};

const AUTH_USER = gql(`
  query AuthUser($user: AuthUserInput!) {
    authUser(user: $user) {
      user {
        id
        email
        userName
        accessToken
      }
      error
    }
  }
`);

interface IAuthData {
  password: string;
  email: string;
}

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [authData, setAuthData] = useState({ password: "", email: "" });
  const { error, refetch } = useQuery(AUTH_USER, {
    onCompleted: (data: any) => {
      console.log(data);
      localStorage.setItem("accessToken", data.authUser?.user?.accessToken);
      dispatch(setAuth(true));
      router.push("/");
    },
    variables: { user: authData },
    skip: true,
  });

  const handleSubmit = (authData: IAuthData) => {
    console.log(authData);
    refetch({ variables: { user: authData } });
  };

  console.log(authData);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.getAttribute("name");
    name && setAuthData({ ...authData, [name]: e.target.value });
  };

  return (
    <div
      className=" mx-auto h-[calc(100vh-108px)] h-min  w-[400px] max-w-sm rounded-xl p-5"
      data-uia="form-registration"
    >
      <div>
        <div className="mt-[20px]" data-uia="header">
          <div className="stepHeader" role="status">
            <h2
              className="text-center text-3xl text-black"
              data-uia="stepTitle"
            >
              Login
            </h2>
          </div>
        </div>
        <div>
          <div className=" flex max-w-md flex-col rounded-md  dark:text-gray-100 ">
            <form action="" className="space-y-4  text-black">
              <div className="mt-3">
                <div>
                  <label
                    htmlFor="email"
                    className=" mb-2 block text-sm text-black"
                  >
                    Адресс электронной почты
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={authData.email}
                    onChange={handleChange}
                    placeholder="leroy@jenkins.com"
                    className="w-full  border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="my-3 mb-2">
                  <div className="mb-2 flex justify-between">
                    <label htmlFor="password" className="text-sm text-black">
                      Пароль
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={authData.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="*****"
                    className="w-full  border px-3 py-2 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex justify-between">
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="text-md  text-blue-600 hover:underline"
                  >
                    Forgot a password?
                  </Link>
                  <Link
                    rel="noopener noreferrer"
                    href="/register"
                    className="text-md  text-blue-600 hover:underline"
                  >
                    {"Don't have an account?"}
                  </Link>
                </div>
              </div>
              {error && (
                <span className="text-small my-3 text-red">
                  {error.message}
                </span>
              )}
              <div className="space-y-2">
                <div>
                  <DefaultButton
                    value="Войти"
                    onClick={() => handleSubmit(authData)}
                    type="button"
                    className="bg-red-600 w-full rounded-md px-8 py-3 font-semibold text-white"
                  ></DefaultButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
