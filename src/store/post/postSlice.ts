import { IMainSideBarData } from "@/app/api/route";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PostData {
  title: string;
  discription: string;
  writer: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  content?: string;
  isFavorite: boolean;
}
export const testPostData: PostData = {
  title: "title",
  discription: "discription",
  writer: "writer",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  tags: ["tags"],
  content: "content",
  isFavorite: false,
};
interface IPostData {
  postFolderStructure: IMainSideBarData;
  posts: {
    [postPath: string]: PostData;
  };
}
interface IInitialState {
  postData: IPostData;
  isLoading: boolean;
  error: string;
}
const initialState: IInitialState = {
  postData: {} as IPostData,
  isLoading: true,
  error: "",
};
export const fetchPost = createAsyncThunk(
  'post/fetchPost',
  async (_, thunkAPI) => {
    try {
      const res = await fetch("api", {
        method: "GET",
        cache: "no-store",
      });
      if (!res) {
        throw new Error('error response is empty')
      }
      const postData = await res.json();
      return postData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error loading fetchPost");
    }
  }
)

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postData = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export default postSlice.reducer;