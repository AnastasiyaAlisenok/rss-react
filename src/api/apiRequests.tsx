import { ResponseType } from '../types/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default async function getItems(): Promise<ResponseType> {
  const resp = await fetch(API_URL, {
    method: 'GET',
  });
  return resp.json();
}
