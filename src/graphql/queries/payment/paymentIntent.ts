import { gql } from '@apollo/client'

export const PaymentIntentDocument = gql`
    mutation CreatePaymentIntent($amount: Float!) {
        paymentIntent(amount: $amount) {
            clientSecret
        }
    }
`
