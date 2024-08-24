"use client";
import { PostInfo } from "@/types/post";
import React, { useState } from "react";
import Pagination from "../Pagination";
import PostCard from "./PostCard";

interface PostListContainerProps {
  postList: {
    [postPath: string]: PostInfo;
  } | null;
  mainTitle: string;
  subTitle?: string;
}
interface TriangleDivProps {
  tailwindCss: string;
}
const TriangleDiv: React.FC<TriangleDivProps> = ({ tailwindCss }) => (
  <div
    className={`${tailwindCss} border-b-[1rem] border-t-0 border-x-transparent`}
  />
);
const PostListContainer: React.FC<PostListContainerProps> = ({
  postList,
  mainTitle,
  subTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  return (
    <div className="h-[50rem] w-[70rem] max-w-[calc(100vw-3rem)] overflow-hidden xl:h-[65rem]">
      <div className="relative flex w-full flex-col items-center">
        <div className="relative flex h-[10rem] w-full justify-center rounded-t-3xl bg-slate-400">
          <TriangleDiv
            tailwindCss={
              "absolute bottom-0 h-[1.5rem] border-slate-700 border-x-[35rem]"
            }
          />
        </div>
        <TriangleDiv
          tailwindCss={"z-10 h-[1.5rem] border-slate-800 border-x-[35rem]"}
        />
        <div className="absolute top-[2rem] flex h-[10rem] w-[85%] flex-col items-center justify-center rounded-t-3xl bg-slate-300 pb-[1.5rem]">
          <h3 className="text-[1.5rem] font-bold lg:text-[2rem] xl:text-[2.5rem]">
            {mainTitle}
          </h3>
        </div>
        <div className="z-10 flex h-[5rem] w-full items-center justify-center bg-slate-800 px-6 pb-[0.75rem]">
          <p className="text-blog-white">{subTitle}</p>
        </div>
      </div>
      <div className="h-[calc(100%-16.5rem)] w-full rounded-b-3xl bg-slate-200">
        {postList ? (
          <>
            <div className="h-[calc(100%-6rem)] w-full rounded-b-2xl bg-gray-200 p-[3rem] text-[1.5rem]">
              {Object.keys(postList)!
                .slice((currentIndex - 1) * 3, (currentIndex - 1) * 3 + 3)
                .map((postData, i) => {
                  return (
                    <PostCard
                      key={i}
                      title={postList[postData].title.replace(/\[.+\]/, "")}
                      category={postList[postData].category}
                      discription={postList[postData].discription}
                      createdAt={postList[postData].createdAt}
                      writer={postList[postData].writer}
                      fullPath={postData}
                    />
                  );
                })}
            </div>
            <div className="flex w-full justify-center p-[2rem]">
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
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <p className="text-[2.5rem] font-bold">{mainTitle}이 없습니다...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListContainer;
