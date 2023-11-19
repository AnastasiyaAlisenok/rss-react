import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import renderWithProviders from '../../tests-helpers/test-helpers';

describe('Pagination', () => {
  it('the component updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );
    const btnNext = await screen.findByTestId('btn-next');
    const user = userEvent.setup();
    user.click(btnNext);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/page=2');
    });
  });
});
