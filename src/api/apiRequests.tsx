const API_URL = 'https://rickandmortyapi.com/api/character';

export default async function getItems<T>(): Promise<T> {
  const resp = await fetch(API_URL, {
    method: 'GET',
  });
  return resp.json();
}
