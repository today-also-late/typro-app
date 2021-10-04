import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { db, FirebaseTimestamp } from "../../src/firebase/firebase";
import Router from "next/router";
import { updateQuestionsState } from "./questionsSlice";

export type RoomsState = {
  rooms: [
    {
      roomId: string;
      language: string;
      level: string;
      creator: string;
      creatorName: string;
      participant: string | null;
      password: string | null;
      nextTurn: string;
      count: number;
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
      isEnd: boolean;
    }
  ];
};

export const initialState: RoomsState = {
  rooms: [
    {
      roomId: "",
      language: "",
      level: "",
      creator: "",
      creatorName: "",
      participant: null,
      password: null,
      nextTurn: "",
      count: 1,
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
      isEnd: false,
    },
  ],
};
export type addmissanswers = {
  roomId: string;
  missCount: number;
};

export type addanswers = {
  roomId: string;
  code: string;
  count: number;
  isSrc: string;
};

export type endroom = {
  roomId: string;
  isEnd: boolean;
};
export type changecode = {
  roomId: string;
  code: string;
};

export type changeturn = {
  roomId: string;
  nextTurn: string;
  code: string;
  nextQuestionId: number;
  count: number;
};

export type enterroom = {
  roomId: string;
  participant: string;
  participantName: string;
  participantImage: string;
};

export type addroom = {
  creator: string;
  creatorName: string;
  creatorImage: string;
  language: string;
  level: string;
  password: string | null;
  description: string;
  nextTurn: string;
};

type ExitRoom = {
  roomId: string;
  uid: string;
};

export const exitRoom = createAsyncThunk(
  "rooms/exitRoom",
  async (exitroom: ExitRoom) => {
    const { roomId, uid } = exitroom;

    await db
      .collection("rooms")
      .doc(roomId)
      .set({ isExit: uid }, { merge: true })
      .then(() => {
        console.log("退出");
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (roomId: string) => {
    await db.collection("rooms").doc(roomId).delete();
  }
);

export const addMissAnswersToRoom = createAsyncThunk(
  "rooms/addMissAnswersToRoom",
  async (addmissanswers: addmissanswers) => {
    const { roomId, missCount } = addmissanswers;

    const roomRef = db.collection("rooms").doc(roomId);
    await roomRef.get().then(async (snapshot) => {
      const data: any = snapshot.data();
      let prevMiss: number[] = data.answers["miss"];
      prevMiss.push(missCount);
      const roomData = {
        answers: {
          miss: prevMiss,
        },
      };
      await roomRef.set(roomData, { merge: true });
    });
  }
);

export const addAnswersToRoom = createAsyncThunk(
  "rooms/addAnswersToRoom",
  async (addanswers: addanswers) => {
    const { roomId, code, count, isSrc } = addanswers;

    const roomRef = db.collection("rooms").doc(roomId);
    await roomRef
      .get()
      .then(async (snapshot) => {
        const data: any = snapshot.data();
        let prevCode: string[] = data.answers[count][isSrc];
        prevCode.push(code);
        const roomData = {
          answers: {
            [count]: {
              [isSrc]: prevCode,
            },
          },
        };
        await roomRef
          .set(roomData, { merge: true })
          .then(() => {
            console.log("成功");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

export const endRoom = createAsyncThunk(
  "rooms/endRoom",
  async (endroom: endroom) => {
    const { roomId, isEnd } = endroom;

    const roomRef = db.collection("rooms").doc(roomId);
    const roomData = {
      isEnd: true,
    };

    await roomRef.set(roomData, { merge: true });
  }
);

export const changeCode = createAsyncThunk(
  "rooms/changeCode",
  async (changecode: changecode) => {
    const { roomId, code } = changecode;

    const roomRef = db.collection("rooms").doc(roomId);
    const roomData = {
      code: code,
    };

    await roomRef.set(roomData, { merge: true });
  }
);

export const changeTurn = createAsyncThunk(
  "rooms/changeTurn",
  async (changeturn: changeturn) => {
    const { roomId, nextTurn, code, nextQuestionId, count } = changeturn;

    const roomRef = db.collection("rooms").doc(roomId);
    const roomData = {
      nextTurn: nextTurn,
      nextQuestionId: nextQuestionId,
      code: code,
      count: count,
    };

    await roomRef.set(roomData, { merge: true });
  }
);

export const enterRoom = createAsyncThunk(
  "rooms/enterRoom",
  async (enterroom: enterroom) => {
    const { roomId, participant, participantName, participantImage } =
      enterroom;

    const roomRef = db.collection("rooms").doc(roomId);
    const roomData = {
      participant: participant,
      participantName: participantName,
      participantImage: participantImage,
    };

    await roomRef.set(roomData, { merge: true });

    await roomRef.get().then((snapshot) => {
      const data: any = snapshot.data();
      Router.push({
        pathname: "/users/coop/countdown",
        query: {
          language: data.language,
          level: data.level,
          count: 1,
          roomId: data.roomId,
        },
      });
    });
  }
);

export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (addroom: addroom, thunkAPI) => {
    const creator = addroom.creator;
    const creatorName = addroom.creatorName;
    const creatorImage = addroom.creatorImage;
    const password = addroom.password;
    const language = addroom.language;
    const level = addroom.level;
    const description = addroom.description;
    const nextTurn = addroom.nextTurn;

    const roomRef = db.collection("rooms").doc();

    const timestamp = FirebaseTimestamp.now();

    await thunkAPI.dispatch(
      updateQuestionsState({
        language: language,
        level: level,
      })
    ); // dbからquestionをとってくる

    const state: any = await thunkAPI.getState();
    const questions = state.questions.questions;
    console.log(questions);

    const roomData = {
      language: language,
      level: level,
      roomId: roomRef.id,
      creator: creator,
      creatorName: creatorName,
      creatorImage: creatorImage,
      participant: null,
      password: password,
      description: description,
      created_at: timestamp,
      questions: questions,
      nextTurn: nextTurn,
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
    await roomRef.set(roomData).then(() => {
      Router.push({
        pathname: "/users/coop/waitingroom",
        query: {
          roomId: roomRef.id,
        },
      });
    });
  }
);

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (uid: string, thunkAPI) => {
    await db
      .collection("rooms")
      .where("participant", "==", null) // nullの部屋を表示
      .orderBy("created_at", "asc")
      .get()
      .then((snapshots) => {
        const rooms: Array<object> = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          console.log(data);
          rooms.push(data);
        });
        thunkAPI.dispatch(updateRooms(rooms));
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    updateRooms: (state, action: any) => {
      state.rooms = action.payload;
      console.log(state.rooms);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, action: any) => {
      console.log("stateにroomをセット");
    });
    builder.addCase(fetchRooms.rejected, (error) => {
      console.log(error);
    });
    builder.addCase(addRoom.fulfilled, (state, action: any) => {
      console.log("しばらくお待ちください");
    });
    builder.addCase(enterRoom.fulfilled, (state, action: any) => {
      console.log("enter room");
    });
    builder.addCase(changeTurn.fulfilled, (state, action: any) => {
      console.log("turn交代");
    });
    builder.addCase(endRoom.fulfilled, (state, action: any) => {
      console.log("問題終了");
    });
    builder.addCase(addAnswersToRoom.fulfilled, (state, action: any) => {
      console.log("回答をroomに追加");
    });
    builder.addCase(addAnswersToRoom.rejected, (state, action: any) => {
      console.log(action.error);
    });
    builder.addCase(exitRoom.fulfilled, (state, action: any) => {
      Router.push("/");
    });
  },
});

export const { updateRooms } = roomsSlice.actions;

export const getRooms = (state: RootState) => state.rooms;

export default roomsSlice;
