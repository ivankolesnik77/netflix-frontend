/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  error?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type AuthUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CheckUserEmailResponse = {
  __typename?: 'CheckUserEmailResponse';
  isExistingUser: Scalars['Boolean']['output'];
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type ConfirmOrder = {
  __typename?: 'ConfirmOrder';
  message: Scalars['String']['output'];
};

export type ConfirmOrderInput = {
  token: Scalars['String']['input'];
};

export type CreateOrderEntity = {
  __typename?: 'CreateOrderEntity';
  createdAt: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  items: Array<OrderItem>;
  status: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CreateProductInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateSubscriptionInput = {
  inviteCode?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  user?: InputMaybe<UserType>;
};

export type CreateSubscriptionResult = {
  __typename?: 'CreateSubscriptionResult';
  accessToken: Scalars['String']['output'];
  clientSecret: Scalars['String']['output'];
};

export type CreateUserInput = {
  customerId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  surname: Scalars['String']['input'];
};

export type INewMemberInput = {
  email: Scalars['String']['input'];
  invitedUserEmail: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Movie = {
  __typename?: 'Movie';
  createdAt: Scalars['DateTime']['output'];
  file: Scalars['String']['output'];
  genre: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  releaseYear: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewMember: CommonResponse;
  authUser?: Maybe<AuthResponse>;
  confirmOrder: ConfirmOrder;
  createOrder: OrderEntity;
  createProduct: Product;
  createSubscription: CreateSubscriptionResult;
  createUser: Scalars['String']['output'];
  generateInviteLink: Scalars['String']['output'];
  getInviteLink: Scalars['String']['output'];
  paymentIntent: PaymentIntentResponse;
  refreshTokens?: Maybe<Scalars['String']['output']>;
  remove: Product;
  updateProduct: Product;
  updateUser: UserInfoResponse;
};


export type MutationAddNewMemberArgs = {
  member: INewMemberInput;
};


export type MutationAuthUserArgs = {
  user: AuthUserInput;
};


export type MutationConfirmOrderArgs = {
  order: ConfirmOrderInput;
};


export type MutationCreateOrderArgs = {
  order: OrderInput;
};


export type MutationCreateProductArgs = {
  product: CreateProductInput;
};


export type MutationCreateSubscriptionArgs = {
  subscription: CreateSubscriptionInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationGetInviteLinkArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationPaymentIntentArgs = {
  amount: Scalars['Float']['input'];
};


export type MutationRemoveArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  user: CreateUserInput;
};

export type OrderEntity = {
  __typename?: 'OrderEntity';
  createdAt: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  items: Array<OrderItem>;
  productId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderInput = {
  createdAt: Scalars['String']['input'];
  items: Array<OrderItemInput>;
  status: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int']['output'];
  orderId?: Maybe<Scalars['String']['output']>;
  productId: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  orderId?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
};

export type PaymentIntentResponse = {
  __typename?: 'PaymentIntentResponse';
  clientSecret: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  orderItems?: Maybe<Array<CreateOrderEntity>>;
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  authMe?: Maybe<User>;
  checkUserWithEmail: CheckUserEmailResponse;
  getProduct: Product;
  getUser: User;
  getUsers: Array<User>;
  products: Array<Product>;
  videos: Movie;
};


export type QueryCheckUserWithEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  customerId: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  stripeSubscriptionId: Scalars['String']['output'];
  subscriptionId: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserInfoResponse = {
  __typename?: 'UserInfoResponse';
  status: Scalars['String']['output'];
};

export type UserType = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  surname?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type AuthMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthMeQuery = { __typename?: 'Query', authMe?: { __typename?: 'User', email?: string | null, userName?: string | null } | null };

export type CreateOrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderEntity', userId: string, createdAt: any, status: string, token: string, items: Array<{ __typename?: 'OrderItem', productId: number, quantity: number }> } };

export type AuthUserMutationVariables = Exact<{
  user: AuthUserInput;
}>;


export type AuthUserMutation = { __typename?: 'Mutation', authUser?: { __typename?: 'AuthResponse', error?: string | null, user?: { __typename?: 'User', id: number, email?: string | null, userName?: string | null, accessToken?: string | null } | null } | null };

export type VerifyTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifyTokenQuery = { __typename?: 'Query', authMe?: { __typename?: 'User', email?: string | null, userName?: string | null } | null };

export type CreateSubscriptionMutationVariables = Exact<{
  subscription: CreateSubscriptionInput;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'CreateSubscriptionResult', accessToken: string } };

export type CheckUserWithEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckUserWithEmailQuery = { __typename?: 'Query', checkUserWithEmail: { __typename?: 'CheckUserEmailResponse', isExistingUser: boolean } };

export type AddNewMemberMutationVariables = Exact<{
  member: INewMemberInput;
}>;


export type AddNewMemberMutation = { __typename?: 'Mutation', addNewMember: { __typename?: 'CommonResponse', status: string } };

export type ConfirmOrderMutationVariables = Exact<{
  order: ConfirmOrderInput;
}>;


export type ConfirmOrderMutation = { __typename?: 'Mutation', confirmOrder: { __typename?: 'ConfirmOrder', message: string } };

export type CreatePaymentIntentMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
}>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', paymentIntent: { __typename?: 'PaymentIntentResponse', clientSecret: string } };

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens?: string | null };


export const AuthMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]} as unknown as DocumentNode<AuthMeQuery, AuthMeQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const AuthUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<AuthUserMutation, AuthUserMutationVariables>;
export const VerifyTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]} as unknown as DocumentNode<VerifyTokenQuery, VerifyTokenQueryVariables>;
export const CreateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscription"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscription"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const CheckUserWithEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUserWithEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUserWithEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isExistingUser"}}]}}]}}]} as unknown as DocumentNode<CheckUserWithEmailQuery, CheckUserWithEmailQueryVariables>;
export const AddNewMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addNewMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"INewMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNewMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"member"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AddNewMemberMutation, AddNewMemberMutationVariables>;
export const ConfirmOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ConfirmOrderMutation, ConfirmOrderMutationVariables>;
export const CreatePaymentIntentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentIntent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentIntent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;