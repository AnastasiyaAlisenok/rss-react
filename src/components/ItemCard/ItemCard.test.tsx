import React from 'react';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ContentContext } from '../../hoc/ContentProvider';
import { mockContentContext } from '../../tests-helpers/mockContentContext';
import ItemCard from './ItemCard';
import MainPage from '../../page/MainPage/MainPage';

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

  beforeEach(() => {
    render(
      <BrowserRouter>
        <ContentContext.Provider value={mockContentContext}>
          <ItemCard
            id={cardInfo.id}
            title={cardInfo.title}
            description={cardInfo.description}
            price={cardInfo.price}
            rating={cardInfo.rating}
            brand={cardInfo.brand}
            src={cardInfo.images[0]}
          />
        </ContentContext.Provider>
      </BrowserRouter>
    );
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
      expect(window.location.pathname).toEqual('/frontpage=1&details=1');
    });
  });
});
