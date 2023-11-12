import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  mockContentContext,
  nullMockContentContext,
} from '../../tests-helpers/mockContentContext';
import { ContentContext } from '../../hoc/ContentProvider';
import ItemsList from './ItemsList';

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
