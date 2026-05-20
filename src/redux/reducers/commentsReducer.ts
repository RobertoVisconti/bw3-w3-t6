import {
  COMMENTS_LOADING,
  COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS // <-- Importato
} from "../actions/commentsActions";
import type { CommentState, Comment } from "../../interfaces/interfaces";

// Definisco i tipi che vado ad utilizzare
interface CommentsPayload {
  postId?: string;
  comments?: Comment[];
}

interface CommentAction {
  type: string;
  payload: CommentsPayload | Comment | string;
}

export interface DeleteCommentSuccessAction {
  type: typeof DELETE_COMMENT_SUCCESS;
  payload: {
    postId: string;
    commentId: string;
  };
}


export interface UpdateCommentSuccessAction {
  type: typeof UPDATE_COMMENT_SUCCESS;
  payload: {
    postId: string;
    comment: Comment;
  };
}

// Unione rigorosa delle azioni accettate dal reducer
type AllCommentsActions = CommentAction | DeleteCommentSuccessAction | UpdateCommentSuccessAction;

const initialState: CommentState = {
  commentsByPost: {},
  isLoading: false,
  error: null,
};

export const commentsReducer = (
  state = initialState,
  action: AllCommentsActions,
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

    case DELETE_COMMENT_SUCCESS: {
      const { postId, commentId } = (action as DeleteCommentSuccessAction).payload;
      
      return {
        ...state,
        isLoading: false,
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: (state.commentsByPost[postId] || []).filter(
            (c: Comment) => c._id !== commentId
          ),
        },
      };
    }

    case UPDATE_COMMENT_SUCCESS: {
      const { postId, comment } = (action as UpdateCommentSuccessAction).payload;
      
      return {
        ...state,
        isLoading: false,
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: (state.commentsByPost[postId] || []).map((c: Comment) =>
            c._id === comment._id ? comment : c
          ),
        },
      };
    }

    default:
      return state;
  }
};