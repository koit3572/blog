---
title: 'skeleton version 1'
createdAt: "2024-07-10 12:11:09"
updatedAt: "2024-07-10 12:11:09"
discription: "skeleton version 1 커스텀 component로 은 보편적인 스켈레톤 애니메이션인 블러처리된 세로선이 좌에서 우로 흐르는 움직임을 구현하였다."
tags: ['loading','component의','skeleton','스켈레톤']
isFavorite: false
---
# 사전준비
## 설치
```npm
$ npm install gsap
```
## skeleton 사용 기준
- 
# 사용 & 응용
```js
'use client'
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
interface ISkeletonProps {
  width: number;
  height: number;
}
const Skeleton: React.FC<ISkeletonProps> = ({
  width,
  height,
}) => {
  const skeletonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(skeletonRef.current, 2.5, {
      x: width*2,
      repeat: -1,
    });
  },[])
  return (
    <div
      className="relative bg-gray-300 overflow-hidden"
      style={{ width, height }}
    >
      <div
        ref={skeletonRef}
        style={{ width: width * 2, height }}
        className="absolute left-[-150%] bg-gradient-to-r from-gray-300 from-[25%] via-gray-100 via-[50%] to-gray-300 to-[75%]"
      />
    </div>
  );
};

export default Skeleton
```