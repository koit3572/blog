import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IInitialState {
  recentSearchHistory:string[];
}
const initialState: IInitialState = {
  recentSearchHistory: []
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addRecentSearchHistory: (state, action: PayloadAction<string>) => {
      const isTrue = state.recentSearchHistory.find(
        (search) => action.payload === search
      );
      if (!isTrue && action.payload !== "") {
        const upDateRecentSearchHistory = [
          ...state.recentSearchHistory,
        ].filter((search) => search !== "");
        if (upDateRecentSearchHistory.length === 10) {
          upDateRecentSearchHistory.pop();
        }
        upDateRecentSearchHistory.unshift(action.payload);
        state.recentSearchHistory = upDateRecentSearchHistory;
      }
    },
    removeRecentSearchHistory: (state, action: PayloadAction<string>) => {
      const upDateRecentSearchHistory = [...state.recentSearchHistory].filter(
        (search) => search !== action.payload && search !== ""
      );
      state.recentSearchHistory = upDateRecentSearchHistory;
    },
  },
});

export default searchSlice.reducer
export const { addRecentSearchHistory, removeRecentSearchHistory } =
  searchSlice.actions;