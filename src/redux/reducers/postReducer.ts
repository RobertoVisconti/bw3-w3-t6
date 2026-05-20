import {
  POST_LOADING,
  POST_ERROR,
  GET_POSTS_SUCCESS,
  CREATE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS
} from '../actions/postActions';
import type { PostState, Post } from '../../interfaces/interfaces';

interface PostAction {
  type: string;
  payload: Post[] | Post | string;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null
};

export const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case POST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload as Post[]
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [action.payload as Post, ...state.posts]
      };

    case UPDATE_POST_SUCCESS: {
      const updatedPost = action.payload as Post;
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post: Post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      };
    }
    
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter((post: Post) =>
          post._id !== (action.payload as string)
        )
      };

    default:
      return state;
  }
};