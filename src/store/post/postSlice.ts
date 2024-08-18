import { ApiResApp, IInitialState, IMenu } from "@/types/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: IInitialState = {
  posts: {},
  menu: {} as IMenu,
  error: "",
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<ApiResApp>) => {
      state.posts = action.payload.posts;
      state.menu = action.payload.menu;
      state.error = action.payload.error;
    },
  },
  extraReducers: () => ({
    [HYDRATE]: (state: IInitialState, action: PayloadAction<any>) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.post,
      };
    },
  }),
});

export const { setPostData } = postSlice.actions;
export default postSlice.reducer;
