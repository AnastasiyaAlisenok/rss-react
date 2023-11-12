import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentContext } from '../../hoc/ContentProvider';
import { mockContentContext } from '../../tests-helpers/mockContentContext';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('the component updates URL query parameter when page changes', async () => {
    mockContentContext.page = 1;
    render(
      <BrowserRouter>
        <ContentContext.Provider value={mockContentContext}>
          <Pagination />
        </ContentContext.Provider>
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
