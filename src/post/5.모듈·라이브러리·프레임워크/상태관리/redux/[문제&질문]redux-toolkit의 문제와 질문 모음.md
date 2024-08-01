---
title: '[문제&질문]redux-toolkit의 문제와 질문 모음'
createdAt: "2024-07-03 12:51:52"
updatedAt: "2024-07-03 12:51:5"
discription: "redux-persist메서드를 사용할 때 발생하는 문제나 질문들을 모아 해결방법을 기록"
tags: ['error','에러','ap-style','오류','suppressHydrationWarning']
isFavorite: false
---
# 문제 & 질문
## 문제 & 질문 리스트
### 문제
|문제|설명|
|--|--|
|Error|redux-persist failed to create sync storage. falling back to noop storage|

## redux-persist failed to create sync storage. falling back to noop storage
### 문제직시
- SSR을 적용하고 나서, redux-persist가 서버사이드에서 동작할 때 발생
### 해결방안
- 서버사이드에서 정상 작동하도록 다음과 같은 코드를 redux 폴더 내 store.tsx 파일에 추가
```ts
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
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

const rootPersistConfig = {
  key: 'root', // root에서부터 저장"
  storage, // storage = localStorage
  // blacklist: ['question'],
};
```