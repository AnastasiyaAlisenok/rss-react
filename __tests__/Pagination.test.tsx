import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor, render } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Pagination from '../src/components/Pagination/Pagination';

describe('Pagination', () => {
  const mockStore = configureStore([]);
  const initialState = {
    page: { page: 1, lastPage: 10 },
    limit: 4,
    searchvalue: '',
  };
  const store = mockStore(initialState);
  it('the component updates URL query parameter when page changes', async () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    const btnNext = await screen.findByTestId('btn-next');
    const user = userEvent.setup();
    user.click(btnNext);
    await waitFor(() => {
      expect(mockRouter.query).toMatchObject({
        page: '2',
      });
    });
  });
});
