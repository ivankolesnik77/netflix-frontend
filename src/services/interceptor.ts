import {
  ApolloLink,
  FetchResult,
  GraphQLRequest,
  createHttpLink,
  gql,
} from "@apollo/client";
import Cookies from "js-cookie";
import { tokenService } from "./tokenService";
import { Observable, print } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GraphQLError } from "graphql";
import { apolloClient } from "./apolloClient";
import { parse } from "url";

export const REFRESH_TOKEN = gql`
  mutation refreshTokens {
    refreshTokens
  }
`;

const httpLink = createHttpLink({
  uri: "http://localhost:3002/graphql",
  credentials: "include",
});

const authLink = setContext((operation, { headers }) => {
  let token = localStorage.getItem("accessToken") || "";

  return {
    headers: {
      ...headers,
      authorization: !!token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            // ignore 401 error for a refresh request
            if (operation.operationName === "refreshTokens") return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();

                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              },
            );

            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);

const protectedRoutes = ["/"];

const requestLink = new ApolloLink((operation, forward) => {
  const href = window.location.href.split("localhost:3000").at(-1);
  const isProtectedRoute = protectedRoutes.includes(href!);
  const tokenNeedsRefresh = !localStorage.getItem("accessToken");
  const isNotRefreshOperation = operation.operationName !== "refreshTokens";

  if (isProtectedRoute && tokenNeedsRefresh && isNotRefreshOperation) {
    return new ApolloLink((operation) => {
      return new Observable((observer) => {
        refreshToken().then(() => {
          // Retry the original request after refreshing the token
          const subscriber = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });

          return () => {
            if (subscriber) subscriber.unsubscribe();
          };
        });
      });
    }).request(operation);
  }

  return forward(operation);
});

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await apolloClient.mutate<{
      refreshTokens: string;
    }>({
      mutation: REFRESH_TOKEN,
    });

    const accessToken = refreshResolverResponse.data?.refreshTokens;

    !!accessToken && localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export { httpLink, errorLink, authLink, requestLink };
