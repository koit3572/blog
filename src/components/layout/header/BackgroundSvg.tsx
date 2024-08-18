"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface BackgourndSvg {
  className: string;
}
const BackgroundSvg: React.FC<BackgourndSvg> = ({ className }) => {
  const urlPath = usePathname();
  return (
    <svg
      className={`${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      version="1.1"
    >
      <path
        fill="#0f172a"
        d={`
            M 0 120
            L 0 145
            C 25 110 75 110 100 145
            S 165 190 200 120
            L 200 200
            L 0 200
            Z
          `}
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
      <path
        fill="#334155"
        d={`
            M 0 200
            L 0 170
            C 25 125 70 100 100 150
            S 175 185 200 145
            L 200 200
            L 0 200
            Z
          `}
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
      <path
        fill={urlPath !== "/blog/post" ? "#334155" : "#f1f5f9"}
        d={`
            M 0 200
            L 0 180
            C 40 110 80 145 105 175
            S 175 210 200 150
            L 200 200 
            Z 
          `}
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

export default BackgroundSvg;
