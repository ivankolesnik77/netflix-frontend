/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query AuthMe {\n    authMe {\n      email\n      userName\n    }\n  }\n": types.AuthMeDocument,
    "\n  mutation CreateOrder($order: OrderInput!) {\n    createOrder(order: $order) {\n      userId\n      createdAt\n      status\n      token\n      items {\n        productId\n        quantity\n      }\n    }\n  }\n": types.CreateOrderDocument,
    "\n  mutation AuthUser($user: AuthUserInput!) {\n    authUser(user: $user) {\n      user {\n        id\n        email\n        userName\n        accessToken\n      }\n      error\n    }\n  }\n": types.AuthUserDocument,
    "\n  query VerifyToken {\n    authMe {\n      email\n      userName\n    }\n  }\n": types.VerifyTokenDocument,
    "\n  mutation CreateSubscription($subscription: CreateSubscriptionInput!) {\n    createSubscription(subscription: $subscription) {\n      accessToken\n    }\n  }\n": types.CreateSubscriptionDocument,
    "\n  query CheckUserWithEmail ($email: String!) {\n      checkUserWithEmail (email: $email) {\n        isExistingUser\n      }\n    }\n": types.CheckUserWithEmailDocument,
    "\n  mutation addNewMember($member: INewMemberInput!) {\n    addNewMember(member: $member) {\n      status\n    }\n  }\n": types.AddNewMemberDocument,
    "\n  mutation ConfirmOrder($order: ConfirmOrderInput!) {\n    confirmOrder(order: $order) {\n      message\n    }\n  }\n": types.ConfirmOrderDocument,
    "\n  mutation CreatePaymentIntent($amount: Float!) {\n    paymentIntent(amount: $amount) {\n      clientSecret\n    }\n  }\n": types.CreatePaymentIntentDocument,
    "\n  mutation refreshTokens {\n    refreshTokens\n  }\n": types.RefreshTokensDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AuthMe {\n    authMe {\n      email\n      userName\n    }\n  }\n"): (typeof documents)["\n  query AuthMe {\n    authMe {\n      email\n      userName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateOrder($order: OrderInput!) {\n    createOrder(order: $order) {\n      userId\n      createdAt\n      status\n      token\n      items {\n        productId\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($order: OrderInput!) {\n    createOrder(order: $order) {\n      userId\n      createdAt\n      status\n      token\n      items {\n        productId\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthUser($user: AuthUserInput!) {\n    authUser(user: $user) {\n      user {\n        id\n        email\n        userName\n        accessToken\n      }\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation AuthUser($user: AuthUserInput!) {\n    authUser(user: $user) {\n      user {\n        id\n        email\n        userName\n        accessToken\n      }\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query VerifyToken {\n    authMe {\n      email\n      userName\n    }\n  }\n"): (typeof documents)["\n  query VerifyToken {\n    authMe {\n      email\n      userName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSubscription($subscription: CreateSubscriptionInput!) {\n    createSubscription(subscription: $subscription) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscription($subscription: CreateSubscriptionInput!) {\n    createSubscription(subscription: $subscription) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CheckUserWithEmail ($email: String!) {\n      checkUserWithEmail (email: $email) {\n        isExistingUser\n      }\n    }\n"): (typeof documents)["\n  query CheckUserWithEmail ($email: String!) {\n      checkUserWithEmail (email: $email) {\n        isExistingUser\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addNewMember($member: INewMemberInput!) {\n    addNewMember(member: $member) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation addNewMember($member: INewMemberInput!) {\n    addNewMember(member: $member) {\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ConfirmOrder($order: ConfirmOrderInput!) {\n    confirmOrder(order: $order) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmOrder($order: ConfirmOrderInput!) {\n    confirmOrder(order: $order) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePaymentIntent($amount: Float!) {\n    paymentIntent(amount: $amount) {\n      clientSecret\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePaymentIntent($amount: Float!) {\n    paymentIntent(amount: $amount) {\n      clientSecret\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation refreshTokens {\n    refreshTokens\n  }\n"): (typeof documents)["\n  mutation refreshTokens {\n    refreshTokens\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;