import React from 'react';
import '@testing-library/jest-dom';
import App from './App';
import renderWithProviders from './tests-helpers/test-helpers';

test('render App', async () => {
  renderWithProviders(<App />);
  expect(window.location.pathname).toEqual('/');
});
