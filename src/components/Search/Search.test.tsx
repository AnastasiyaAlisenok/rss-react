import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Search from './Search';

describe('Search', () => {
  it('renders Search', () => {
    render(
      <MemoryRouter>
        <Search clickSearch={(): void => {}} />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const button = screen.getByLabelText('Search');
    const icon = screen.getByAltText('search-icon');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <Search clickSearch={(): void => {}} />/
      </BrowserRouter>
    );
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
    console.log(localStorage.getItem('search-value'));
    render(
      <MemoryRouter>
        <Search clickSearch={(): void => {}} />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    setTimeout(() => {
      const inputElement = screen.getByTestId('input') as HTMLInputElement;
      expect(inputElement.value).toBe('test-value');
    }, 200);
  });
});
