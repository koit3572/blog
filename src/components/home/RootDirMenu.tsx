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
import path from "path";
import { ROOTMENU_DESCRIPTION } from "@/constent";

type RootDirDiscriptionType = keyof typeof ROOTMENU_DESCRIPTION;

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
        <div className="absolute top-[-130%] h-[77rem] w-[77rem] rotate-3 rounded-[46%] bg-slate-400" />
        <div className="absolute top-[-130%] mr-24 h-[76rem] w-[76rem] rotate-12 rounded-[45%] bg-slate-600" />
        <div className="absolute top-[-130%] mr-32 h-[75rem] w-[75rem] rotate-90 rounded-[47%] bg-slate-800" />

        <div className="flex h-full w-[calc(50rem*3)] max-w-[300vw] items-center justify-center text-center">
          <div className="main-swiper relative flex w-full">
            <Swiper
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
                      } flex h-[35rem] flex-col items-center justify-center pt-12 text-gray-200`}
                    >
                      <h3 className="p-6 text-[2.5rem] font-bold">
                        {getFormatText(dirName)}
                      </h3>
                      <p className="w-[50%]">
                        {
                          ROOTMENU_DESCRIPTION[
                            dirName as RootDirDiscriptionType
                          ]
                        }
                      </p>
                      <div className="flex h-[19rem] w-[45rem] max-w-[100vw] flex-wrap justify-center gap-2 overflow-y-auto p-10">
                        {(menu[dirName] as string[]).map((childDirName, i) => (
                          <Link
                            key={i}
                            href={`/blog/category/?category=${path.join(dirName, childDirName)}`}
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
              <div className="flex h-full w-[50rem] max-w-[100vw] justify-between">
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

      <div className="flex h-[5rem] w-[100vw] justify-center bg-slate-800">
        <Swiper
          className="h-full w-full max-w-[60rem] xl:max-w-[90rem]"
          modules={[FreeMode, Navigation, Thumbs]}
          onSwiper={setSubSwiper}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
        >
          {rootDirNames.map((dirName, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-full w-full items-center justify-center px-6 text-gray-200 hover:cursor-pointer">
                <h3 className="text-center text-[0.7rem] font-bold xl:text-[1rem]">
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
