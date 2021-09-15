import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TimeLimitState = {
  timeLimit: {
    timeLimit: number[];
  };
};

export const initialState: TimeLimitState = {
  timeLimit: {
    timeLimit: [],
  },
};

const timeLimitSlice = createSlice({
  name: "timeLimit",
  initialState,
  reducers: {
    getTimeLimit: (state, action) => {
      state.timeLimit.timeLimit = action.payload;
    },
  },
});

export const { getTimeLimit } = timeLimitSlice.actions;

export const setTimeLimit = (state: RootState) => state.timeLimit;

export default timeLimitSlice;
