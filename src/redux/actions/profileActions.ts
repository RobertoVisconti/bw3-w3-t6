import type { Dispatch } from 'redux';
import { customFetch } from '../../api/apiClient'; 
import type { Profile, UpdateProfileInput } from '../../interfaces/interfaces';

// Costanti d'azione
export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';
export const PUT_PROFILE_LOADING = 'PUT_PROFILE_LOADING';
export const PUT_PROFILE_SUCCESS = 'PUT_PROFILE_SUCCESS';
export const PUT_PROFILE_ERROR = 'PUT_PROFILE_ERROR';
export const GET_ALL_PROFILES_LOADING = "GET_ALL_PROFILES_LOADING";
export const GET_ALL_PROFILES_SUCCESS = "GET_ALL_PROFILES_SUCCESS";
export const GET_ALL_PROFILES_ERROR = "GET_ALL_PROFILES_ERROR";
export const UPLOAD_IMAGE_LOADING = 'UPLOAD_IMAGE_LOADING';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'UPLOAD_IMAGE_ERROR';

// Interfacce Azioni
interface GetProfileLoadingAction { type: typeof GET_PROFILE_LOADING }
interface GetProfileSuccessAction { type: typeof GET_PROFILE_SUCCESS; payload: Profile }
interface GetProfileErrorAction { type: typeof GET_PROFILE_ERROR; payload: string }
interface PutProfileLoadingAction { type: typeof PUT_PROFILE_LOADING }
interface PutProfileSuccessAction { type: typeof PUT_PROFILE_SUCCESS; payload: Profile }
interface PutProfileErrorAction { type: typeof PUT_PROFILE_ERROR; payload: string }
interface GetAllProfilesLoadingAction { type: typeof GET_ALL_PROFILES_LOADING }
interface GetAllProfilesSuccessAction { type: typeof GET_ALL_PROFILES_SUCCESS; payload: Profile[] }
interface GetAllProfilesErrorAction { type: typeof GET_ALL_PROFILES_ERROR; payload: string }
interface UploadImageLoadingAction { type: typeof UPLOAD_IMAGE_LOADING }
interface UploadImageSuccessAction { type: typeof UPLOAD_IMAGE_SUCCESS; payload: Profile }
interface UploadImageErrorAction { type: typeof UPLOAD_IMAGE_ERROR; payload: string }

export type ProfileActions =
  | GetProfileLoadingAction | GetProfileSuccessAction | GetProfileErrorAction
  | PutProfileLoadingAction | PutProfileSuccessAction | PutProfileErrorAction
  | GetAllProfilesLoadingAction | GetAllProfilesSuccessAction | GetAllProfilesErrorAction
  | UploadImageLoadingAction | UploadImageSuccessAction | UploadImageErrorAction;

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

export const getAllProfilesAction = () => {
  return async (dispatch: Dispatch<ProfileActions>) => {
    dispatch({ type: GET_ALL_PROFILES_LOADING });
    try {
      const data = await customFetch<Profile[]>("profile", "GET");
      if (data) {
        dispatch({ type: GET_ALL_PROFILES_SUCCESS, payload: data });
      } else {
        dispatch({ type: GET_ALL_PROFILES_ERROR, payload: "Nessun dato ricevuto" });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
      dispatch({ type: GET_ALL_PROFILES_ERROR, payload: errorMessage || "Errore nel caricamento dei profili" });
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