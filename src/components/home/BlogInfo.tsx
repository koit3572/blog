"use client";
import React from "react";
import { PiCalendarDuotone } from "react-icons/pi";
import { BsFileText } from "react-icons/bs";
import { useAppSelector } from "@/hooks/redux";
import { IconType } from "react-icons";

interface SideItemProps {
  Icon: IconType;
  title: string;
  count: number | null;
}
const SideItem: React.FC<SideItemProps> = ({ Icon, title, count }) => {
  return (
    <div className="flex h-[6rem] w-[50%] items-center justify-center gap-2 rounded-b-3xl bg-blog-white p-6 xl:h-[12rem] xl:w-full xl:flex-col xl:rounded-l-[0] xl:rounded-tr-3xl xl:pl-[60%]">
      <Icon className="pointer-events-none text-[1rem] font-bold sm:text-[1rem]" />
      <p className="flex flex-col items-center text-[0.5rem] font-bold sm:text-[1rem]">
        <span>
          {count ? count : "??"} {title === "총 포스팅" ? "개" : "일"}
        </span>
        <span>{title}</span>
      </p>
    </div>
  );
};
const BlogInfo = () => {
  const postLenght = Object.keys(
    useAppSelector((state) => state.postSlice.posts),
  ).length;
  return (
    <div className="relative flex w-[50rem] max-w-[calc(100%-3rem)] flex-col items-center xl:w-full">
      <div className="absolute left-[1rem] top-[-1rem] h-[20rem] w-full max-w-[100%] bg-gray-400 xl:left-[3.5rem] xl:top-[-5rem] xl:h-[25rem] xl:w-[40rem]" />
      <div className="left-[2.5rem] top-[-4rem] z-10 flex h-[20rem] w-full max-w-[100%] flex-col items-center justify-center gap-1 bg-gray-300 p-6 text-center xl:absolute xl:h-[25rem] xl:w-[40rem] xl:flex-row">
        <p className="text-[2rem] font-bold xl:text-[2.5rem]">
          블로그 방문을 진심으로 환영합니다.
        </p>
        <p className="text-[0.5rem] sm:text-[1rem] md:text-[1.5rem]">
          Web개발을 공부하며 습득해온 지식으로,
          <br /> 더욱 풍부하고 다양한 기억을 채워나갈 저의 두번째 뇌 입니다.
        </p>
      </div>
      <div className="flex w-full flex-row gap-2 px-4 xl:flex-col">
        <SideItem Icon={BsFileText} title={"총 포스팅"} count={postLenght} />
        <SideItem Icon={PiCalendarDuotone} title={"블로그 운영"} count={null} />
      </div>
    </div>
  );
};

export default BlogInfo;
