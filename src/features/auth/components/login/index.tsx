import { ApolloError, gql, useMutation, useQuery } from '@apollo/client'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/store/reducers/auth.slice'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import DefaultButton from '@/components/layout/buttons/DefaultButton'
import { setUser } from '@/store/reducers/user.slice'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'

export type AuthDataType = {
    password: string
    email: string
}

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
`)

interface IAuthData {
    password: string
    email: string
}

const LoginForm: FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            password: '',
            email: '',
        },
    })
    const [authData, setAuthData] = useState({ password: '', email: '' })
    const { error, refetch, data } = useQuery(AUTH_USER, {
        skip: true,
    })

    const onSubmit = async (authData: IAuthData) => {
        try {
            const data: any = await refetch({ user: authData })
            const token = data?.data?.authUser?.user?.accessToken
            if (!!token) {
                const { accessToken, ...user } = data.data.authUser.user

                localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token))
                dispatch(
                    setUser({ email: user.email, userName: user.userName })
                )
                dispatch(setAuth(true))
                router.push('/')
            }
        } catch (err: any) {
            console.log(err)
            setError('root', err.message as any)
        }
    }

    console.log(authData)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.getAttribute('name')
        name && setAuthData({ ...authData, [name]: e.target.value })
    }

    return (
        <div
            className=" mx-auto h-min  w-[400px] max-w-sm rounded-xl p-5"
            data-uia="form-registration"
        >
            <div>
                <div className="mt-[20px]" data-uia="header">
                    <div className="stepHeader" role="status">
                        <h2
                            className="text-center text-[30px] text-black"
                            data-uia="stepTitle"
                        >
                            Login
                        </h2>
                    </div>
                </div>
                <div>
                    <div className=" flex max-w-md flex-col rounded-md  dark:text-gray-100 ">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4  text-black"
                        >
                            <div className="mt-3">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className=" mb-2 block text-[14px] text-black"
                                    >
                                        Адресс электронной почты
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: true,
                                        })}
                                        aria-invalid={
                                            errors.email ? 'true' : 'false'
                                        }
                                        placeholder="leroy@jenkins.com"
                                        className="w-full  border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div className="my-3 mb-2">
                                    <div className="mb-2 flex justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-[14px] text-black"
                                        >
                                            Пароль
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                        id="password"
                                        placeholder="*****"
                                        className="w-full  border px-3 py-2 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <Link
                                        rel="noopener noreferrer"
                                        href="#"
                                        className="text-[14px]  text-blue-600 hover:underline"
                                    >
                                        Forgot a password?
                                    </Link>
                                    <Link
                                        rel="noopener noreferrer"
                                        href="/register"
                                        className="text-[14px]  text-blue-600 hover:underline"
                                    >
                                        {"Don't have an account?"}
                                    </Link>
                                </div>
                            </div>
                            {error && (
                                <span className="text-[12px] my-3 text-red">
                                    {error.message}
                                </span>
                            )}
                            <div className="space-y-2">
                                <div>
                                    <DefaultButton
                                        type="submit"
                                        value="Войти"
                                        className="bg-red-600 text-3xl w-full rounded-md px-8 py-3 font-semibold text-white"
                                    ></DefaultButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
