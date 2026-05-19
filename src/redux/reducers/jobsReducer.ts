import type { JobsState } from "../../interfaces/interfaces";
import {
  JOBS_ERROR,
  JOBS_IS_LOADING,
  JOBS_SUCCESS_LOADED,
} from "../actions/jobActions";

const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_IS_LOADING:
      return { ...state, isLoading: true, error: null };
    case JOBS_SUCCESS_LOADED:
      return {
        ...state,
        jobs: action.payload.data,
        isLoading: false,
      };
    case JOBS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;
