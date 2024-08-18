---
title: '[ReduxToolkit·메서드]createAsyncThunk'
createdAt: "2024-06-08 16:00:19"
updatedAt: "2024-06-08 16:00:19"
discription: "비동기 Action 처리를 위함 함수로 pending, fulfilled, rejected 속성을 통해 case에 따라 데이터를 처리할 수 있는 redux-toolkit 메서드이다."
tags: ['상태관리','redux-toolkit','비동기','async/await','redux']
isFavorite: false
---
# 사전 준비
## 지식
|용어|설명|
|--|--|
|thunk|특정 작업을 나중에 하도록 미루기 위해 함수 형태로 감싼것을 지칭한다.|
|dispatch(디스패치)|어떤 메서드를 호출할 것인지를 결정 및 실행하는 과정|
## 설치
- Redux에서 비동기 처리를 위해서는 redux-thunk 미들웨어를 설치하고 추가해주어야 한다.
- 그러나 Redux Toolkit에는 기본적으로 thunk middleware가 추가되어있기 떄문에 별다른 설치가 필요 없다.
## createAsyncThunk란
- 비동기 Action 처리를 위함 함수로 pending, fulfilled, rejected 속성을 통해 case에 따라 데이터를 처리할 수 있는 redux-toolkit 메서드이다.



# 사용 & 응용 
## createAsyncThunk를 통한 thunk 생성
- Role
  - parameter 로 받은 typePrefix 를 기반으로 프로미스 라이프사이클 액션 타입을 생성한다.
  - parameter 로 받은 promise callback 을 실행하고, promise 를 기반으로 라이프 사이클 액션을 dispatch 하는 action creator 를 반환한다.
  - createAsyncThunk 입장에서는 사용자가 데이터를 어떻게 처리할 지 모르기 때문에 reducer 함수를 생성하지는 않는다.
- parameter
  - typePrefix('data/fetchData')
    - 액션 타입의 문자열
    - 해당값을 기반으로 액션타입이 생성되어 reducer로 들어간다.
      - pending: data/getRecentPosts/pending
      - fulfilled: data/getRecentPosts/fulfilled
      - rejected: data/getRecentPosts/rejected
  - payloadCreator(async(_,thunkAPI)=>{...})
    - 프로미스를 반환하는 비동기 함수
- return
  - action creator을 반환한다.
    - pending : 비동기 함수가 실행될 때 디스패치하는 action creator
    - fulfilled : 비동기 함수의 실행이 완료되었을 떄 디스패치하는 action creator
    - rejected: 비동기 함수 실행중 Error발생시 디스패치하는 action creator
```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async(_,thunkAPI) => {
    try {
      const res = await fetch("https://...",)
      if (!res) {
        throw new Error('error response is empty')
      } else {
        const data = res.json();
        return data
      }
    }
    catch(error){
      return thunkAPI.rejectWithValue('Error loading data')
    }
  }
)
```
## 생성된 thunck slice에 적용
- Role
  - createSlice 의 extraReducers 함수를 이용해, builder 에 각 상황에 대한 리듀서를 추가해주어야 한다.
  - fulfiled 시 데이터는 action.payload 로 들어오고, rejected 시 action.error 로 들어오며 payload 는 undefined 이다.
```ts
const initialState: IInitialState = {
  postData: "";
  isLoading: true,
  error: "",
};
import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
```
