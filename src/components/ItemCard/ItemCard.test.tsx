import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ContentContext } from '../../hoc/ContentProvider';
import mockContentContext from '../ItemsList/ItemList.test';
import ItemCard from './ItemCard';

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

const cardInfo = {
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
};

describe('ItemCard', () => {
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
    const card = await screen.findByTestId('item');
    const user = userEvent.setup();
    await user.click(card);
    waitFor(() => {
      const detailBlock = screen.getByTestId('detail');
      expect(detailBlock).toBeInTheDocument();
      expect(fetch).toHaveBeenCalled();
    });
  });
});
