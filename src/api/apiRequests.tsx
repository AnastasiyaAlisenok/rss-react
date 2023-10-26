import { ResponseType } from '../types/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default async function getItems(page: number): Promise<ResponseType> {
  const resp = await fetch(`${API_URL}/?page=${page}`, {
    method: 'GET',
  });
  return resp.json();
}
