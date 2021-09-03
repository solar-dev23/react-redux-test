import postReducer, {
  getPosts,
  getPostsSuccess,
  getPostsFailure,
} from './postSlice';

describe('post reducer', () => {
  const initialState = {
    loading: false,
    hasErrors: false,
    comments: [
      {
        id: 1,
        title: 'test',
        body: 'test',
      },
    ],
  };

  it('should handle initial state', () => {
    expect(postReducer(undefined, { type: 'unknown' })).toEqual({
      loading: false,
      hasErrors: false,
      posts: [],
    });
  });

  it('should start to get posts', () => {
    const actual = postReducer(initialState, getPosts());
    expect(actual.loading).toEqual(true);
  });

  it('should get posts successfully', () => {
    const actual = postReducer(
      initialState,
      getPostsSuccess([
        {
          id: 1,
          title: 'test',
          body: 'test',
        },
      ]),
    );
    expect(actual.posts).toHaveLength(1);
    expect(actual.loading).toEqual(false);
    expect(actual.hasErrors).toEqual(false);
  });

  it('should get failure to get posts', () => {
    const actual = postReducer(initialState, getPostsFailure());
    expect(actual.loading).toEqual(false);
    expect(actual.hasErrors).toEqual(true);
  });
});
