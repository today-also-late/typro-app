import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AnswersState = {
  answers: {
    1: {
      src: string[];
      output: string[];
    };
    2: {
      src: string[];
      output: string[];
    };
    miss: number[];
  };
};

export const initialState: AnswersState = {
  answers: {
    1: {
      src: [],
      output: [],
    },
    2: {
      src: [],
      output: [],
    },
    miss: [],
  },
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addFirstSrcAnswers: (state: any, action: PayloadAction<string>) =>
      void state.answers[1]["src"].push(action.payload),
    addSecondSrcAnswers: (state: any, action: PayloadAction<string>) =>
      void state.answers[2]["src"].push(action.payload),
    addFirstOutputAnswers: (state, action: PayloadAction<string>) =>
      void state.answers[1]["output"].push(action.payload),
    addSecondOutputAnswers: (state, action: PayloadAction<string>) =>
      void state.answers[2]["output"].push(action.payload),
    addMissAnswers: (state, action: PayloadAction<number>) =>
      void state.answers["miss"].push(action.payload),
    emptyAnswers: () => {
      return initialState;
    },
    emptySecondSrcAnswers: (state) => {
      state.answers[2]["src"] = [];
    },
    emptyFirstOutputAnswers: (state) => {
      state.answers[1]["output"] = [];
    },
    emptySecondOutputAnswers: (state) => {
      state.answers[2]["output"] = [];
    },
  },
});

export const {
  addFirstSrcAnswers,
  addSecondSrcAnswers,
  addFirstOutputAnswers,
  addSecondOutputAnswers,
  addMissAnswers,
  emptyAnswers,
  emptySecondSrcAnswers,
  emptyFirstOutputAnswers,
  emptySecondOutputAnswers,
} = answersSlice.actions;

export const getAnswers = (state: RootState) => state.answers;

export default answersSlice;
