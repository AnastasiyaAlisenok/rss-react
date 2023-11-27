import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DetailBlock from '../src/components/DetailBlock/DetailBlock';
import server from '../__mocks__/server';
import handlers from '../__mocks__/handler';

const product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 15.46,
  rating: 4.69,
  stock: 36,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg',
    'https://i.dummyjson.com/data/products/1/2.jpg',
    'https://i.dummyjson.com/data/products/1/3.jpg',
    'https://i.dummyjson.com/data/products/1/4.jpg',
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  ],
};

describe('DetailBlock', () => {
  const mockStore = configureStore([]);
  const initialState = {
    page: { page: 1, lastPage: 10 },
    limit: 4,
    searchvalue: '',
  };
  const store = mockStore(initialState);
  beforeEach(() => {
    server.use(handlers[2]);
    mockRouter.push('?frontpage=1&details=1');
    render(
      <Provider store={store}>
        <DetailBlock product={product} />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );
  });
  test('detailed card component correctly displays the detailed card data', async () => {
    const detail = await screen.findByTestId('detail');
    expect(detail).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`Price: ${product.price}$`)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${product.rating}`)).toBeInTheDocument();
      expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();
    });
  });
  test('clicking the close button hides the component', async () => {
    const btnClose = await screen.findByTestId('btn-close');
    const user = userEvent.setup();
    user.click(btnClose);
    mockRouter.push('/');
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/',
      });
    });
  });
});
