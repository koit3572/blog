import {
  combineReducers,
  configureStore,
  PayloadAction,
  Store,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import postSlice from "@/store/post/postSlice";
import { IInitialState as PostState } from "@/types/post";
import toggleSlice, {
  IInitialState as ToggleState,
} from "@/store/toggle/toggleSlice";
import { IInitialState as SearchSlice } from "@/store/search/searchSlice";
import searchSlice from "./search/searchSlice";
import logger from "redux-logger";

export interface RootState {
  postSlice: PostState;
  toggleSlice: ToggleState;
  searchSlice: SearchSlice;
  type: string;
}

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "blog",
  storage,
  whitelist: ["postSlice", "searchSlice"], //"postSlice", "searchSlice"
};

const rootReducer = (state: any, action: PayloadAction<RootState>) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return combineReducers({ postSlice, toggleSlice, searchSlice })(
        state,
        action,
      );
    }
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }), //.concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
