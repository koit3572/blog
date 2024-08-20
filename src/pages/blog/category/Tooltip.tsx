"use client";
import React, { useEffect, useRef } from "react";
interface ITooltipProps {
  target: React.ReactNode;
  contents: React.ReactNode;
}
const Tooltip: React.FC<ITooltipProps> = ({ target, contents }) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mouseoverListener = () => {
      targetRef.current?.classList.add("block");
      targetRef.current?.classList.remove("hidden");
    };
    const mouseoutListener = () => {
      targetRef.current?.classList.add("hidden");
      targetRef.current?.classList.remove("block");
    };
    hoverRef.current?.addEventListener("mouseover", mouseoverListener);
    hoverRef.current?.addEventListener("mouseout", mouseoutListener);
    return () => {
      removeEventListener("mouseover", mouseoverListener);
      removeEventListener("mouseout", mouseoutListener);
    };
  }, []);
  return (
    <div ref={hoverRef}>
      <div className="h-full w-full">{target}</div>
      <div
        ref={targetRef}
        className="absolute right-[-2.7rem] top-[2rem] hidden h-[10rem] w-[10rem]"
      >
        <div className="relative">
          <div className="absolute right-11 top-[-1rem] h-[1rem] w-[1rem] border-x-[0.5rem] border-b-[0.7rem] border-transparent border-b-slate-800" />
          <div className="min-h-[10rem] w-[12rem] rounded-2xl bg-slate-800 p-2 text-[0.7rem] text-gray-200">
            {contents}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
