import { EXP_LOADING, EXP_ERROR, GET_EXPERIENCES_SUCCESS, CREATE_EXP_SUCCESS, UPDATE_EXP_SUCCESS, DELETE_EXP_SUCCESS } from '../actions/experienceActions';
import type { ExperienceState, Experience } from '../../interfaces/interfaces';

interface UpdateExpPayload {
  expId: string;
  data: Experience;
}

interface ExperienceAction {
  type: string;
  payload: Experience[] | Experience | UpdateExpPayload | string; 
}

const initialState: ExperienceState = {
  experiences: [],
  isLoading: false,
  error: null
};

export const experienceReducer = (state = initialState, action: ExperienceAction): ExperienceState => {
  switch (action.type) {
    case EXP_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        error: null 
      };

    case EXP_ERROR:
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload as string 
      };

    case GET_EXPERIENCES_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        experiences: action.payload as Experience[] 
      };

    case CREATE_EXP_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        experiences: [...state.experiences, action.payload as Experience] 
      };

    case UPDATE_EXP_SUCCESS:{
      const updatePayload = action.payload as UpdateExpPayload;
      return {
        ...state,
        isLoading: false,
        experiences: state.experiences.map((exp: Experience) => 
          exp._id === updatePayload.expId ? updatePayload.data : exp
        )
      };};

    case DELETE_EXP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experiences: state.experiences.filter((exp: Experience) => 
          exp._id !== (action.payload as string)
        )
      };

    default:
      return state;
  }
};