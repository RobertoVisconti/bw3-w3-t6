import {
  COMMENTS_LOADING,
  COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
} from "../actions/commentsActions";
import type { CommentState, Comment } from "../../interfaces/interfaces";

// definisco i tipi che vado ad utilizzare
interface CommentsPayload {
  postId?: string;
  comments?: Comment[];
}

interface CommentAction {
  type: string;
  payload: CommentsPayload | Comment | string;
}


const initialState: CommentState = {
    commentsByPost: {},
    isLoading: false,
  error: null,
};
export const commentsReducer = (
  state = initialState,
  action: CommentAction,
): CommentState => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case COMMENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case GET_COMMENTS_SUCCESS: {
      const { postId, comments } = action.payload as {
        postId: string;
        comments: Comment[];
      };
      const existingComments = state.commentsByPost[postId] || [];
      const finalComments = comments.length === 0 ? existingComments : comments;

       return {
       ...state,
       isLoading: false,
       commentsByPost: {
        ...state.commentsByPost,
        [postId]: finalComments,
      },
  };
}
    
    case ADD_COMMENT_SUCCESS: {
      const newComment = action.payload as Comment;
      const postId = newComment.elementId;
      const currentComments = state.commentsByPost[postId] || [];

      return {
        ...state,
        isLoading: false,
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: [newComment, ...currentComments],
        },
      };
    }

    default:
      return state;
  }
};