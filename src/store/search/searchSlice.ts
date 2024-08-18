import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
export interface IInitialState {
  recentSearchHistory: string[];
}
const initialState: IInitialState = {
  recentSearchHistory: [],
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addRecentSearchHistory: (state, action: PayloadAction<string>) => {
      const isTrue = state.recentSearchHistory.find(
        (search) => action.payload === search,
      );
      if (!isTrue && action.payload !== "") {
        const upDateRecentSearchHistory = [...state.recentSearchHistory].filter(
          (search) => search !== "",
        );
        if (upDateRecentSearchHistory.length === 10) {
          upDateRecentSearchHistory.pop();
        }
        upDateRecentSearchHistory.unshift(action.payload);
        state.recentSearchHistory = upDateRecentSearchHistory;
      }
    },
    removeRecentSearchHistory: (state, action: PayloadAction<string>) => {
      const upDateRecentSearchHistory = [...state.recentSearchHistory].filter(
        (search) => search !== action.payload && search !== "",
      );
      state.recentSearchHistory = upDateRecentSearchHistory;
    },
  },
  extraReducers: () => ({
    [HYDRATE]: (state: IInitialState, action: PayloadAction<any>) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.search,
      };
    },
  }),
});

export default searchSlice.reducer;
export const { addRecentSearchHistory, removeRecentSearchHistory } =
  searchSlice.actions;
