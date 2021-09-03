import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../features/post/postSlice';
import commentsReducer from '../features/comment/commentSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});
