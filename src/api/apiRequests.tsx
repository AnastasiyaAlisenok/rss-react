import { ResponseType } from '../types/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default async function filterNames(
  value: string
): Promise<ResponseType> {
  return (await fetch(`${API_URL}/${value ? `?name=${value}` : ''}`)).json();
}
