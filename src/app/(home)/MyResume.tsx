'use client'
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import temporasryProfilePicture from "../../../public/jpg/temporary_profile_picture.jpg"
import Link from 'next/link';
import { BsFilePersonFill } from 'react-icons/bs';
import { IoLogoGithub } from 'react-icons/io5';
import gsap from 'gsap';
import getRandom from '@/utils/getRandom';
const MyResume = () => {
  const firstFloatEl = useRef<HTMLAnchorElement>(null);
  const secondFloatEl = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const floatingList = [
      { el: firstFloatEl.current, delay: 10, size: 15 },
      { el: secondFloatEl.current, delay: 5, size: 12 },
    ];
    floatingList.forEach((floating) => {
      gsap.to(floating.el, {
        duration: getRandom(1.5, 2.5),
        y: floating.size,
        repeat: -1,
        yoyo: true,
        ease: "Power1.easeInOut",
        delay: getRandom(0, floating.delay / 10),
      });
    })
  },[])
  return (
    <div className="relative flex justify-center w-full h-[23rem] mt-[15rem]">
      <div className="absolute right-0 bottom-[-20rem] h-[1000px] w-[39vw] bg-gray-800" />
      <div className="absolute w-[1100px] h-full">
        <div className="absolute left-[10rem] bottom-[-20rem] h-[1000px] w-[60vw] bg-gray-800 rounded-tl-[450px]" />
        <div className="absolute z-10 top-[-6rem] right-0 w-[30rem] h-[36rem] ml-[2rem] bg-gray-400" />
        <div className="absolute z-10 top-[-7rem] right-[1rem] w-[30rem] h-[36rem] p-4 bg-gray-300">
          <div className="flex items-center w-full h-full bg-white">
            <Image
              width={1000}
              height={1000}
              src={temporasryProfilePicture}
              placeholder="blur"
              alt="temporary_profile_picture"
            />
          </div>
        </div>
        <div>
          <Link
            ref={firstFloatEl}
            className="absolute top-[-10rem] left-[15rem] flex flex-col justify-center items-center w-[25rem] h-[25rem] rounded-[50%] bg-slate-100 "
            href={"/#"}
            target="_blank"
          >
            <BsFilePersonFill className="text-[5rem]" />
            <p>KoIT의 이력서</p>
          </Link>
          <Link
            ref={secondFloatEl}
            className="absolute top-[10rem] left-0 flex flex-col justify-center items-center w-[20rem] h-[20rem] rounded-[50%] bg-slate-100"
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
}

export default MyResume