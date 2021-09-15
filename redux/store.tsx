// import { Store, combineReducers } from "redux";
// // import logger from "redux-logger";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import answersSlice, {
//   initialState as answersState,
// } from "./slices/answerSlice";

// const rootReducer = combineReducers({
//   answers: answersSlice.reducer,
// });

// const preloadedState = () => {
//   return { answers: answersState };
// };

// export type StoreState = ReturnType<typeof preloadedState>;

// export type ReduxStore = Store<StoreState>;

// const createStore = () => {
//   // const middlewareList = [...getDefaultMiddleware(), logger];

//   return configureStore({
//     reducer: rootReducer,
//     // middleware: middlewareList,
//     devTools: process.env.NODE_ENV !== "production",
//     preloadedState: preloadedState(),
//   });
// };

// export default createStore;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import answersSlice from "./slices/answersSlice";
import questionsSlice from "./slices/questionsSlice";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";
import { combineReducers } from "redux";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import scoreSlice from "./slices/scoreSlice";
import timeLimitSlice from "./slices/timelimitSlice";

const rootReducer = combineReducers({
  answers: answersSlice.reducer,
  user: userSlice.reducer,
  questions: questionsSlice.reducer,
  score: scoreSlice.reducer,
  timeLimit: timeLimitSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  // whitelist: ["user"], userStateだけpersistにすると、プレイ画面でリロードしたときエラーが発生する。
  // stateReconciler: hardSet,
};
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
