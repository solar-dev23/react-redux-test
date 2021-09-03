import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  hasErrors: false,
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: (state) => {
      state.loading = true;
    },
    getCommentsSuccess: (state, { payload }) => {
      state.comments = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCommentsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    addComment: (state, { payload }) => {
      state.comments.push(payload);
    },
  },
});

export const {
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
  addComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;

export function fetchComments(postId) {
  return async (dispatch) => {
    dispatch(getComments());

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      );
      const data = await response.json();

      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(getCommentsFailure());
    }
  };
}
