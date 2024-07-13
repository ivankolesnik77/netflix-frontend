import React, { ChangeEvent, FC, useState } from 'react'
import { RegistrationStage } from '..'
import DefaultButton from '@/components/layout/buttons/DefaultButton'
import * as yup from 'yup'
import { gql } from '@/__generated__/gql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DocumentNode, useQuery } from '@apollo/client'
import { Query } from '@/__generated__/graphql'

export type AuthDataType = {
    password: string
    email: string
}

const regex = new RegExp('^(?=.*[A-Z]).{8,}$')
const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().matches(regex).required(),
    })
    .required()

interface IFormInput {
    email: string
    password: string
}

const CheckUserWithEmail = gql(`
  query CheckUserWithEmail ($email: String!) {
      checkUserWithEmail (email: $email) {
        isExistingUser
      }
    }
`) as DocumentNode

const UserForm: FC<{
    stage: RegistrationStage
    onSubmit: (data: AuthDataType) => void
}> = ({ stage, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    })
    console.log(isSubmitting, isValid)

    const values = getValues()
    useQuery(CheckUserWithEmail, {
        variables: { email: values.email },
        onCompleted: (data) => {
            console.log(data.checkUserWithEmail)
            if (data.checkUserWithEmail.isExistingUser) {
                setError('email', {
                    type: 'validate',
                    message: 'Email is already existing',
                })
                setIsSubmitting(false)
            } else {
                console.log('submit')
                setIsSubmitting(false)
                onSubmit(values)
            }
        },
        onError: () => setIsSubmitting(false),
        skip: !isSubmitting || !isValid,
    })

    const handleSubmitLocal = (data: any) => {
        console.log(data)
    }

    return (
        <div
            className=" mx-auto w-[400px]  max-w-sm"
            data-uia="form-registration"
        >
            <div>
                <div className="mt-[20px]" data-uia="header">
                    <div className="stepHeader" role="status">
                        <span id="" className="text-xs" data-uia="">
                            Step 1 of 3
                        </span>
                        <h1 className="text-3xl" data-uia="stepTitle">
                            Create a password to start using your subscription
                        </h1>
                    </div>
                </div>
                <div>
                    <div className=" flex max-w-md flex-col rounded-md  dark:text-gray-100 ">
                        <form
                            onSubmit={handleSubmit(handleSubmitLocal)}
                            action=""
                            className="space-y-4"
                        >
                            <div className="mt-3">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className=" mb-2 block text-sm text-black"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        id="email"
                                        placeholder="leroy@jenkins.com"
                                        className="w-full border-0 px-3 py-2"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-xs capitalize text-red text-red dark:text-green-400">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="my-3 mb-2">
                                    <div className="mb-2 flex justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm text-black"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        {...register('password')}
                                        type="current-password"
                                        id="password"
                                        placeholder="*****"
                                        className="w-full border  bg-[#fff] px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-xs  text-red dark:text-green-400">
                                            <div className="flex gap-2">
                                                Password must be:
                                                <div>
                                                    <div>
                                                        - at least 8 characters
                                                    </div>
                                                    <div>
                                                        - contain at least one
                                                        capital letter
                                                    </div>
                                                </div>
                                            </div>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <DefaultButton
                                        onClick={() =>
                                            setIsSubmitting(!isSubmitting)
                                        }
                                        value="Next"
                                        type="submit"
                                        className="bg-red-600 w-full rounded-md px-8 py-3 font-semibold text-white"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm
