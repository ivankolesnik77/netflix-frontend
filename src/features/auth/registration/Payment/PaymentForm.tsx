import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { gql, useMutation } from '@apollo/client'

import io, { Socket } from 'socket.io-client'

import { useAppSelector } from '@/utils/hooks'
import { RootState } from '@/store'
import { cardPaymentOptions, subscriptionRates } from '@/utils/constants'
import { setAuth } from '@/store/reducers/auth.slice'
import { IPaySubscription } from './types'
import DefaultButton from '@/components/layout/buttons/DefaultButton'

export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($subscription: CreateSubscriptionInput!) {
        createSubscription(subscription: $subscription) {
            accessToken
        }
    }
`

let socket: Socket

export default function PaymentForm({ clientSecret }: any) {
    const cart = useAppSelector((state) => state.cart)
    const currentUser = useAppSelector((state: RootState) => state.user)
    const auth = useAppSelector((state: RootState) => state.auth)
    const stripe = useStripe()
    const dispatch = useDispatch()
    const elements = useElements()
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [createSubscription] = useMutation<{
        createSubscription: {
            accessToken: string
        }
    }>(CreateSubscriptionDocument, {
        onError: (err: any) => {
            console.log(err)
        },
    })

    useEffect(() => {
        const runSocket = async () => {
            await socketInitializer()
        }
        runSocket()

        return () => {
            socket?.disconnect()
        }
    }, [])

    async function socketInitializer() {
        const socket = io('http://localhost:8080')

        await fetch('/api/socket')

        socket.on('connect', () => {
            console.log('Connected to the server')
        })
    }

    const confirmStripePayment = async (data: {
        createSubscription: { accessToken: string }
    }) => {
        if (!elements || !stripe) return

        const cardElement = elements.getElement(CardElement)
        if (data && cardElement) {
            const confirmPayment = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: name,
                            email: 'stonebo0sh@gmail.com',
                        },
                    },
                }
            )
            if (confirmPayment?.error) {
                console.log(confirmPayment.error.message)
            } else {
                dispatch(setAuth(true))
                localStorage.setItem(
                    'accessToken',
                    data.createSubscription.accessToken
                )
            }
        }
    }

    const paySubscription = async ({
        currentUser,
        paymentMethodId,
    }: IPaySubscription) => {
        if (!stripe || !elements || !currentUser.subscriptionType) return

        const { email, subscriptionType } = currentUser
        const subscriptionPrice = subscriptionRates[subscriptionType]

        const { data } = await createSubscription({
            variables: {
                subscription: {
                    user: { email, name, surname, password: auth.password },
                    type: subscriptionType,
                    price: subscriptionPrice,
                    paymentMethod: paymentMethodId,
                },
            },
        })

        data && confirmStripePayment(data)
    }

    const handleSubmit = async (e?: any) => {
        e?.preventDefault()

        const { subscriptionType } = currentUser
        if (!stripe || !elements || !subscriptionType) {
            return
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements?.getElement('card')!,
            billing_details: {
                name: name,
                email: 'stonebo0sh@gmail.com',
            },
        })

        if (result.error) {
            console.log(result.error)
            return
        }

        paySubscription({
            currentUser,
            paymentMethodId: result.paymentMethod.id,
        })
    }

    if (!cart.clientSecret || !stripe) return null

    const customfields = [
        { title: 'Имя', value: name, setValue: setName },
        { title: 'Фамилия', value: surname, setValue: setSurname },
    ]

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement
                options={cardPaymentOptions}
                className="w-full rounded border border-gray-300 p-2"
            />

            {customfields.map((field, key) => (
                <div key={`custom-form-field-${key}`} className="relative my-3">
                    <input
                        type="text"
                        id="hs-floating-input-email"
                        value={field.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        className="peer block w-full rounded-lg border border-solid border-gray-200  p-4 text-sm outline-none placeholder:text-transparent autofill:pb-2 autofill:pt-6 focus:border-blue-400 focus:pb-2 focus:pt-6 focus:shadow-field focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-50 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6"
                        placeholder="email@gmail.com"
                    />
                    <label
                        htmlFor="hs-floating-input-email"
                        className=" peer-focus:text-gray-500peer-disabled:pointer-events-none pointer-events-none absolute start-0 top-0 h-full truncate border border-transparent p-4 text-sm text-gray-500 transition duration-100 ease-in-out peer-focus:-translate-y-1.5 peer-focus:text-xs peer-disabled:opacity-50 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs  peer-[:not(:placeholder-shown)]:text-gray-200"
                    >
                        {field.title}
                    </label>
                </div>
            ))}

            <DefaultButton
                type="submit"
                value="Pay now"
                className=" my-5 w-full rounded-md px-8 py-3 font-semibold"
                // disabled={!stripe || !elements}
            />
        </form>
    )
}
