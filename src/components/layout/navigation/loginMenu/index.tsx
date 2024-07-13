import React from 'react'

import { useRouter } from 'next/router'

const LoginMenu = () => {
    const router = useRouter()
    return (
        <nav className="z-20 flex w-full items-center justify-between border-b py-6 font-light text-white md:px-5 md:text-[10px] lg:text-lg">
            <img
                src="/icons/logo.svg"
                alt="logo"
                className="mr-8 md:mr-6 md:w-[120px] "
                height="auto"
            />
            <button
                onClick={() => router.push({ pathname: '/login' })}
                type="submit"
                className="font-netflix text-xl font-semibold text-black"
            >
                Войти
            </button>
        </nav>
    )
}

export default LoginMenu
