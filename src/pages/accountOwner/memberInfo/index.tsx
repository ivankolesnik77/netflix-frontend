import DefaultButton from '@/components/layout/buttons/DefaultButton'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'

import { useAppSelector } from '@/utils/hooks'
import { gql } from '@/__generated__/gql'
import { useRouter } from 'next/router'

const schema = yup
    .object({
        name: yup.string().required(),
        fromName: yup.string().required(),
        email: yup.string().email().required(),
    })
    .required()

interface IFormInput {
    email: string
    name: string
    fromName: string
}

const AddNewMember = gql(`
  mutation addNewMember($member: INewMemberInput!) {
    addNewMember(member: $member) {
      status
    }
  }
`)

const MemberPayment = () => {
    const currentUserEmail = useAppSelector((state) => state.user.email)

    const { register, setError, handleSubmit, formState, getValues } =
        useForm<IFormInput>({
            resolver: yupResolver(schema),
        })

    const router = useRouter()

    const [mutate, { data }] = useMutation(AddNewMember, {
        onCompleted(data) {
            router.push({
                pathname: '/accountOwner/successInvitation',
                query: {
                    name: values.name,
                    email: values.email,
                    from: values.fromName,
                },
            })
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (!formState.isValid) {
            const { fromName, ...values } = getValues()
            mutate({
                variables: {
                    member: { ...values, invitedUserEmail: currentUserEmail },
                },
            })
        }
    }
    const values = getValues()

    return (
        <div className="bg-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto flex max-w-[500px] flex-col gap-2 pb-8 pt-5 text-gray-500"
            >
                <div className="container mx-auto max-w-[1024px] ">
                    <h1 className="mb-3 mt-5   text-4xl text-black">
                        <b> Who will your extra member be?</b>
                    </h1>
                    <p className=" mb-3 text-xl text-black">
                        We will email them an invitation with detailed setup
                        instructions.
                    </p>
                </div>
                <b className="text-sm font-bold text-black">To:</b>

                <div className="relative">
                    <input
                        id="name"
                        type="text"
                        className="peer block w-full appearance-none rounded-sm border border-gray-400  bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:focus:border-green-500"
                        aria-describedby="name"
                        {...register('name', {
                            required: true,
                            minLength: 3,
                            maxLength: 15,
                        })}
                        placeholder=" "
                    />
                    <label
                        htmlFor="name"
                        className="text-md absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                    >
                        Their name
                    </label>
                </div>

                <div className="relative">
                    <input
                        id="email"
                        type="email"
                        className="peer block w-full appearance-none rounded-sm border border-gray-400 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:focus:border-green-500"
                        aria-describedby="email"
                        {...register('email', {
                            required: true,
                        })}
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className="text-md absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                    >
                        Their email address
                    </label>
                </div>

                <b className=" my-3 text-sm font-bold text-black">From:</b>
                <div className="relative">
                    <input
                        id="fromName"
                        type="text"
                        className="peer block w-full appearance-none rounded-sm border border-gray-400  bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:focus:border-green-500"
                        aria-describedby="fromName"
                        {...register('fromName')}
                        placeholder=" "
                    />
                    <label
                        htmlFor="fromName"
                        className="text-md absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                    >
                        Your name
                    </label>
                </div>

                <DefaultButton
                    type="submit"
                    value="Next"
                    className="w-full rounded"
                />
            </form>
        </div>
    )
}

export default MemberPayment
