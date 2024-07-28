'use client'
import { PostData } from '@/store/post/postSlice';
import React, { useState } from 'react'
import PostCard2 from './PostCard2';
import Pagination from '../Pagination';
import { getFullPath, getPostTitleformat } from '@/lib/post';
interface IPostContainerStyle1Props {
  postList: {
    [postPath: string]: PostData;
  } | null;
  mainTitle: string;
  subTitle?: string;
}
const PostContainerStyle1: React.FC<IPostContainerStyle1Props> = ({
  postList,
  mainTitle,
  subTitle,
}) => {
  const [currentIndex,setCurrentIndex] = useState<number>(1)
  return (
    <div className="relative flex justify-center w-full h-full">
      <div className="flex flex-col justify-center w-[1100px] h-full ">
        <div className="relative flex justify-center w-full h-[15rem]">
          <div className="absolute z-10 top-[6rem] w-[60rem] h-[12rem] bg-gray-200 rounded-3xl">
            <h2 className="block p-10  text-[3rem] text-center font-bold text-slate-700">
              {mainTitle}
            </h2>
          </div>
          <div className="absolute top-[4rem] w-full h-[calc(100%-3rem)] bg-slate-400 rounded-t-2xl"></div>
          <div className="absolute bottom-[-1rem] w-full h-[3.5rem] border-solid border-transparent border-b-slate-700 border-b-[3.5rem] border-t-0 border-l-[550px] border-r-[550px]" />
        </div>
        <div className="relative z-10 top-[-1.5rem] w-full h-[10rem]">
          <div className="absolute top-0 w-[1100px] h-[3.5rem] border-solid border-transparent border-b-slate-800 border-b-[3.5rem] border-t-0 border-l-[550px] border-r-[550px]" />
          <div className="absolute top-[4.3rem] w-full h-[calc(100%-5rem)] bg-gray-400 rounded-b-2xl" />
          <div className="absolute top-[3.5rem] w-full h-[calc(100%-5rem)] bg-slate-800 rounded-b-2xl">
            <h2 className="flex justify-center items-center h-full pb-[1.5rem] text-[2rem] text-center text-gray-100">
              {subTitle}
            </h2>
          </div>
        </div>
        <div className="relative w-full h-[45rem]">
          {postList === null && (
            <div className="absolute top-[-3rem] flex justify-center items-center w-full h-full rounded-b-2xl bg-gray-200">
              <p className="font-bold text-[2.5rem]">
                {mainTitle}이 없습니다...
              </p>
            </div>
          )}
          {postList && (
            <>
              <div className="absolute top-[-3rem] w-full h-full p-[3rem] rounded-b-2xl bg-gray-200 text-[1.5rem]">
                {Object.keys(postList)!
                  .slice((currentIndex - 1) * 3, (currentIndex - 1) * 3 + 3)
                  .map((postData, i) => {
                    return (
                      <PostCard2
                        key={i}
                        title={getPostTitleformat(postData)}
                        discription={postList[postData].discription}
                        createdAt={postList[postData].createdAt}
                        writer={postList[postData].writer}
                        fullPath={postData}
                      />
                    );
                  })}
              </div>
              <div className="absolute bottom-[3rem] flex justify-center w-full p-[2rem] ">
                <Pagination
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  itemlength={Math.ceil(Object.keys(postList).length / 3)}
                  maxPaginationNum={10}
                  style={{
                    paginationController: {
                      common: "font-bold hover:cursor-pointer text-slate-500",
                    },
                    paginationNumber: {
                      isActive: "text-slate-800 scale-[1.1]",
                      noActive: "text-slate-500",
                    },
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContainerStyle1