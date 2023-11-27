import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

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


jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({
      get: jest.fn((param) => {
        if (param === 'limit') {
          return '4';
        }
      }),
    })),
    useRouter: jest.fn(() => ({ query: {}, push: jest.fn() })),
    usePathname: jest.fn(() => '/'),
  }));
  
  jest.mock('next/router', () => require('next-router-mock'));

