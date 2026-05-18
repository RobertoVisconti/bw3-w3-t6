import type { Dispatch } from 'redux';
import { customFetch } from './apiClient'; 
import type { Profile, UpdateProfileInput } from '../../interfaces/interfaces';

// Costanti d'azione
export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';
export const PUT_PROFILE_LOADING = 'PUT_PROFILE_LOADING';
export const PUT_PROFILE_SUCCESS = 'PUT_PROFILE_SUCCESS';
export const PUT_PROFILE_ERROR = 'PUT_PROFILE_ERROR';

// Interfacce Azioni
interface GetProfileLoadingAction { type: typeof GET_PROFILE_LOADING }
interface GetProfileSuccessAction { type: typeof GET_PROFILE_SUCCESS; payload: Profile }
interface GetProfileErrorAction { type: typeof GET_PROFILE_ERROR; payload: string }
interface PutProfileLoadingAction { type: typeof PUT_PROFILE_LOADING }
interface PutProfileSuccessAction { type: typeof PUT_PROFILE_SUCCESS; payload: Profile }
interface PutProfileErrorAction { type: typeof PUT_PROFILE_ERROR; payload: string }

export type ProfileActions =
  | GetProfileLoadingAction | GetProfileSuccessAction | GetProfileErrorAction
  | PutProfileLoadingAction | PutProfileSuccessAction | PutProfileErrorAction;



export const getMyProfileAsync = () => {
  return async (dispatch: Dispatch<ProfileActions>) => {
    dispatch({ type: GET_PROFILE_LOADING });
    try {
      const data = await customFetch<Profile>('profile/me');
      dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
      dispatch({ type: GET_PROFILE_ERROR, payload: errorMessage });
    }
  };
};

export const updateProfileAsync = (profileData: UpdateProfileInput) => {
  return async (dispatch: Dispatch<ProfileActions>) => {
    dispatch({ type: PUT_PROFILE_LOADING });
    try {
      const data = await customFetch<Profile>('profile/', 'PUT', profileData);
      dispatch({ type: PUT_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
      dispatch({ type: PUT_PROFILE_ERROR, payload: errorMessage });
    }
  };
};