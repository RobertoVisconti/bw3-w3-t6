import type { Dispatch } from 'redux';
import { customFetch } from './apiClient';
import type { Experience } from '../../interfaces/interfaces';

export const EXP_LOADING = 'EXP_LOADING';
export const EXP_ERROR = 'EXP_ERROR';
export const GET_EXPERIENCES_SUCCESS = 'GET_EXPERIENCES_SUCCESS';
export const CREATE_EXP_SUCCESS = 'CREATE_EXP_SUCCESS';
export const UPDATE_EXP_SUCCESS = 'UPDATE_EXP_SUCCESS';
export const DELETE_EXP_SUCCESS = 'DELETE_EXP_SUCCESS';

export type ExperienceInput = Omit<Experience, '_id' | 'username' | 'createdAt' | 'updatedAt'>;

export const getExperience = (userId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: EXP_LOADING });
  try {
    const data = await customFetch<Experience[]>(`profile/${userId}/experiences`);
    dispatch({ type: GET_EXPERIENCES_SUCCESS, payload: data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: EXP_ERROR, payload: msg });
  }
};

export const createExperience = (userId: string, expData: ExperienceInput) => async (dispatch: Dispatch) => {
  dispatch({ type: EXP_LOADING });
  try {
    const data = await customFetch<Experience>(`profile/${userId}/experiences`, 'POST', expData);
    dispatch({ type: CREATE_EXP_SUCCESS, payload: data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: EXP_ERROR, payload: msg });
  }
};

export const updateExperience = (userId: string, expId: string, expData: ExperienceInput) => async (dispatch: Dispatch) => {
  dispatch({ type: EXP_LOADING });
  try {
    const data = await customFetch<Experience>(`profile/${userId}/experiences/${expId}`, 'PUT', expData);
    dispatch({ type: UPDATE_EXP_SUCCESS, payload: { expId, data } });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: EXP_ERROR, payload: msg });
  }
};

export const deleteExperience = (userId: string, expId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: EXP_LOADING });
  try {
    await customFetch(`profile/${userId}/experiences/${expId}`, 'DELETE');
    dispatch({ type: DELETE_EXP_SUCCESS, payload: expId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore sconosciuto';
    dispatch({ type: EXP_ERROR, payload: msg });
  }
};