'use client'
import { useAppSelector } from '@/hooks/redux';
import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css'
import "swiper/scss/navigation";
import { removeNumbering } from '@/lib/post';

import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import Link from 'next/link';

const rootDirDiscription = {
  '1.개요': "IT분야에서 공통적으로 사용되는 용어나 기술같은 정보를 기록하고 정리해둔 폴더 입니다.",
  '2.마크업': '태그 등을 이용하여 문서나 데이터의 구조를 명시하는 언어인 마크업으로 구성된 언어를 기록하고 정리해둔 폴더 입니다.',
  "3.웹 스타일 언어": "웹페이지를 꾸미기 위한 스타일 시트 언어인 CSS와 SCSS, tailwindCSS등 스타일 도구들을 기록하고 정리해둔 폴더 입니다.",
  "4.스크립트 언어": "기존에 이미 존재하는 소프트웨어(애플리케이션)를 제어하기 위한 언어로 JavaScript, TypeScript에 대한 정보를 기록하고 정리해둔 폴더 입니다.",
  "5.모듈·라이브러리·프레임워크": "프론트엔드 개발시 필요한 도구들의 기본적인 사용 방법 및 특징을 기록하고 정리해둔 폴더입니다.",
  "6.API": "오픈소스 API와 같이 유용하고 쓸만한 API를 모아 기본적인 사용법 및 특징을 기록하고 정리해둔 폴더입니다.",
  "7.플랫폼": "프론트엔드 개발시 필요한 플랫폼의 사용 방법 및 특징을 기록하고 정리해둔 폴더 입니다.",
  "8.커스텀 코드": "공부하면서 습득한 기술들로 간단하게 만든 코드들을 정리해둔 폴더 입니다. 한가지의 기술만 응용해서 만든 코드는 해당 기술을 정리해둔 폴더에 있으며 해당 폴더에는 여러 기술이 합쳐진 코드만 있습니다."
}
type RootDirDiscriptionType = keyof typeof rootDirDiscription

const RootDirMenu = () => {
  const { postFolderStructure } = useAppSelector(state => state.postSlice.postData)
  const rootDirNames = Object.keys(postFolderStructure)
  const nextEl = useRef<HTMLDivElement>(null);
  const prevEl = useRef<HTMLDivElement>(null);
  const [subSwiper, setSubSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="relative flex justify-center w-full h-full">
      <div className="absolute top-[9.5rem] w-[100vw] h-[45rem] bg-gray-800 overflow-hidden">
        <div className="relative flex justify-center w-full h-full opacity-30 rotate-12">
          <div className="absolute top-[-130%] w-[90rem] h-[90rem] bg-slate-200 rounded-[46%] rotate-3" />
          <div className="absolute top-[-130%] w-[90rem] h-[90rem] mr-24 bg-slate-400 rounded-[45%] rotate-12" />
          <div className="absolute top-[-130%] w-[89rem] h-[89rem] mr-32 bg-gray-800 rounded-[47%] rotate-90" />
        </div>
      </div>
      <div className="w-[calc(900px*3)] h-[60rem] text-center">
        <h2 className="block p-10 text-[3rem] font-bold text-gray-200">
          블로그 상위 목차
        </h2>
        <div className="main-swiper relative w-[calc(900px*3)]">
          <Swiper
            className="w-full h-full"
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
                      isActive ? "" : "opacity-40 "
                    }flex flex-col justify-center items-center h-[45rem] text-gray-200`}
                  >
                    <h3 className="font-bold text-[2.5rem] p-6">
                      {removeNumbering(dirName)}
                    </h3>
                    <p className="w-[50%]">
                      {rootDirDiscription[dirName as RootDirDiscriptionType]}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center pt-10 overflow-y-auto">
                      {Object.keys(postFolderStructure[dirName]).map(
                        (childDirName, i) => (
                          <Link
                            key={i}
                            href={`/post/${dirName}?choice=${childDirName}`}
                            className="flex justify-center items-center w-[8rem] h-[8rem] rounded-md bg-gray-300 text-[#333] font-bold hover:cursor-pointer"
                          >
                            {removeNumbering(childDirName)}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
            <div
              ref={prevEl}
              className="absolute z-10 top-[20rem] right-[55rem] text-[3.5rem] text-gray-200 hover:cursor-pointer"
            >
              <IoMdArrowDropright className="pointer-events-none" />
            </div>
            <div
              ref={nextEl}
              className="absolute z-10 top-[20rem] left-[55rem] text-[3.5rem] text-gray-200 hover:cursor-pointer"
            >
              <IoMdArrowDropleft className="pointer-events-none" />
            </div>
          </Swiper>
        </div>
      </div>
      <div className="absolute bottom-[-6rem] flex justify-center w-full h-[10rem]">
        <div className="absolute w-[100vw] h-[7rem] bg-gray-800" />
        <div className="w-[100vw] h-[15rem] max-w-[calc(1300px)] transition-[padding] duration-700">
          <Swiper
            modules={[FreeMode, Navigation, Thumbs]}
            onSwiper={setSubSwiper}
            slidesPerView={8}
            freeMode={true}
            watchSlidesProgress={true}
          >
            {rootDirNames.map((dirName, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center items-center h-[7rem] px-6 bg-gray-800 text-gray-200 hover:cursor-pointer">
                  <h3 className="font-bold text-[1rem] text-center">
                    {removeNumbering(dirName)}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default RootDirMenu