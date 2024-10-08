"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import temporasryProfilePicture from "../../../public/jpg/temporary_profile_picture.jpg";
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
      <div className="absolute flex h-full w-full justify-center">
        <div className="absolute right-0 h-full w-[calc(50%+20rem)] rounded-tl-[30rem] bg-slate-800" />
        <div className="relative h-full w-[60rem] overflow-hidden">
          <div className="absolute left-0 right-0 top-[5rem] z-10 m-auto h-full max-h-[40rem] w-[35rem] max-w-[calc(100vw-3rem)] bg-gray-300 p-4 xl:left-[40%] xl:top-[10rem] 2xl:h-[35rem] 2xl:w-[30rem]">
            <div className="relative flex h-full w-full bg-white">
              <Image
                src={temporasryProfilePicture}
                placeholder="blur"
                alt="temporary_profile_picture"
              />
            </div>
          </div>
          <Link
            ref={firstFloatEl}
            className="absolute left-[0.5rem] top-[27rem] z-10 flex h-[20rem] w-[20rem] flex-col items-center justify-center rounded-[50%] bg-slate-100 xl:left-[10rem] xl:top-0 xl:h-[25rem] xl:w-[25rem]"
            href={"/#"}
            target="_blank"
          >
            <BsFilePersonFill className="text-[5rem]" />
            <p>KoIT의 이력서</p>
          </Link>
          <Link
            ref={secondFloatEl}
            className="absolute bottom-[5rem] right-[1rem] z-10 flex h-[15rem] w-[15rem] flex-col items-center justify-center rounded-[50%] bg-slate-100 xl:left-[5rem] xl:top-[27rem] xl:h-[20rem] xl:w-[20rem]"
            href={"https://github.com/koit3572"}
            target="_blank"
          >
            <IoLogoGithub className="text-[5rem]" />
            <p>KoIT의 Github</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyResume;
