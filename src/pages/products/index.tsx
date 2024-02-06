import React from "react";
import { fetcher } from "../../services/fetcher";
import { PaymentIntentDocument } from "../../services/api";
import gql from "graphql-tag";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, toggle } from "../../store/redux.store";
import { RootState } from "../../store";

export const ProductsDocument = gql`
  query Products {
    products {
      id
      image
      title
      category
    }
  }
`;

export const getServerSideProps = async () => {
  const data = await fetcher(ProductsDocument, { amount: 500 });

  return { props: { data: data || { products: [] } } };
};

const Products = ({ data }: { data: { products: any[] } }) => {
  const { products } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const onClick = (product: IProduct) => {
    dispatch(toggle(product));
  };

  return (
    <div className="mt-5 flex justify-center">
      <div className="grid w-full max-w-[800px] grid-cols-3 gap-2 gap-y-4 text-white">
        {data.products.map((item) => (
          <div
            key={`product-item-${item.id}`}
            className="flex max-w-[150px] flex-col p-4 pt-2"
          >
            <Image src={item?.image || ""} alt="" height={150} width={150} />
            <h3 className="my-1 h-10 font-semibold">{item.title}</h3>
            <div className="mt-2 flex flex-row items-center  justify-between gap-2 ">
              <p>{item.category}</p>
              <div
                className="border-1 cursor-pointer border fill-green-400 px-2 pb-1 text-3xl font-bold"
                onClick={() => onClick(item)}
              >
                +
              </div>
            </div>
            {/* <FontAwesomeIcon icon="plus" /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
