import type { Profile } from "../../interfaces/interfaces";
import { 
  GET_PROFILE_ERROR, 
  GET_PROFILE_LOADING, 
  GET_PROFILE_SUCCESS, 
  PUT_PROFILE_ERROR, 
  PUT_PROFILE_LOADING, 
  PUT_PROFILE_SUCCESS,
  GET_ALL_PROFILES_LOADING,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_ERROR,
  UPLOAD_IMAGE_LOADING,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR

} from "../actions/profileActions";
import type { ProfileActions } from "../actions/profileActions";

export interface ProfileState {
  myProfile: Profile | null;
  allProfiles: Profile[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  myProfile: null,
  allProfiles: [],
  isLoading: false,
  isUpdating: false,
  error: null
};

export const profileReducer = (state = initialState, action: ProfileActions): ProfileState => {
  switch (action.type) {
    
    case GET_PROFILE_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        error: null 
      };

    case GET_PROFILE_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        myProfile: action.payload
      };

    case GET_PROFILE_ERROR:
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload 
      };

    case PUT_PROFILE_LOADING:
      return { 
        ...state, 
        isUpdating: true, 
        error: null 
      };

    case PUT_PROFILE_SUCCESS:
      return { 
        ...state, 
        isUpdating: false, 
        myProfile: action.payload 
      };

    case PUT_PROFILE_ERROR:
      return { 
        ...state, 
        isUpdating: false, 
        error: action.payload 
      };

      case GET_ALL_PROFILES_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        error: null 
      };

    case GET_ALL_PROFILES_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        allProfiles: action.payload
        };
    case GET_ALL_PROFILES_ERROR:
      return { 
        ...state, 
        isLoading: false, 
        error: action.payload 
      };
    
    case UPLOAD_IMAGE_LOADING:
      return {
        ...state,
        isUpdating: true,
        error: null
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        myProfile: action.payload
        };
    
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };


    default:
      return state;
  }
};  