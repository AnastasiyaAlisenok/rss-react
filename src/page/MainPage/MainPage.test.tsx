import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import renderWithProviders from '../../tests-helpers/test-helpers';

it('renders MainPage', () => {
  renderWithProviders(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  );
  const button = screen.getByText(/get error/i);
  expect(button).toBeInTheDocument();
});
