import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
  })

import { Blob, File } from 'node:buffer';
import { fetch, Headers, FormData, Request, Response } from 'undici';
 
Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
})

import server from './__mocks__/server';
import api from './src/api/api';
import { setupStore } from './src/redux/store';

const store = setupStore({});

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    store.dispatch(api.util.resetApiState());
});

afterAll(() => server.close());


