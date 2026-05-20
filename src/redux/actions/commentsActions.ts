import type { Dispatch } from 'redux';
import type { Comment, CommentInput } from '../../interfaces/interfaces'

const BASE_URL = 'https://striveschool-api.herokuapp.com/api/comments/'
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBjMjkyYTc0MDQxZjAwMTUwYmZiMTgiLCJpYXQiOjE3NzkxODE4NjYsImV4cCI6MTc4MDM5MTQ2Nn0.0qFdvZ-BbLzKqRDhCriQJlGYCaWI79v44-waIIguaBk'


// Action Types
export const COMMENTS_LOADING = 'COMMENTS_LOADING';
export const COMMENTS_ERROR = 'COMMENTS_ERROR';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';


// richiamo i commenti del post
export const getComments = (postId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: COMMENTS_LOADING });
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
      method: 'GET',
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Errore nel recupero dei commenti');

    const allComments: Comment[] = await response.json();
    
    const filteredComments = allComments.filter(c => c.elementId === postId);

    dispatch({ type: GET_COMMENTS_SUCCESS, payload: { postId, comments: filteredComments } });
    return filteredComments;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: COMMENTS_ERROR, payload: msg });
    return null;
  }
};

// publico un nuovo commento
export const addComment = (commentData: CommentInput) => async (dispatch: Dispatch) => {
  dispatch({ type: COMMENTS_LOADING });
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Errore durante l\'invio del commento');

    const data: Comment = await response.json();
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: data });
    return data;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: COMMENTS_ERROR, payload: msg });
    return null;
  }
};