import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemsList from './ItemsList';
import renderWithProviders from '../../tests-helpers/test-helpers';
import server from '../../mock/server';
import handlers from '../../mock/handler';

describe('ItemList', () => {
  test('renders the specified number of cards', async () => {
    server.use(handlers[0]);
    renderWithProviders(
      <MemoryRouter>
        <ItemsList />
      </MemoryRouter>
    );
    await waitFor(() => {
      const cards = screen.getAllByTestId('item');
      expect(cards).toHaveLength(5);
    });
  });

  test('check that an appropriate message is displayed if no cards are present', async () => {
    server.use(handlers[1]);
    renderWithProviders(
      <MemoryRouter>
        <ItemsList />
      </MemoryRouter>
    );
    await waitFor(() => {
      const text = screen.getByText(/nothing found/i);
      expect(text).toBeInTheDocument();
    });
  });
});
