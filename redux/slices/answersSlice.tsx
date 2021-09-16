import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { db } from "../../src/firebase/firebase";
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

export const fetchAnswersFromRoom = createAsyncThunk(
  "questions/fetchAnswersFromRoom",
  async (roomId: string) => {
    const roomRef = db.collection("rooms").doc(roomId);

    const response: firebase.default.firestore.DocumentData | any =
      await roomRef.get();

    const answers: any = await response.data().answers;

    return answers;
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnswersFromRoom.fulfilled, (state, action: any) => {
      state.answers = action.payload;
    });
  },
});

export const {
  addFirstSrcAnswers,
  addSecondSrcAnswers,
  addFirstOutputAnswers,
  addSecondOutputAnswers,
  addMissAnswers,
  emptyAnswers,
} = answersSlice.actions;

export const getAnswers = (state: RootState) => state.answers;

export default answersSlice;
