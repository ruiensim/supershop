import { ORDERS_URL, PAYPAL_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            }),
        }),
        getOrderDetials: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder : builder.mutation({
            query: ({orderId, detials}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...detials },
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetialsQuery,usePayOrderMutation,useGetPayPalClientIdQuery,useGetMyOrdersQuery} = ordersApiSlice;