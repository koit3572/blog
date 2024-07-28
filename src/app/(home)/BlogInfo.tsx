'use client'
import React from 'react'
import { PiCalendarDuotone } from "react-icons/pi";
import { BsFileText } from "react-icons/bs";
import { useAppSelector } from '@/hooks/redux';
const BlogInfo = () => {
  const postPaths = Object.keys(useAppSelector(state => state.postSlice.postData.posts))
  const postLenght = postPaths.length
  return (
    <div className="relative w-full h-[25rem]">
      <div className="absolute z-10 top-[-3rem] left-[3.5rem] w-[35rem] h-[20rem] bg-gray-400" />
      <div className="absolute z-10 top-[-4rem] left-[2.5rem] flex items-center gap-2 w-[35rem] h-[20rem] p-3 px-6 bg-gray-300 text-center">
        <p className="text-[3rem] font-bold text-shadow-border">
          블로그 방문을 진심으로 환영합니다.
        </p>
        <p>
          Web개발을 공부하며 습득해온 지식으로,
          <br /> 더욱 풍부하고 다양한 기억을 채워나갈 저의 두번째 뇌 입니다.
        </p>
      </div>
      <div className="absolute right-0 w-full h-[12rem] bg-gray-200 rounded-r-2xl">
        <div className="absolute right-0 flex flex-col justify-center items-center w-[30rem] h-full">
          <div>
            <BsFileText />
          </div>
          <p>{postLenght} 개</p>
          <p>총 포스팅</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full h-[12rem] bg-gray-200 rounded-r-2xl">
        <div className="absolute right-0 flex flex-col justify-center items-center w-[30rem] h-full">
          <div>
            <PiCalendarDuotone />
          </div>
          <p>?? 일</p>
          <p>블로그 운영</p>
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;