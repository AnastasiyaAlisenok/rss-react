import { ResponseType } from '../types/types';

const API_URL = 'https://dummyjson.com/products';

export default async function filterNames(
  value: string,
  page: number
): Promise<ResponseType> {
  return (
    await fetch(
      `${API_URL}${value ? `/search?q=${value}&` : '?'}limit=8&skip=${
        (page - 1) * 8
      }`
    )
  ).json();
}
