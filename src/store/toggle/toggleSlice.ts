import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isMainSideMenuToggle: boolean;
}
interface ISetMainSideMenuToggleAction {
  isToggle?: boolean;
}
const initialState: IInitialState = {
  isMainSideMenuToggle: true
}
const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setIsMainSideMenuToggle: (
      state,
      action: PayloadAction<ISetMainSideMenuToggleAction>
    ) => {
      if (action.payload.isToggle !== null) {
        state.isMainSideMenuToggle = action.payload.isToggle!;
      } else {
        state.isMainSideMenuToggle = !state.isMainSideMenuToggle;
      }
    },
  },
});

export const { setIsMainSideMenuToggle } = toggleSlice.actions;
export default toggleSlice.reducer;