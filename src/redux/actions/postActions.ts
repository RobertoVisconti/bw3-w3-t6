import type { Dispatch } from 'redux';
import { customFetch } from '../../api/apiClient';
import type { Post } from '../../interfaces/interfaces';
import type { RootState } from '../../redux/store';
export const POST_LOADING = 'POST_LOADING';
export const POST_ERROR = 'POST_ERROR';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

export interface PostInput {
  text: string;
}


type PostUser = Post['user'];

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


export const createPost = (postData: PostInput, currentProfile: PostUser) => async (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
    const data = await customFetch<Post>('posts/', 'POST', postData);
    
 
    const enrichedPost: Post = {
      ...data,
      user: currentProfile || data.user
    };

    dispatch({ type: CREATE_POST_SUCCESS, payload: enrichedPost });
    return enrichedPost;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: POST_ERROR, payload: msg });
  }
};


export const uploadPostImage = (postId: string, file: File, currentProfile: PostUser) => 
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: POST_LOADING }); 
    try {
      const formData = new FormData();
      formData.append('post', file);
      
      
      const data = await customFetch<Record<string, unknown> | string>(`posts/${postId}`, 'POST', formData);
      
      console.log("RISPOSTA DEL SERVER DOPO UPLOAD IMMAGINE:", data);

      const originalPosts = getState().post.posts;
      const originalPost = originalPosts.find((p: Post) => p._id === postId);

      let finalImageUrl: string | undefined = undefined;
      if (typeof data === 'string') {
        finalImageUrl = data;
      } else if (data && typeof data === 'object') {
        finalImageUrl = (data.image as string) || (data.imageUrl as string) || (data.url as string);
      }

      const enrichedPost: Post = {
        ...originalPost,
        ...(typeof data === 'object' ? data : {}), 
        _id: postId, 
        user: currentProfile || originalPost?.user,
        
        image: finalImageUrl || originalPost?.image || "" 
      } as Post;

      dispatch({ type: UPDATE_POST_SUCCESS, payload: enrichedPost });
      return enrichedPost;
    } catch (err) {
      console.error("Errore durante il caricamento dell'immagine:", err);
      const msg = err instanceof Error ? err.message : 'Errore nel caricamento immagine';
      dispatch({ type: POST_ERROR, payload: msg });
      return null;
    }
  };

export const deletePost = (postId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  try {
   
    await customFetch(`posts/${postId}`, 'DELETE');
    
    dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore durante la cancellazione del post';
    dispatch({ type: POST_ERROR, payload: msg });
  }
};