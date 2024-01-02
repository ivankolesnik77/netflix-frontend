import React from "react";

const LoginMenu = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b  py-6 font-light text-white md:px-5 md:text-[10px] lg:text-lg">
      <img
        src="/icons/logo.svg"
        alt="logo"
        className="mr-8 md:mr-6 md:w-[120px] "
      />
      <button
        type="submit"
        className="font-netflix text-xl font-semibold text-black"
      >
        Войти
      </button>
    </nav>
  );
};

export default LoginMenu;
