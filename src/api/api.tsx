import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductType, ResponseType } from '../types/types';

const API_URL = 'https://dummyjson.com/products';

interface IArgsProductsType {
  value: string;
  limit: number;
  page: number;
}

interface IArgsProductType {
  id: number;
  page: number;
}

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['ItemCard'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getPoducts: builder.query<ResponseType, IArgsProductsType>({
      query: (args: { value: string; limit: number; page: number }) =>
        `${args.value ? `/search?q=${args.value}&` : '?'}limit=${
          args.limit
        }&skip=${(args.page - 1) * args.limit}`,
    }),
    getProduct: builder.query<ProductType, IArgsProductType>({
      query: (args: { id: number; page: number }) =>
        `${args.id}?page=${args.page}`,
    }),
  }),
});

export const { useGetPoductsQuery, useGetProductQuery } = api;

export default api;
