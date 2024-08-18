"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
// import temporasryProfilePicture from "../../../public/jpg/temporary_profile_picture.jpg"
import Link from "next/link";
import { BsFilePersonFill } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import gsap from "gsap";
import getRandom from "@/utils/getRandom";

const MyResume = () => {
  const firstFloatEl = useRef<HTMLAnchorElement>(null);
  const secondFloatEl = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const floatingList = [
      { el: firstFloatEl.current, delay: 10, size: 25 },
      { el: secondFloatEl.current, delay: 5, size: 22 },
    ];
    floatingList.forEach((floating) => {
      gsap.to(floating.el, {
        duration: getRandom(1.5, 2),
        y: floating.size,
        repeat: -1,
        yoyo: true,
        ease: "Power1.easeInOut",
        delay: getRandom(0, floating.delay / 10),
      });
    });
  }, []);
  return (
    <div className="relative h-[60rem] w-[100vw]">
      <div className="absolute flex h-full w-[100vw] justify-center">
        <div className="absolute right-0 h-full w-[calc(50%+20rem)] rounded-tl-[450px] bg-slate-800" />
        <div className="relative h-full w-[1100px] overflow-hidden">
          <div className="absolute left-0 right-0 top-[5rem] z-10 m-auto h-[45rem] w-[40rem] max-w-[80%] bg-gray-300 p-4 xl:left-[40%] xl:top-[10rem] 2xl:h-[35rem] 2xl:w-[30rem]">
            <div className="relative flex h-full w-full bg-white">
              {/* <Image
                  width={1000}
                  height={1000}
                  src={temporasryProfilePicture}
                  placeholder="blur"
                  alt="temporary_profile_picture"
                /> */}
              <div className="block xl:hidden">
                <Link
                  className="absolute left-[-2.5rem] top-[1rem] z-10 flex items-center justify-center bg-slate-100"
                  href={"/#"}
                  target="_blank"
                >
                  <div className="h-[4.5rem] w-[3rem] bg-slate-900" />
                  <div className="p-3">
                    <BsFilePersonFill className="text-[1.5rem]" />
                    <p>KoIT의 이력서</p>
                  </div>
                </Link>
                <Link
                  className="absolute left-[-2.5rem] top-[6.5rem] z-10 flex items-center justify-center bg-slate-100"
                  href={"https://github.com/koit3572"}
                  target="_blank"
                >
                  <div className="h-[4.5rem] w-[3rem] bg-slate-900" />
                  <div className="p-3">
                    <IoLogoGithub className="text-[1.5rem]" />
                    <p>KoIT의 Github</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden xl:block">
            <Link
              ref={firstFloatEl}
              className="absolute left-[0] z-0 flex h-[25rem] w-[25rem] flex-col items-center justify-center rounded-[50%] bg-slate-100 xl:left-[10rem]"
              href={"/#"}
              target="_blank"
            >
              <BsFilePersonFill className="text-[5rem]" />
              <p>KoIT의 이력서</p>
            </Link>
            <Link
              ref={secondFloatEl}
              className="absolute top-[25rem] z-0 flex h-[20rem] w-[20rem] flex-col items-center justify-center rounded-[50%] bg-slate-100 xl:left-[5rem]"
              href={"https://github.com/koit3572"}
              target="_blank"
            >
              <IoLogoGithub className="text-[5rem]" />
              <p>KoIT의 Github</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResume;
