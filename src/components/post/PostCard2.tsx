'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

interface IPostCard2Props {
  title: string;
  discription: string;
  createdAt: string;
  writer: string;
  fullPath: string;
}
const getFormatDiscription = (text:string) => {
  const discription = text || "해당 포스트에 대한 설명이 없습니다.";
  const isOverFlow = discription!.length > 160;
  const formatDiscription = isOverFlow
    ? discription.length === 160
      ? discription.substring(0, 160)
      : discription.substring(0, 160) + "..."
    : discription;
  return formatDiscription
}
const PostCard2: React.FC<IPostCard2Props> = ({
  title,
  discription,
  createdAt,
  writer,
  fullPath,
}) => {
  const router = useRouter();
  const handlerOnClickCard = () => {
    router.push(`/post/${decodeURI(fullPath)}`);
  };
  return (
    <div onClick={handlerOnClickCard} className="flex items-center justify-between gap-3 w-full h-[12rem] px-2 border-b-2 border-gray-400 hover:cursor-pointer">
      <div className="min-w-[10rem] min-h-[10rem] bg-gray-400"></div>
      <div className="w-[60%]">
        <h3 className="font-bold pb-2">{title}</h3>
        <p className="flex w-[592.79px] h-[108px] text-[1.2rem] overflow-hidden">
          {getFormatDiscription(discription)}
        </p>
      </div>
      <div className="text-[0.9rem] mt-6 mb-[auto]">
        <p>작성일 : {createdAt}</p>
        <p>작성자 : {writer}</p>
      </div>
    </div>
  );
};

export default PostCard2