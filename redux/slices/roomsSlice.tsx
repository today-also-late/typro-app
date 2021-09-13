import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { db } from "../../src/firebase/firebase";
import Router from "next/router";

export type RoomsState = {
  rooms: [
    {
      roomId: string;
      language: string;
      level: string;
      creator: string;
      participant: string | null;
      password: string | null;
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
      participant: null,
      password: null,
    },
  ],
};

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (uid: string, thunkAPI) => {
    await db
      .collection("rooms")
      .get()
      .then((snapshots) => {
        const rooms: Array<object> = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          console.log(data);
          rooms.push(data);
        });
        console.log(rooms);
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
  },
});

export const { updateRooms } = roomsSlice.actions;

export const getRooms = (state: RootState) => state.rooms;

export default roomsSlice;
