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
  price: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  user?: InputMaybe<UserType>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
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
  confirmOrder: ConfirmOrder;
  createOrder: OrderEntity;
  createProduct: Product;
  createSubscription: UserSubscription;
  createUser: User;
  paymentIntent: PaymentIntentResponse;
  remove: Product;
  updateProduct: Product;
  updateUser: UserInfoResponse;
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
  image: Scalars['String']['output'];
  orderItems?: Maybe<Array<CreateOrderEntity>>;
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getBanner: Scalars['String']['output'];
  getProduct: Product;
  getUser: User;
  getUsers: Array<User>;
  products: Array<Product>;
  videos: Movie;
};


export type QueryGetProductArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserInfoResponse = {
  __typename?: 'UserInfoResponse';
  status: Scalars['String']['output'];
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  email: Scalars['String']['output'];
  expiredAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  subscriptionId: Scalars['Int']['output'];
  surname: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type UserType = {
  email: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string } };

export type CreateSubscriptionMutationVariables = Exact<{
  subscription: CreateSubscriptionInput;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'UserSubscription', name: string, surname: string, subscriptionId: number, expiredAt: any } };

export type CreateOrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderEntity', userId: string, createdAt: any, status: string, token: string, items: Array<{ __typename?: 'OrderItem', productId: number, quantity: number }> } };

export type ConfirmOrderMutationVariables = Exact<{
  order: ConfirmOrderInput;
}>;


export type ConfirmOrderMutation = { __typename?: 'Mutation', confirmOrder: { __typename?: 'ConfirmOrder', message: string } };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, image: string, title: string, category: string }> };

export type CreatePaymentIntentMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
}>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', paymentIntent: { __typename?: 'PaymentIntentResponse', clientSecret: string } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CreateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscription"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subscription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscription"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}}]}}]}}]} as unknown as DocumentNode<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const ConfirmOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ConfirmOrderMutation, ConfirmOrderMutationVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const CreatePaymentIntentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentIntent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentIntent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>;