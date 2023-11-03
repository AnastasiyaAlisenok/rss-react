import { ResponseType } from '../types/types';

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
