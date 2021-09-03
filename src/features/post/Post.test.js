import React from 'react';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, wait, within } from '@testing-library/react';

import { store } from '../../app/store';
import { Post } from './Post';

const renderPage = async () => {
  const result = render(
    <Provider store={store}>
      <MemoryRouter>
        <Route exact path="/" component={Post} />
      </MemoryRouter>
    </Provider>,
  );

  await wait();

  return result;
};

test('renders Post Page', async () => {
  await renderPage();
  expect(screen.getByLabelText('Post')).toBeInTheDocument();

  const postList = screen.getByRole('list');
  expect(postList).toBeInTheDocument();

  const postListItems = within(postList).queryAllByRole('list-item');
  expect(postListItems).toHaveLength(0);
});
