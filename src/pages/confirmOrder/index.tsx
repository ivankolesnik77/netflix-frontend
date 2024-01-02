import React from "react";

import { fetcher } from "../../services/fetcher";
import gql from "graphql-tag";

type Repo = {
  confirmOrder: {
    message: string;
  };
};

const CONFIRM_ORDER_MUTATION = gql`
  mutation ConfirmOrder($order: ConfirmOrderInput!) {
    confirmOrder(order: $order) {
      message
    }
  }
`;

export const getServerSideProps = async (context: any) => {
  const token = context.query.token;
  const res: Repo = await fetcher(CONFIRM_ORDER_MUTATION, { order: { token } });

  return { props: { data: res.confirmOrder } };
};

export default function ConfirmOrder({ data }: any) {
  if (!data?.message) return null;

  return (
    <div className="mx-auto mt-5 flex h-[400px] w-[400px] items-center justify-center text-2xl text-white">
      <p>{data.message}</p>
    </div>
  );
}
