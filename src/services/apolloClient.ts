import { useRef } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { errorLink, authLink, httpLink, requestLink } from "./interceptor";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([requestLink, errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
