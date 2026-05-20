import type { Profile } from "../../interfaces/interfaces";
import { ADD_PROFILE, REMOVE_PROFILE } from "../actions/reteActions";
import type { UnknownAction } from "redux";

interface ReteState {
    listaRete: Profile[];
}

const initialState: ReteState = {
    listaRete: [],
};

export const reteReducer = (state = initialState, action: UnknownAction): ReteState => {
    switch (action.type) {
        case ADD_PROFILE: {
            const profiloDaAggiungere = action.payload as Profile;
            const giaPresente = state.listaRete.some((u) => u._id === profiloDaAggiungere._id);
            
            if (giaPresente) return state;
            
            return {
                ...state,
                listaRete: [...state.listaRete, profiloDaAggiungere],
            };
        }

        case REMOVE_PROFILE:
            return {
                ...state,
                listaRete: state.listaRete.filter((u) => u._id !== (action.payload as string)),
            };

        default:
            return state;
    }
};