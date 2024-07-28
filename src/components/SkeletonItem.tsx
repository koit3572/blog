"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
interface ISkeletonProps {
  width: number;
  height: number;
}
const Skeleton: React.FC<ISkeletonProps> = ({ width, height }) => {
  const skeletonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(skeletonRef.current, 2.5, {
      x: width * 2,
      repeat: -1,
    });
  }, []);
  return (
    <div
      className="relative bg-gray-300 rounded-lg overflow-hidden"
      style={{ width, height }}
    >
      <div
        ref={skeletonRef}
        style={{ width: width * 2, height }}
        className="absolute left-[-150%] bg-gradient-to-r from-gray-300 from-[25%] via-gray-50 via-[50%] to-gray-300 to-[75%]"
      />
    </div>
  );
};

export default Skeleton;
