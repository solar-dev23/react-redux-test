import React from 'react';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, wait, within } from '@testing-library/react';

import { store } from '../../app/store';
import { Comment } from './Comment';

const renderPage = async ({ postId }) => {
  const result = render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          { pathname: '/comments', search: `?postId=${postId}` },
        ]}
      >
        <Route exact path="/comments" component={Comment} />
      </MemoryRouter>
    </Provider>,
  );

  await wait();

  return result;
};

test('renders Comment Page', async () => {
  await renderPage({ postId: 1 });
  expect(screen.getByLabelText('Comment')).toBeInTheDocument();

  const commentList = screen.getByRole('list');
  expect(commentList).toBeInTheDocument();

  const commentListItems = within(commentList).queryAllByRole('list-item');
  expect(commentListItems).toHaveLength(0);
});
