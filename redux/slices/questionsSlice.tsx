import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { auth, FirebaseTimestamp, db, fb } from "../../src/firebase/firebase";
import Router from "next/router";

export type QuestionsState = {
  questions: {
    1: {
      src: {
        [key: number]: string;
      };
      output: {
        [key: number]: string;
      };
      timelimit: number;
      reward: number;
    };
    2: {
      src: {
        [key: number]: string;
      };
      output: {
        [key: number]: string;
      };
      timelimit: number;
      reward: number;
    };
  };
};

export const initialState: QuestionsState = {
  questions: {
    1: {
      src: {
        1: "",
      },
      output: {
        1: "",
      },
      timelimit: 0,
      reward: 0,
    },
    2: {
      src: {
        1: "",
      },
      output: {
        1: "",
      },
      timelimit: 0,
      reward: 0,
    },
  },
};

type Selected = {
  language: string;
  level: string;
};

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const updateQuestionsState = createAsyncThunk(
  "questions/updateQuestionsState",
  async (selected: Selected) => {
    const { language, level } = selected;

    // const response: firebase.default.firestore.DocumentData | any = await (
    //   await db.collection("questions").doc(language).get()
    // ).data();

    const response: firebase.default.firestore.DocumentData | any = await db
      .collection("questions")
      .doc(language)
      .get();

    const data: any = await response.data();

    const randoms: number[] = [];

    const min: number = 1;
    const max: number = 3; // minからmaxまでのランダムな整数
    const length: number = 2; // 生成する配列の長さ
    /** 重複チェックしながら乱数作成 */
    for (let i: number = min; i <= length; i++) {
      while (true) {
        let tmp = getRandomIntInclusive(min, max);
        if (!randoms.includes(tmp)) {
          randoms.push(tmp);
          break;
        }
      }
    }

    return {
      1: data[level][randoms[0]],
      2: data[level][randoms[1]],
    };
  }
);

export const fetchQuestonsFromRoom = createAsyncThunk(
  "questions/fetchQuestonsFromRoom",
  async (roomId: string) => {
    const roomRef = db.collection("rooms").doc(roomId);

    const response: firebase.default.firestore.DocumentData | any =
      await roomRef.get();

    const questions: any = await response.data().questions;

    return questions;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    emptyQuestions: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateQuestionsState.fulfilled, (state, action: any) => {
      state.questions = action.payload; // payloadCreatorでreturnされた値
    });
    builder.addCase(updateQuestionsState.rejected, (error) => {
      console.log(error);
    });
    builder.addCase(fetchQuestonsFromRoom.fulfilled, (state, action: any) => {
      state.questions = action.payload;
    });
  },
});

export const { emptyQuestions } = questionsSlice.actions;

export const getQuestions = (state: RootState) => state.questions;

export default questionsSlice;
