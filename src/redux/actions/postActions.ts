import type { Dispatch } from 'redux';
import { customFetch } from './apiClient';
import type { Post } from '../../interfaces/interfaces';

export const POST_LOADING = 'POST_LOADING';
export const POST_ERROR = 'POST_ERROR';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';


export interface PostInput {
  text: string;
}

export const getPost = () => async (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
    const data = await customFetch<Post[]>('posts/');
    dispatch({ type: GET_POSTS_SUCCESS, payload: data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: POST_ERROR, payload: msg });
  }
};

export const createPost = (postData: PostInput) => async (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
    const data = await customFetch<Post>('posts/', 'POST', postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    return data;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: POST_ERROR, payload: msg });
  }
};

// per caricare l immagine devo richiamare il form data del create post
export const uploadPostImage = (postId: string, file: File) => async (dispatch: Dispatch) => {
  try {
    const formData = new FormData();
    formData.append('post', file);
    const data = await customFetch<Post>(`posts/${postId}`, 'POST', formData);
    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
    
    return data;
  } catch (err) {
    console.error("Errore durante il caricamento dell'immagine:", err);
    const msg = err instanceof Error ? err.message : 'Errore nel caricamento immagine';
    dispatch({ type: POST_ERROR, payload: msg });
    return null;
  }
};

export const updatePost = (postId: string, postData: PostInput) => async (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
    const data = await customFetch<Post>(`posts/${postId}`, 'PUT', postData);
    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
    return data;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: POST_ERROR, payload: msg });
  }
};


export const deletePost = (postId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
    await customFetch(`posts/${postId}`, 'DELETE');
    dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: POST_ERROR, payload: msg });
  }
};