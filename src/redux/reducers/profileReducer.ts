import type { Profile } from "../../interfaces/interfaces";
import { GET_PROFILE_ERROR, GET_PROFILE_LOADING, GET_PROFILE_SUCCESS, PUT_PROFILE_ERROR, PUT_PROFILE_LOADING, PUT_PROFILE_SUCCESS } from "../actions";
import type { ProfileActions } from "../actions";



// stato iniziale
export interface ProfileState {
    myProfile: Profile | null;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    myProfile: null,
    isLoading: false,
    isUpdating: false,
    error: null
};

export const profileReducer = (state = initialState, action: ProfileActions): ProfileState =>{
    switch (action.type) {
        // caso per il richiamo del profilo
        case GET_PROFILE_LOADING:
            return {...state, isLoading: true, error: null};
            case GET_PROFILE_SUCCESS:
                return {...state, isLoading: false, myProfile: action.payload};
                case GET_PROFILE_ERROR:
                    return {...state, isLoading: false, error: action.payload}
        
        // caso per la modifica del profilo
        case PUT_PROFILE_LOADING:
            return {...state, isUpdating: true, error: null};
            case PUT_PROFILE_SUCCESS:
                return {...state, isUpdating: false, myProfile: action.payload};
                case PUT_PROFILE_ERROR:
                    return {...state, isUpdating: false, error: action.payload};

        default:
            return state;
    }
}