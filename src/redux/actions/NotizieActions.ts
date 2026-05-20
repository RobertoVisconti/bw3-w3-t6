import { customFetchNotizie } from "../../api/apiClient";
import type { NewsResponse } from "../../interfaces/interfaces";

export const NEWS_IS_LOADING = "NEWS_IS_LOADING";
export const NEWS_SUCCESS_LOADED = "NEWS_SUCCESS_LOADED";
export const NEWS_ERROR = "NEWS_ERROR";

export const getNewsAsync = () => {
  return async (dispatch) => {
    dispatch({ type: NEWS_IS_LOADING });
    try {
      const data = await customFetchNotizie<NewsResponse>();
      dispatch({ type: NEWS_SUCCESS_LOADED, payload: data.news });
    } catch (errore) {
      dispatch({ type: NEWS_ERROR, payload: errore.message });
    }
  };
};
