
import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:3001/graphql/",
  }),
  endpoints: (build) => ({
    Banner: build.query({
      query: () => ({ document: BannerDocument }),
    }),
    createPaymentIntent: build.mutation<string, number>({
      query: (amount) => ({
        url: "http://localhost:3001/graphql",
        method: "POST",
        body: { query: PaymentIntentDocument, var: { amount } },
      }),
    }),
  }),
});

export const BannerDocument = `
  type Query {
    users {
      id, 
      name,
      age
    },
  }
`;

export const PaymentIntentDocument = `
  mutation CreatePaymentIntent($amount: Float!) {
  createPaymentIntent(amount: $amount) {
    status
  }
}
`;

export const useBannerQuery = api.endpoints.Banner.useQuery;
export const useCreatePaymentIntentMutation = api.endpoints.createPaymentIntent.useMutation;
