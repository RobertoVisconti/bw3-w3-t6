import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "../reducers/profileReducer";
import { experienceReducer } from "../reducers/experienceReducer";
import { postReducer } from "../reducers/postReducer";
import jobsReducer from "../reducers/jobsReducer";
import { commentsReducer } from "../reducers/commentsReducer";
import { reteReducer } from "../reducers/reteReducer";

const mainReducer = combineReducers({
  profile: profileReducer,
  experience: experienceReducer,
  post: postReducer,
  jobs: jobsReducer,
  comments: commentsReducer,
  rete: reteReducer
});

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,    
    }),
});

// li prendo da redux/toolkit, servono per dichiarare le azioni
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof mainReducer>;
