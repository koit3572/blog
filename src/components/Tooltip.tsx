'use client'
import React, { useEffect, useRef } from 'react'
interface ITooltipProps{
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
      <div className='w-full h-full'>{target}</div>
      <div
        ref={targetRef}
        className="absolute top-[2rem] right-[-2.7rem] w-[10rem] h-[10rem] hidden"
      >
        <div className="relative">
          <div className="absolute top-[-1rem] right-11 w-[1rem] h-[1rem] border-x-[0.5rem] border-b-[0.7rem] border-transparent border-b-slate-800" />
          <div className="w-[10rem] min-h-[10rem] p-2 bg-slate-800 rounded-2xl text-gray-200 text-[0.7rem]">
            {contents}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip