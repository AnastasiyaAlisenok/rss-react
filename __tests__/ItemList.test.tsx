import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { data, nullData } from '../src/tests-helpers/data';
import ItemsList from '../src/components/ItemsList/ItemsList';
import renderWithProviders from '../src/tests-helpers/test-helpers';
import server from '../__mocks__/server';
import handlers from '../__mocks__/handler';

describe('ItemList', () => {
  test('renders the specified number of cards', async () => {
    server.use(handlers[0]);
    renderWithProviders(<ItemsList data={data} />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('item');
      expect(cards).toHaveLength(5);
    });
  });

  test('check that an appropriate message is displayed if no cards are present', async () => {
    server.use(handlers[1]);
    renderWithProviders(<ItemsList data={nullData} />);
    await waitFor(() => {
      const text = screen.getByText(/nothing found/i);
      expect(text).toBeInTheDocument();
    });
  });
});
