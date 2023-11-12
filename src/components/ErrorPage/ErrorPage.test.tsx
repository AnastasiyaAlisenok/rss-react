import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './ErrorPage';

test('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/error-path']} initialIndex={0}>
      <Routes>
        <Route path="error-path" element={<ErrorPage />} />
      </Routes>
    </MemoryRouter>
  );
  const page404 = screen.getByText(/404/i);
  expect(page404).toBeInTheDocument();
});
