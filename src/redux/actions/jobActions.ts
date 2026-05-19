import { customFetchJobs } from "../../api/apiClient";

export const JOBS_IS_LOADING = "JOBS_IS_LOADING";
export const JOBS_SUCCESS_LOADED = "JOBS_SUCCESS_LOADED";
export const JOBS_ERROR = "JOBS_ERROR";

export const getJobsAsync = () => {
  return async (dispatch) => {
    dispatch({ type: JOBS_IS_LOADING });
    try {
      const data = await customFetchJobs<job[]>("jobs");
      dispatch({ type: JOBS_SUCCESS_LOADED, payload: data });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.message });
    }
  };
};
