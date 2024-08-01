'use client'
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import React, { useEffect, useRef } from 'react'
import * as _ from 'lodash'
import { FaArrowUp } from "react-icons/fa";
gsap.registerPlugin(ScrollToPlugin);
const ScrollTo = () => {
  const scrollToRef = useRef<HTMLDivElement>(null);
  const listener = () => {
    if (window.scrollY > 200) {
      gsap.to(scrollToRef.current!, {
        duration: 0.6,
        translateX: "-12rem",
      });
    } else {

      gsap.to(scrollToRef.current!, {
        duration: 0.6,
        translateX: "0rem",
      });
    }
  };
  const throttleListener = _.throttle(listener, 300);
  const handleScrollToClick = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", throttleListener);
    return () => window.removeEventListener("scroll", throttleListener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scrollToRef}
      className="
      fixed 
      bottom-[2rem] 
      right-[-10rem] 
      flex 
      justify-center 
      items-center
      w-[2rem] 
      h-[2rem] 
      rounded-lg 
      p-[1rem]
      bg-gray-600
      hover:cursor-pointer"
      onClick={handleScrollToClick}
    >
      <div>
        <FaArrowUp className=' text-gray-100 pointer-events-none'/>
      </div>
    </div>
  );
}

export default ScrollTo