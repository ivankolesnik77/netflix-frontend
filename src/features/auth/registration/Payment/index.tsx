import React, { FC, useEffect } from 'react'
import { RegistrationStage } from '..'

import { useMutation } from '@apollo/client'

import { setPaymentCredentials } from '@/store/reducers/redux.slice'
import { useDispatch } from 'react-redux'
import { gql } from '@apollo/client'

import PaymentFormWrapper from './PaymentFormWrapper'
import Image from 'next/image'
import { PaymentIntentDocument } from '@/graphql/queries/payment/paymentIntent'
const subscriptionPrice = 300

const Payment: FC<{
    stage: RegistrationStage
    handleSubmit: () => void
}> = ({ stage, handleSubmit }) => {
    const dispatch = useDispatch()
    const [createPaymentIntent, { data }] = useMutation(PaymentIntentDocument, {
        variables: { amount: subscriptionPrice },
    })

    useEffect(() => {
        const getRequestPaymentIntent = async () => {
            try {
                const paymentIntent: any = await createPaymentIntent()

                const clientSecret =
                    paymentIntent.data.createPaymentIntent.clientSecret
                dispatch(setPaymentCredentials({ clientSecret }))
            } catch (err) {
                console.log(err)
            }
        }

        getRequestPaymentIntent()
    }, [])

    return (
        <div className=" mx-auto w-[400px]  max-w-sm">
            <div className="mt-[20px]" data-uia="header">
                <div className="stepHeader" role="status">
                    <span id="" className="text-xs" data-uia="">
                        Step 3 of 3
                    </span>
                    <h1 className="text-3xl" data-uia="stepTitle">
                        We accept Visa, Mastercard and American Express.
                    </h1>
                </div>
            </div>
            <div>
                <span
                    className="my-3 flex gap-2"
                    aria-label="We accept Visa, Mastercard and American Express."
                >
                    <Image
                        src={
                            'https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png'
                        }
                        alt="Visa"
                        width={40}
                        height={30}
                        className="h-min"
                    />
                    <Image
                        src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png"
                        alt="Mastercard"
                        width={40}
                        height={30}
                        className="h-min"
                    />
                    <Image
                        src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png"
                        alt="American Express"
                        width={40}
                        height={30}
                        className="h-min"
                    />
                </span>
            </div>
            <PaymentFormWrapper />
            <small>
                <span className="mt-3 text-gray-500">
                    By checking the box below, you agree to the Rules use and
                    Privacy Statement, as well as confirm that you are over 18
                    years of age/year. Netflix will automatically renew your
                    subscription and charge you for her (currently 9.99
                    €/month), using the indicated your payment method until you
                    cancel your subscription. Cancel You can subscribe at any
                    time and there are no further fees will.
                </span>
            </small>
        </div>
    )
}

export default Payment
