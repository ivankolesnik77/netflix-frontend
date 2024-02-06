import React, { ChangeEvent, FC, useState } from "react";
import { RegistrationStage } from "..";

export type AuthDataType = {
  password: string;
  email: string;
};

const UserForm: FC<{
  stage: RegistrationStage;
  handleSubmit: (data: AuthDataType) => void;
}> = ({ stage, handleSubmit }) => {
  const [authData, setAuthData] = useState({ password: "", email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.getAttribute("name");
    name && setAuthData({ ...authData, [name]: e.target.value });
  };

  return (
    <div className=" mx-auto w-[400px]  max-w-sm" data-uia="form-registration">
      <div>
        <div className="mt-[20px]" data-uia="header">
          <div className="stepHeader" role="status">
            <span id="" className="text-xs" data-uia="">
              ШАГ 1 ИЗ 3
            </span>
            <h1 className="text-3xl" data-uia="stepTitle">
              Создайте пароль, чтобы начать использовать подписку
            </h1>
          </div>
        </div>
        <div>
          <div className=" flex max-w-md flex-col rounded-md  dark:text-gray-100 ">
            <form action="" className="space-y-4">
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
                    className="w-full  border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
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
                    Далее
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

export default UserForm;
