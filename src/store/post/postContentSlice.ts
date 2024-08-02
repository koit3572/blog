import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import matter from "gray-matter";
import path from "path";

interface IInitialState {
  postContent: string;
  isLoading: boolean;
  error: string;
}
const initialState: IInitialState = {
  postContent: "",
  isLoading: true,
  error:""
}
export const fetchPostContent = createAsyncThunk(
  'post/fetchPostContent',
  async (url:string, thunkAPI) => {
    try {
      const fullUrl = `api${url}`;
      const res = await fetch(fullUrl, {
        method: "GET",
        cache: "no-store",
      });
      if (!res) {
        throw new Error("error response is empty");
      }
      const postData = await res.json();
      return postData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error loading fetchPostContent")
    }
  }
)
const postContentSlice = createSlice({
  name: "postContent",
  initialState,
  reducers: {
    removePostContent: (state) => {
      state.postContent = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPostContent.fulfilled,
        (state, action: PayloadAction<matter.GrayMatterFile<string>>) => {
          state.isLoading = false;
          state.postContent = action.payload.content;
        }
      )
      .addCase(fetchPostContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default postContentSlice.reducer;
export const { removePostContent } = postContentSlice.actions;