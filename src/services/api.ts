import { gql } from "@apollo/client";
import axios, { AxiosInstance } from "axios";

// class PaymentsService {
//     instance: AxiosInstance | null = null;
//     constructor() {
//         this.instance = axios.create({
//             baseURL: 'https://some-domain.com/api/',
//             timeout: 1000,
//             headers: { 'X-Custom-Header': 'foobar' }
//         });
//     }

//     createPaymentIntent() {
//         this.instance?.get(PaymentIntentDocument, { params: { amount: 500 } });
//     }
// }

// export const api = new PaymentsService();

export const BannerDocument = `
  type Query {
    users {
      id, 
      name,
      age
    },
  }
`;

export const PaymentIntentDocument = gql`
  mutation CreatePaymentIntent($amount: Float!) {
    paymentIntent(amount: $amount) {
      clientSecret
    }
  }
`;

export const BASE_URL = "https://localhost:3001/graphql";
