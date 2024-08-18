"use client";
import React, { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import * as _ from "lodash";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface ScrollToProps {
  className: string;
}
const ScrollTo: React.FC<ScrollToProps> = ({ className }) => {
  const scrollToRef = useRef<HTMLDivElement>(null);
  const handleScrollToClick = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
    });
  };
  useEffect(() => {
    const listener = _.throttle(() => {
      if (window.scrollY > 500) {
        gsap.to(scrollToRef.current!, {
          duration: 0.5,
          translateX: "-2rem",
        });
      } else {
        gsap.to(scrollToRef.current!, {
          duration: 0.5,
          translateX: "2rem",
        });
      }
    }, 300);
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);
  return (
    <div
      ref={scrollToRef}
      className={`${className} fixed bottom-4 right-[-1rem] rounded-lg bg-slate-950 p-2 hover:cursor-pointer`}
      onClick={handleScrollToClick}
    >
      <FaArrowUp className="pointer-events-none text-gray-100" />
    </div>
  );
};

export default ScrollTo;
