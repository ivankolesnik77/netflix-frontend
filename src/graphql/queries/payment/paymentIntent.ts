import { gql } from '@apollo/client'

export const PaymentIntentDocument = gql`
    mutation CreatePaymentIntent($amount: Float!) {
        createPaymentIntent(amount: $amount) {
            clientSecret
        }
    }
`
