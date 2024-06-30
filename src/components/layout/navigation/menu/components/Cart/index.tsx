import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../../store'
import {
    increaseCount,
    initializeProducts,
} from '../../../../../../store/reducers/redux.slice'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
export const mutation = gql`
    mutation CreateOrder($order: OrderInput!) {
        createOrder(order: $order) {
            userId
            createdAt
            status
            token
            items {
                productId
                quantity
            }
        }
    }
`

enum OrderStatus {
    Pending = 'PENDING',
    Payed = 'PAYED',
}
const href = '/payments'

export const Cart = () => {
    const router = useRouter()
    const currentUser = useSelector((state: RootState) => state.user)
    const products = useSelector((state: RootState) => state.cart.products)
    const dispatch = useDispatch()
    const increase = (id: number) => {
        dispatch(increaseCount(id))
    }

    const [mutate] = useMutation(mutation, {
        onCompleted(data) {
            console.log(data)
            const order = data?.createOrder

            if (order.token) {
                // dispatch(setOrderToken(order.token));
                console.log('Created order: ', data)
                router.push(href)
            }
        },
    })

    const createOrder = async () => {
        const orderInput = {
            userId: 1,
            createdAt: new Date().toISOString(),
            status: OrderStatus.Pending,
            items: products.map((product) => ({
                productId: product.id,
                quantity: product.quantity,
            })),
        }

        mutate({ variables: { order: orderInput } })

        // try {
        //   const data = await fetcher(mutation, { order: orderInput });
        //   const order = data?.createOrder;

        //   if (order.token) {
        //     // dispatch(setOrderToken(order.token));
        //     console.log("Created order: ", data);

        //     router.push(href);
        //   }
        // } catch (err) {
        //   console.log(err);
        // }
    }

    return (
        <div className="transition-max-height animate-fadeSize absolute right-[50px] top-[60px] min-h-[120px] w-[200px] overflow-hidden rounded-sm bg-white p-3 shadow duration-500 ease-in-out">
            {products.map((item) => (
                <div
                    key={`product-item-${item.id}`}
                    className="flex max-w-[200px] flex-col text-black"
                >
                    <h3 className="mb-1 font-semibold">{item.title}</h3>
                    <div className="flex flex-row items-center justify-between  gap-2">
                        <p>{item.category}</p>
                        <div
                            className="border-1 border fill-green-400 px-2 pb-1 text-3xl font-bold"
                            onClick={() => increase(item.id)}
                        >
                            + <span>{item.quantity}</span>
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={createOrder}
                className="mt-2 w-full rounded-md bg-slate-400 p-2 text-black hover:bg-slate-600 hover:text-white"
            >
                Go to cart
            </button>
        </div>
    )
}
