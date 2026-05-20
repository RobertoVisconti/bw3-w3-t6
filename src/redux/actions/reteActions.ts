import type { Profile } from "../../interfaces/interfaces";

export const ADD_PROFILE = "ADD_PROFILE";
export const REMOVE_PROFILE = "REMOVE_PROFILE";

export const addProfile = (utente: Profile) =>{
    return{
        type: ADD_PROFILE as typeof ADD_PROFILE,
        payload: utente,
    };
};

export const removeProfile = (utenteId: string)=>{
   return{
    type: REMOVE_PROFILE as typeof REMOVE_PROFILE,
    payload: utenteId,
   };
};