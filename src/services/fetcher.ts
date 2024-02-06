import { TypedDocumentNode, gql } from "@apollo/client";
import { ASTNode, print } from "graphql";
import { apolloClient } from "../pages";

const graphqlEndpoint = "http://localhost:3001/graphql";

export const fetcher = async (
  query: TypedDocumentNode,
  variables?: Record<string, any>,
) => {
  try {
    const response: any = apolloClient.query({
      query: query,
      variables,
    });
    console.log(response);
    if (response.errors) {
      console.log(response.errors[0].message);
    }
    return response;
  } catch (err) {
    console.log(err);
    return {};
  }
};
