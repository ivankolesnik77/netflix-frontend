import { gql, useMutation } from "@apollo/client";
import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/auth.store";
import { useRouter } from "next/router";
// import bcrypt from "bcryptjs";
export type AuthDataType = {
  password: string;
  email: string;
};

const AUTH_USER = gql(`
  mutation AuthUser($user: AuthUserInput!) {
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
  const [login] = useMutation(AUTH_USER, {
    onCompleted: (data: any) => {
      console.log(data);
      localStorage.setItem("accessToken", data.authUser?.user?.accessToken);
      dispatch(setAuth(true));
      router.push("/");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = (authData: IAuthData) => {
    login({ variables: { user: authData } });
  };

  const [authData, setAuthData] = useState({ password: "", email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.getAttribute("name");
    name && setAuthData({ ...authData, [name]: e.target.value });
  };

  return (
    <div
      className=" mx-auto h-[calc(100vh-108px)] w-[400px]  max-w-sm"
      data-uia="form-registration"
    >
      <div>
        <div className="mt-[20px]" data-uia="header">
          <div className="stepHeader" role="status">
            <h2 className="text-3xl" data-uia="stepTitle">
              Логин
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
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-md  text-blue-600 hover:underline"
                >
                  Забыл пароль?
                </a>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    onClick={() => handleSubmit(authData)}
                    type="button"
                    className="w-full rounded-md bg-red-600 px-8 py-3 font-semibold text-white"
                  >
                    Войти
                  </button>
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
