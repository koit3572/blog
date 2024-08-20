"use client";
import React from "react";
import { PostInfo } from "@/types/post";
import { useRouter } from "next/navigation";
import Tooltip from "./Tooltip";
export interface IPostCardProps {
  postCardData: PostInfo;
  fullPath: string;
}
const PostCard: React.FC<IPostCardProps> = ({ postCardData, fullPath }) => {
  const router = useRouter();
  const handlerOnClickCard = () => {
    router.push(
      `/blog/post?path=${decodeURI(fullPath.replaceAll("&", "%26"))}`,
    );
  };
  return (
    <div className="relative h-[15rem] w-full rounded-lg bg-blog-white transition-transform duration-300 hover:z-10 hover:scale-105 hover:cursor-pointer">
      <div className="flex p-4" onClick={() => handlerOnClickCard()}>
        <div className="absolute right-[0.6rem] top-[0.8rem]">
          <Tooltip
            target={
              <div className="m-1 flex w-[1rem] flex-col items-center gap-[0.15rem] hover:cursor-pointer">
                <div className="h-[0.3rem] w-[0.3rem] rounded-full bg-gray-400" />
                <div className="h-[0.3rem] w-[0.3rem] rounded-full bg-gray-400" />
                <div className="h-[0.3rem] w-[0.3rem] rounded-full bg-gray-400" />
              </div>
            }
            contents={
              <>
                <p className="border-b-[0.1rem] border-b-gray-200 p-1">
                  작성자 <br /> {postCardData.writer}
                </p>
                <p className="border-b-[0.1rem] border-b-gray-200 p-1">
                  작성일시 <br /> {postCardData.createdAt}
                </p>
                <div className="p-1">
                  <h4>tags</h4>
                  <div className="text-[0.6rem] font-bold">
                    {postCardData.tags.map((tag, i) => (
                      <div
                        key={i}
                        className="m-[0.1rem] inline-block rounded-lg bg-gray-200 px-[0.4rem] py-[0.15rem] text-slate-800"
                      >
                        # {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
          />
        </div>
        <div className="full h-[13rem] w-[13rem] bg-slate-200">
          {/* 추후 이미지 추가 */}
        </div>
        <div className="flex w-[calc(100%-12rem)] flex-col p-2">
          <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[1.8rem] font-[600]">
            {postCardData.title}
          </h2>
          <p>{postCardData.createdAt}</p>
          <p className="break-words text-[1.2rem]">
            {postCardData.discription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
