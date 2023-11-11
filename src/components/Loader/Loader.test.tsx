import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

it('renders Loader', () => {
  render(<Loader />);
  const pageLoader = screen.getByAltText('loader');
  expect(pageLoader).toBeInTheDocument();
});
