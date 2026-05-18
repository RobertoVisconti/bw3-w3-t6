import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {profileReducer} from '../reducers/profileReducer'

const mainReducer = combineReducers({
    profile: profileReducer,
})

export const store = configureStore({
    reducer: mainReducer
})


// li prendo da redux/toolkit, servono per dichiarare le azioni
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof mainReducer>;