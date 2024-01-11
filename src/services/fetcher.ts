import { ASTNode, print } from "graphql";

const graphqlEndpoint = "http://localhost:3001/graphql";

export const fetcher = async (
  query: ASTNode,
  variables?: Record<string, any>,
) => {
  try {
    const res = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
    });

    const data = await res.json();

    if (data.errors) {
      console.log(data.errors[0].message);
    }
    return data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};
