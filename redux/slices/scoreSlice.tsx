import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FirebaseTimestamp, db } from "../../src/firebase/firebase";

export type scoreState = {
  score: {
    python: [
      {
        date: string;
        score: number | null;
      }
    ];
    javascript: [
      {
        date: string;
        score: number | null;
      }
    ];
  };
};

export const initialState: scoreState = {
  score: {
    python: [
      {
        date: "",
        score: null,
      },
    ],
    javascript: [
      {
        date: "",
        score: null,
      },
    ],
  },
};
type addranking = {
  username: string;
  language: string;
  level: string;
  score: number;
  uid: string;
};

type addscore = {
  uid: string;
  language: string;
  level: string;
  score: number;
};

export type fetchscore = {
  uid: string;
  level: string;
};

export const fetchJavascriptScore = createAsyncThunk(
  "score/fetchJavascriptScore",
  async (fetchscore: fetchscore, thunkAPI) => {
    const uid = fetchscore.uid;
    const level = fetchscore.level;

    let query = db
      .collection("users")
      .doc(uid)
      .collection("javascript")
      .orderBy("created_at", "asc")
      .where("level", "==", level);

    await query.get().then((snapshots) => {
      const scoreList: Array<object> = [];
      snapshots.forEach((snapshot) => {
        let dateData = snapshot.data().created_at.toDate();
        dateData =
          dateData.getFullYear() +
          "/" +
          (Number(dateData.getMonth()) + 1).toString() +
          "/" +
          dateData.getDate();
        const scoreData = snapshot.data().score;
        scoreList.push({ date: dateData, score: scoreData });
      });
      thunkAPI.dispatch(updateJavascriptScore(scoreList));
    });
  }
);

export const fetchPythonScore = createAsyncThunk(
  "score/fetchPythonScore",
  async (fetchscore: fetchscore, thunkAPI) => {
    const uid = fetchscore.uid;
    const level = fetchscore.level;

    let query = db
      .collection("users")
      .doc(uid)
      .collection("python")
      .orderBy("created_at", "asc")
      .where("level", "==", level);

    await query.get().then((snapshots) => {
      const scoreList: Array<object> = [];
      snapshots.forEach((snapshot) => {
        let dateData = snapshot.data().created_at.toDate();
        dateData =
          dateData.getFullYear() +
          "/" +
          (Number(dateData.getMonth()) + 1).toString() +
          "/" +
          dateData.getDate();
        const scoreData = snapshot.data().score;
        scoreList.push({ date: dateData, score: scoreData });
      });
      thunkAPI.dispatch(updatePythonScore(scoreList));
    });
  }
);

export const addRanking = createAsyncThunk(
  "score/addRanking",
  async (addranking: addranking) => {
    const username = addranking.username;
    const score = addranking.score;
    const language = addranking.language;
    const level = addranking.level;
    const uid = addranking.uid;

    await db
      .collection("ranking")
      .where("language", "==", language)
      .where("level", "==", level)
      .where("uid", "==", uid)
      .get()
      .then((snapshots) => {
        if (snapshots.size) {
          snapshots.forEach((snapshot) => {
            const data = snapshot.data();
            console.log(data);
            const result: boolean = window.confirm(
              username +
                "さんが前回登録した\n" +
                data.score +
                "のスコアがランキングに存在しますが、上書きしてもよろしいでしょうか?"
            );
            if (result) {
              const rankingRef = db.collection("ranking").doc(data.rankingId);

              const timestamp = FirebaseTimestamp.now();

              const rankingData = {
                score: score,
                created_at: timestamp,
              };

              rankingRef.update(rankingData).then(() => {
                console.log("ランキング登録完了");
              });
            } else {
              console.log("キャンセル");
              return false;
            }
          });
        } else {
          const rankingRef = db.collection("ranking").doc();

          const timestamp = FirebaseTimestamp.now();

          const rankingData = {
            username: username,
            language: language,
            level: level,
            rankingId: rankingRef.id,
            score: score,
            created_at: timestamp,
            uid: uid,
          };

          rankingRef.set(rankingData).then(() => {
            alert("ランキングの登録が完了しました");
          });
        }
      });
  }
);

export const addScore = createAsyncThunk(
  "score/addScore",
  async (addscore: addscore) => {
    const uid = addscore.uid;
    const score = addscore.score;
    const language = addscore.language;
    const level = addscore.level;

    const scoreRef = db.collection("users").doc(uid).collection(language).doc();

    const timestamp = FirebaseTimestamp.now();

    const scoreData = {
      level: level,
      scoreId: scoreRef.id,
      score: score,
      created_at: timestamp,
    };

    scoreRef.set(scoreData, { merge: true }).then(() => {
      console.log("スコア登録完了");
    });
  }
);

const scoreSlice = createSlice({
  name: "score", //スライスの名前を設定
  initialState, //stateの初期値を設定
  reducers: {
    updatePythonScore: (state: scoreState, action: any) => {
      state.score.python = action.payload;
    },
    updateJavascriptScore: (state: scoreState, action: any) => {
      state.score.javascript = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addScore.fulfilled, (state, action: any) => {
      alert("スコアの登録が完了しました。");
    });

    builder.addCase(fetchPythonScore.fulfilled, (state, action: any) => {
      console.log("stateにpythonスコアをセット");
    });
    builder.addCase(fetchJavascriptScore.fulfilled, (state, action: any) => {
      console.log("stateにjavascriptスコアをセット");
    });
    builder.addCase(fetchJavascriptScore.rejected, (state, action: any) => {
      console.log(action.error);
    });
  },
});

export const { updatePythonScore, updateJavascriptScore } = scoreSlice.actions;

export const getScore = (state: RootState) => state.score;

export default scoreSlice;
