import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';
import mockRouter from 'next-router-mock';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MainPage from '../src/pages';
import { data } from '../src/tests-helpers/data';

describe('Test errors', () => {
  const mockStore = configureStore([]);
  const initialState = {
    page: { page: 1, lastPage: 10 },
    limit: 4,
    searchvalue: '',
  };
  const store = mockStore(initialState);
  it('click on error btn', async () => {
    mockRouter.push('/*');
    render(
      <Provider store={store}>
        <MainPage products={data} product={null} />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );

    expect(mockRouter).toMatchObject({
      asPath: '/*',
    });
  });
});
