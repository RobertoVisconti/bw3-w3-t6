import type { NewsState } from "../../interfaces/interfaces";
import {
  NEWS_ERROR,
  NEWS_IS_LOADING,
  NEWS_SUCCESS_LOADED,
} from "../actions/NotizieActions";

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: null,
};

const NewsReducer = (state: NewsState = initialState, action) => {
  switch (action.type) {
    case NEWS_IS_LOADING:
      return { ...state, isLoading: true, error: null };
    case NEWS_SUCCESS_LOADED:
      return { ...state, news: action.payload, isLoading: false };
    case NEWS_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default NewsReducer;
