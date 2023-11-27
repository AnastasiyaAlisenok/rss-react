import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import Search from '../src/components/Search/Search';
import renderWithProviders from '../src/tests-helpers/test-helpers';

describe('Search', () => {
  it('renders Search', () => {
    renderWithProviders(<Search />);
    const input = screen.getByRole('textbox');
    const button = screen.getByLabelText('Search');
    const icon = screen.getByTestId('search-icon');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('clicking the Search button saves the entered value to the local storage', () => {
    renderWithProviders(<Search />);
    const input = screen.getByTestId('input');
    const button = screen.getByRole('button');
    fireEvent.change(input, {
      target: { value: 'watch' },
    });
    fireEvent.click(button);
    setTimeout(() => {
      const localStorageValue = localStorage.getItem('search-value');
      expect(localStorageValue).toBe('watch');
    }, 200);
  });

  it('input get value from LS upon mounting', async () => {
    localStorage.setItem('search-value', 'test-value');
    renderWithProviders(<Search />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    setTimeout(() => {
      const inputElement = screen.getByTestId('input') as HTMLInputElement;
      expect(inputElement.value).toBe('test-value');
    }, 200);
  });
});
