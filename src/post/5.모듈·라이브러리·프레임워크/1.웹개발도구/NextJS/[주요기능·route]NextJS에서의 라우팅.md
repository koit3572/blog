---
title: '[주요기능·route]NextJS에서의 라우팅'
createdAt: "2024-07-09 14:15:44"
updatedAt: "2024-07-09 14:15:44"
discription: "Next.js 에서 라우팅을 하는 방법에 대한 정리"
tags: ['api','route','비동기']
isFavorite: false
---



# 사전준비
## 추후 정리 필요
- url : https://velog.io/@jay/Next.js-13-master-course-router-handler



# 사용 & 응용
## NextJS 13에서의 api routing 간단하게 사용하기
- jsonplaceholder는 테스트 및 프로토타입을 위한 샘플 데이터를 제공하는 무료 온라인 REST API 서비스이며, 해당 API를 통해 가져올 데이터를 서버에서 처리하여 component에서 사용하기 위한 코드이다.
- api routing을 간단하게 설명하기위해 사용한 코드로 아래와 같이 외부 api에서 요청을 하는 경우 굳이 api route를 사용하지 않고 getPhotos 비동기 함수에서 바로 요청하여도 똑같은 데이터를 받아올 수 있다. 
- API Routes를 사용하는 이유는 특정 API 요청을 처리하기 위한 전용 서버 사이드 라우트를 쉽게 생성할 수 있다.
### api 코드
- 경로 : src/app/api/photos/route.ts
```js
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    const url = "https://jsonplaceholder.typicode.com/photos"
    const photos = await fetch(url, {
      method: "GET",
      cache: "no-store"
    });
    const res = await photos.json()
    return NextResponse.json(res);
  } catch (error) {
    console.error(error)
  }
}
```
### 페이지 코드
- 경로 : src/app/(home)/page.tsx
```js
import { use } from "react";

export const getPhotos = async () => {
  try {
    const url = "http://localhost:3000/api/photos";
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    const photos = res.json()
    return photos
  } catch (error) {
    console.error(error)
  }
}
const Home = () => {
  const photos = use(getPhotos());
  console.log(photos);
  return (
    <div>

    </div>
  )
}
export default Home
```