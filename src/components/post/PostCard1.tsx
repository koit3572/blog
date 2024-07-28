'use client'
import React from 'react'
import Tooltip from '../Tooltip';
import { PostData } from '@/store/post/postSlice';
import { useRouter } from 'next/navigation';
export interface IPostCardProps {
  postCardData: PostData;
  fullPath: string;
}
const PostCard1: React.FC<IPostCardProps> = ({ postCardData, fullPath }) => {
  const router = useRouter();
  const handlerOnClickCard = () => {
    router.push(`/post/${fullPath}`)
  };
  return (
    <div className="relative w-full h-[15rem] bg-gray-200 hover:cursor-pointer hover:scale-105 transition-transform duration-300 hover:z-[40] rounded-lg">
      <div className="absolute top-[0.8rem] right-[0.6rem]">
        <Tooltip
          target={
            <div className=" flex flex-col gap-[0.15rem] items-center w-[1rem] hover:cursor-pointer">
              <div className="w-[0.22rem] h-[0.25rem] bg-gray-400 rounded-full" />
              <div className="w-[0.22rem] h-[0.25rem] bg-gray-400 rounded-full" />
              <div className="w-[0.22rem] h-[0.25rem] bg-gray-400 rounded-full" />
            </div>
          }
          contents={
            <>
              <p className="p-1 border-b-[0.1rem] border-b-gray-200">
                작성자 <br /> {postCardData.writer}
              </p>
              <p className="p-1 border-b-[0.1rem] border-b-gray-200">
                작성일시 <br /> {postCardData.createdAt}
              </p>
              <div className="p-1">
                <h4>tags</h4>
                <div className="text-[0.6rem] font-bold">
                  {postCardData.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="inline-block m-[0.1rem] px-[0.4rem] py-[0.15rem] bg-gray-200 rounded-lg text-slate-800"
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
      <div className="flex p-4" onClick={() => handlerOnClickCard()}>
        <div className="full w-[13rem] h-[13rem] bg-gray-300">
          {/* 추후 이미지 추가 */}
        </div>
        <div className="flex flex-col w-[calc(100%-12rem)] p-2">
          <h2 className="text-[1.8rem] font-[600] text-nowrap overflow-ellipsis overflow-hidden">
            {postCardData.title}
          </h2>
          <p>{postCardData.updatedAt}</p>
          <p className="text-[1.2rem] break-words">
            {postCardData.discription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard1