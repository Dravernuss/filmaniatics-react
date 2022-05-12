import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import movielistReducer from "../slices/movielistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movielist: movielistReducer,
  },
});
