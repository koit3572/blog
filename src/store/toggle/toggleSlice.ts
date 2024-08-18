import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  isSideBarToggle: boolean;
}
const initialState: IInitialState = {
  isSideBarToggle: true,
};
const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setIsMainSideMenuToggle: (
      state,
      action: PayloadAction<{ isToggle?: boolean }>,
    ) => {
      if (action.payload.isToggle !== null) {
        state.isSideBarToggle = action.payload.isToggle!;
      } else {
        state.isSideBarToggle = !state.isSideBarToggle;
      }
    },
  },
});

export const { setIsMainSideMenuToggle } = toggleSlice.actions;
export default toggleSlice.reducer;
