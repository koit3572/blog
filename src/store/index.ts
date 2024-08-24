import {
  combineReducers,
  configureStore,
  EnhancedStore,
  PayloadAction,
  Reducer,
  Store,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import postSlice from "@/store/post/postSlice";
import { IInitialState as PostState } from "@/types/post";
import toggleSlice, {
  IInitialState as ToggleState,
} from "@/store/toggle/toggleSlice";
import { IInitialState as SearchSlice } from "@/store/search/searchSlice";
import searchSlice from "./search/searchSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

export interface RootState {
  postSlice: PostState;
  toggleSlice: ToggleState;
  searchSlice: SearchSlice;
}

const persistConfig = {
  key: "blog",
  storage,
  whitelist: ["postSlice", "searchSlice"], //"postSlice", "searchSlice"
};

const rootReducer: Reducer<RootState, PayloadAction<RootState>> = (
  state,
  action,
) => {
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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
const setupStore = (context: Context): EnhancedStore => store;
export const makeStore: MakeStore<any> = (context: Context) =>
  setupStore(context);

export const persistor = persistStore(store);
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
