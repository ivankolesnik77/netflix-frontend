import { useMutation, useQuery } from '@apollo/client'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import DefaultButton from '@/components/layout/buttons/DefaultButton'

import { RESET_PASSWORD } from '@/graphql/queries/account/resetPassword'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/utils/hooks'
import { setAuth } from '@/store/reducers/auth.slice'

export type IFormData = {
    password: string
    repeatedPassword: string
}

const ResetPasswordForm: FC = () => {
    const resetToken = useAppSelector((state) => state.auth.resetPasswordToken)
    const userEmail = useAppSelector((state) => state.user.email)
    const searchParams = useSearchParams() as any
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            password: '',
            repeatedPassword: '',
        },
    })

    const [resetPassword] = useMutation(RESET_PASSWORD)
    const dispatch = useDispatch()
    const onSubmit = async (formData: IFormData) => {
        try {
            const token = searchParams.get('token') || resetToken
            const email = searchParams.get('email') || userEmail
            const data: any = await resetPassword({
                variables: {
                    user: {
                        password: formData.password,
                        resetPasswordToken: token,
                        email,
                    },
                },
            })
            const status = data?.data?.resetPassword?.status
            if (!!status) {
                dispatch(setAuth(false))
                router.push('/login')
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div
            className="mx-auto h-min  w-[400px] max-w-sm rounded-xl p-5"
            data-uia="form-registration"
        >
            <div>
                <div className="mt-[20px]" data-uia="header">
                    <div className="stepHeader" role="status">
                        <h2 className="text-center text-3xl text-black">
                            Reset possword
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
                                        className=" mb-2 block text-sm text-black"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                        aria-invalid={
                                            errors.password ? 'true' : 'false'
                                        }
                                        placeholder="****"
                                        className="w-full  border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div className="my-3 mb-2">
                                    <div className="mb-2 flex justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm text-black"
                                        >
                                            Пароль
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        {...register('repeatedPassword', {
                                            required: true,
                                        })}
                                        id="repeatedPassword"
                                        placeholder="****"
                                        className="w-full  border px-3 py-2 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                            {/* {error && (
                                <span className="text-small my-3 text-red">
                                    {error.message}
                                </span>
                            )} */}
                            <div className="space-y-2">
                                <div>
                                    <DefaultButton
                                        type="submit"
                                        value="Confirm"
                                        className="bg-red-600 w-full rounded-md px-8 py-3 font-semibold text-white"
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

export default ResetPasswordForm
