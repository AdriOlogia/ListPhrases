// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./slice/wordsSlice";

export const store = configureStore({
  reducer: {
    wordsList: wordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
