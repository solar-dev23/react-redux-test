import commentReducer, {
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
  addComment,
} from './commentSlice';

describe('comment reducer', () => {
  const initialState = {
    loading: false,
    hasErrors: false,
    comments: [
      {
        id: 1,
        name: 'test',
        email: 'test@email.com',
        body: 'test',
      },
    ],
  };

  it('should handle initial state', () => {
    expect(commentReducer(undefined, { type: 'unknown' })).toEqual({
      loading: false,
      hasErrors: false,
      comments: [],
    });
  });

  it('should start to get comments', () => {
    const actual = commentReducer(initialState, getComments());
    expect(actual.loading).toEqual(true);
  });

  it('should get comments successfully', () => {
    const actual = commentReducer(
      initialState,
      getCommentsSuccess([
        {
          id: 1,
          name: 'test',
          email: 'test@email.com',
          body: 'test',
        },
      ]),
    );
    expect(actual.comments).toHaveLength(1);
    expect(actual.loading).toEqual(false);
    expect(actual.hasErrors).toEqual(false);
  });

  it('should get failure to get comments', () => {
    const actual = commentReducer(initialState, getCommentsFailure());
    expect(actual.loading).toEqual(false);
    expect(actual.hasErrors).toEqual(true);
  });

  it('should add new comment', () => {
    const actual = commentReducer(
      initialState,
      addComment({
        id: 2,
        name: 'new comment',
        email: 'newcomment@email.com',
        body: 'new comment',
      }),
    );

    expect(actual.comments).toHaveLength(2);
    expect(actual.comments[1].name).toEqual('new comment');
  });
});
