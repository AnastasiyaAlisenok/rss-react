import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

let container: Element | DocumentFragment;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

it('renders MainPage', () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
  });
  const button = screen.getByText(/get error/i);
  expect(button).toBeInTheDocument();
});
