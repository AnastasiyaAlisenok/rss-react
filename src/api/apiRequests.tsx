import { ProductType, ResponseType } from '../types/types';

const API_URL = 'https://dummyjson.com/products';

export default async function filterNames(
  value: string,
  page: number,
  limit: number
): Promise<ResponseType> {
  return (
    await fetch(
      `${API_URL}${value ? `/search?q=${value}&` : '?'}limit=${limit}&skip=${
        (page - 1) * limit
      }`
    )
  ).json();
}

export const getDetailInfo = async (
  id: number,
  page: number
): Promise<ProductType> => {
  return (await fetch(`${API_URL}/${id}?page=${page}`)).json();
};
