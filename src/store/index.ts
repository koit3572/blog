import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import toggleSlice from "./toggle/toggleSlice";
import postSlice from "./post/postSlice";
import postContentSlice from "./post/postContentSlice";
import searchSlice from './search/searchSlice'
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
  key: "blogData",
  storage,
  whitelist: ["postSlice", "searchSlice"],
};
export const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    toggleSlice,
    postContentSlice,
    postSlice,
    searchSlice,
  })
);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default persistReducer(persistConfig, rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
