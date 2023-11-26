import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithProviders from '../src/tests-helpers/test-helpers';
import ItemCard from '../src/components/ItemCard/ItemCard';

const cardInfo = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  discountPercentage: 1,
  price: 549,
  rating: 4.69,
  brand: 'Apple',
  category: '',
  stock: 1,
  thumbnail: '',
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg',
    'https://i.dummyjson.com/data/products/1/2.jpg',
    'https://i.dummyjson.com/data/products/1/3.jpg',
    'https://i.dummyjson.com/data/products/1/4.jpg',
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  ],
};

describe('ItemCard', () => {
  beforeEach(() => {
    mockRouter.push('/');
    renderWithProviders(<ItemCard product={cardInfo} />);
  });
  it('card component renders the relevant card data', () => {
    expect(screen.getByText(cardInfo.title)).toBeInTheDocument();
    expect(screen.getByText(`${cardInfo.price}$`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${cardInfo.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Brand: ${cardInfo.brand}`)).toBeInTheDocument();
    expect(screen.getByText(cardInfo.description)).toBeInTheDocument();
  });
  it('validate that clicking on a card opens a detailed card componen and check that clicking triggers an additional API call to fetch', async () => {
    const cards = screen.getAllByTestId('item');
    const user = userEvent.setup();
    user.click(cards[0]);
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/?frontpage=1&details=1&query=&limit=4',
        query: { frontpage: '1', details: '1', query: '', limit: '4' },
      });
    });
  });
});
