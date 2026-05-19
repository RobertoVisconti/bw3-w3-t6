import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { profileReducer } from '../reducers/profileReducer';
import { experienceReducer } from '../reducers/experienceReducer';
import { postReducer } from '../reducers/postReducer';
import { commentsReducer } from "../reducers/commentsReducer";

const mainReducer = combineReducers({
  profile: profileReducer,
  experience: experienceReducer,
  post: postReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: mainReducer,
});

// li prendo da redux/toolkit, servono per dichiarare le azioni
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof mainReducer>;