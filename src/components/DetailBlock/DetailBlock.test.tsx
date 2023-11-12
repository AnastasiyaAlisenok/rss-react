import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DetailBlock from './DetailBlock';
import { ContentContext } from '../../hoc/ContentProvider';
import {
  mockContentContext,
  loaderMockContentContext,
} from '../../tests-helpers/mockContentContext';

jest.mock('../../api/apiRequests.tsx', () => ({
  getDetailInfo: jest.fn().mockResolvedValue({
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    rating: 4.69,
    brand: 'Apple',
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  }),
}));

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
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ContentContext.Provider value={mockContentContext}>
          <DetailBlock />
        </ContentContext.Provider>
      </BrowserRouter>
    );
  });

  it('check that a loading indicator is displayed while fetching data', async () => {
    render(
      <BrowserRouter>
        <ContentContext.Provider value={loaderMockContentContext}>
          <DetailBlock />
        </ContentContext.Provider>
      </BrowserRouter>
    );
    const loader = screen.getByAltText('loader');
    expect(loader).toBeInTheDocument();
  });
  it('detailed card component correctly displays the detailed card data', async () => {
    mockContentContext.product = product;
    waitFor(async () => {
      const detail = await screen.findByTestId('detail');
      expect(detail).toBeInTheDocument();
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`${product.price}$`)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${product.rating}`)).toBeInTheDocument();
      expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();
    });
  });
  it('clicking the close button hides the component', async () => {
    const btnClose = await screen.findByTestId('btn-close');
    const user = userEvent.setup();
    user.click(btnClose);

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
    });
  });
});
