import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContentContext } from '../../hoc/ContentProvider';
import ItemsList from './ItemsList';

const mockContentContext = {
  products: [
    {
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
    },
    {
      id: 2,
      title: 'iPhone X',
      description:
        'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
      price: 899,
      discountPercentage: 15.46,
      rating: 4.69,
      stock: 36,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/2/1.jpg',
        'https://i.dummyjson.com/data/products/2/2.jpg',
        'https://i.dummyjson.com/data/products/2/3.jpg',
        'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
      ],
    },
    {
      id: 3,
      title: 'Samsung Universe 9',
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.69,
      stock: 36,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
      images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
    },
  ],
  setNewProducts: (): void => {},
  page: 1,
  setNewPage: (): void => {},
  limit: 4,
  setNewLimit: (): void => {},
  lastPage: 10,
  setNewLastPage: (): void => {},
  loading: false,
  setLoading: (): void => {},
  product: undefined,
  setNewProduct: (): void => {},
  searchValue: localStorage.getItem('search-value') || '',
  setNewSearchValue: (): void => {},
};

const nullMockContentContext = {
  products: [],
  setNewProducts: (): void => {},
  page: 1,
  setNewPage: (): void => {},
  limit: 4,
  setNewLimit: (): void => {},
  lastPage: 10,
  setNewLastPage: (): void => {},
  loading: false,
  setLoading: (): void => {},
  product: undefined,
  setNewProduct: (): void => {},
  searchValue: localStorage.getItem('search-value') || '',
  setNewSearchValue: (): void => {},
};

describe('ItemList', () => {
  test('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <ContentContext.Provider value={mockContentContext}>
          <ItemsList />
        </ContentContext.Provider>
      </MemoryRouter>
    );
    const cards = screen.queryAllByTestId('item');
    expect(cards).toHaveLength(mockContentContext.products.length);
  });

  test('check that an appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <ContentContext.Provider value={nullMockContentContext}>
          <ItemsList />
        </ContentContext.Provider>
      </MemoryRouter>
    );
    const cards = screen.queryAllByTestId('item');
    expect(cards).toHaveLength(0);
    const text = screen.getByText(/nothing found/i);
    expect(text).toBeInTheDocument();
  });
});
