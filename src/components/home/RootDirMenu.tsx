"use client";
import { useAppSelector } from "@/hooks/redux";
import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getFormatText } from "@/lib/post";

import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";

const rootDirDiscription = {
  "1.개요":
    "IT분야에서 공통적으로 사용되는 용어나 기술같은 정보를 기록하고 정리해둔 폴더 입니다.",
  "2.마크업":
    "태그 등을 이용하여 문서나 데이터의 구조를 명시하는 언어인 마크업으로 구성된 언어를 기록하고 정리해둔 폴더 입니다.",
  "3.웹 스타일 언어":
    "웹페이지를 꾸미기 위한 스타일 시트 언어인 CSS와 SCSS, tailwindCSS등 스타일 도구들을 기록하고 정리해둔 폴더 입니다.",
  "4.스크립트 언어":
    "기존에 이미 존재하는 소프트웨어(애플리케이션)를 제어하기 위한 언어로 JavaScript, TypeScript에 대한 정보를 기록하고 정리해둔 폴더 입니다.",
  "5.모듈·라이브러리·프레임워크":
    "프론트엔드 개발시 필요한 도구들의 기본적인 사용 방법 및 특징을 기록하고 정리해둔 폴더입니다.",
  "6.API":
    "오픈소스 API와 같이 유용하고 쓸만한 API를 모아 기본적인 사용법 및 특징을 기록하고 정리해둔 폴더입니다.",
  "7.플랫폼":
    "프론트엔드 개발시 필요한 플랫폼의 사용 방법 및 특징을 기록하고 정리해둔 폴더 입니다.",
  "8.커스텀 코드":
    "공부하면서 습득한 기술들로 간단하게 만든 코드들을 정리해둔 폴더 입니다. 한가지의 기술만 응용해서 만든 코드는 해당 기술을 정리해둔 폴더에 있으며 해당 폴더에는 여러 기술이 합쳐진 코드만 있습니다.",
};
type RootDirDiscriptionType = keyof typeof rootDirDiscription;

const RootDirMenu = () => {
  const { menu } = useAppSelector((state) => state.postSlice);
  const rootDirNames = Object.keys(menu);
  const nextEl = useRef<HTMLDivElement>(null);
  const prevEl = useRef<HTMLDivElement>(null);
  const [subSwiper, setSubSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="flex w-[100vw] flex-col items-center justify-center gap-6">
      <h2 className="text-center text-[3rem] font-bold text-gray-200">
        블로그 상위 목차
      </h2>
      <div className="relative flex w-[100vw] flex-col items-center justify-center overflow-hidden bg-slate-800">
        <div className="absolute top-[-130%] h-[90rem] w-[90rem] rotate-3 rounded-[46%] bg-slate-400" />
        <div className="absolute top-[-130%] mr-24 h-[90rem] w-[90rem] rotate-12 rounded-[45%] bg-slate-600" />
        <div className="absolute top-[-130%] mr-32 h-[89rem] w-[89rem] rotate-90 rounded-[47%] bg-slate-800" />

        <div className="flex h-full w-[calc(900px*3)] max-w-[300vw] items-center justify-center text-center">
          <div className="main-swiper relative flex w-full">
            <Swiper
              className="relative h-full w-full"
              modules={[Navigation, Thumbs, Navigation]}
              navigation={{
                prevEl: prevEl.current,
                nextEl: nextEl.current,
              }}
              slidesPerView={3}
              centeredSlides={true}
              thumbs={{ swiper: subSwiper }}
              loop={true}
            >
              {rootDirNames.map((dirName, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }: { isActive: boolean }) => (
                    <div
                      className={`${
                        isActive ? "" : "opacity-40"
                      } flex h-[40rem] flex-col items-center justify-center text-gray-200`}
                    >
                      <h3 className="p-6 text-[2.5rem] font-bold">
                        {getFormatText(dirName)}
                      </h3>
                      <p className="w-[50%]">
                        {rootDirDiscription[dirName as RootDirDiscriptionType]}
                      </p>
                      <div className="flex h-[19rem] w-[45rem] max-w-[100vw] flex-wrap justify-center gap-2 overflow-y-auto p-10">
                        {(menu[dirName] as string[]).map((childDirName, i) => (
                          <Link
                            key={i}
                            href={`/blog/category/?category="${dirName}\\${childDirName}"`}
                            className="flex h-[6em] w-[6rem] items-center justify-center rounded-md bg-gray-300 font-bold text-[#333] hover:cursor-pointer"
                          >
                            {getFormatText(childDirName)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-[50%] z-[999] flex h-0 w-full justify-center">
              <div className="flex h-full w-[950px] max-w-[100vw] justify-between">
                <div
                  ref={prevEl}
                  className="z-30 h-[3.5rem] w-[3.5rem] text-[3.5rem] text-gray-200 hover:cursor-pointer"
                >
                  <IoMdArrowDropleft className="pointer-events-none" />
                </div>
                <div
                  ref={nextEl}
                  className="h-[3.5rem] w-[3.5rem] text-[3.5rem] text-gray-200 hover:cursor-pointer"
                >
                  <IoMdArrowDropright className="pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-[100vw] justify-center bg-slate-800 xl:flex">
        <Swiper
          className="h-[5rem] max-w-[900px] 2xl:w-[100vw] 2xl:max-w-[1300px]"
          modules={[FreeMode, Navigation, Thumbs]}
          onSwiper={setSubSwiper}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
        >
          {rootDirNames.map((dirName, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-full w-full items-center justify-center px-6 text-gray-200 hover:cursor-pointer">
                <h3 className="text-center text-[1rem] font-bold">
                  {getFormatText(dirName)}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RootDirMenu;
