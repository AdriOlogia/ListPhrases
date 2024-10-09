import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FindWordState {
  listWords: Array<string>;
  wordsFinded: Array<string>;
}

const initialState: FindWordState = {
  listWords: JSON.parse(localStorage.getItem("listWords") || "[]"),
  wordsFinded: [],
};

export const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      const word = action.payload.toLowerCase().trim();
      state.listWords.push(word);
    },
    removeWord: (state, action: PayloadAction<string>) => {
      const word = action.payload.toLowerCase();
      state.listWords = state.listWords.filter(
        (item) => item.toLowerCase() !== word
      );
      state.wordsFinded = state.wordsFinded.filter(
        (item) => item.toLowerCase() !== word
      );
    },
    findWord: (state, action: PayloadAction<string>) => {
      const word = action.payload.toLowerCase().trim();
      state.wordsFinded = state.listWords.filter((item) =>
        item.toLowerCase().includes(word.toLowerCase())
      );
    },
    saveWordLocalStorage: (state) => {
      localStorage.setItem("listWords", JSON.stringify(state.listWords));
      localStorage.setItem("wordsFinded", JSON.stringify(state.wordsFinded));
    },
    getWordsLocalStorage: (state, action: PayloadAction<Array<string>>) => {
      const storedWords = localStorage.getItem("listWords");
      if (storedWords) {
        state.listWords = JSON.parse(storedWords);
      } else {
        state.listWords = action.payload;
      }
    },
  },
});

export const {
  addLetter,
  removeWord,
  findWord,
  saveWordLocalStorage,
  getWordsLocalStorage,
} = wordSlice.actions;

export default wordSlice.reducer;
