import React from 'react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import MainPage from '../src/pages';
import renderWithProviders from '../src/tests-helpers/test-helpers';
import { data } from '../src/tests-helpers/data';

test('render App', async () => {
  renderWithProviders(<MainPage products={data} product={null} />);
  expect(mockRouter).toMatchObject({
    asPath: '/',
  });
});
