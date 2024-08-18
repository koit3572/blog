import React, { useEffect, useRef, useState } from "react";
import * as _ from "lodash";
import { HiMenu } from "react-icons/hi";
import { useAppDispatch } from "@/hooks/redux";
import { setIsMainSideMenuToggle } from "@/store/toggle/toggleSlice";

interface NavBarContainerProps {
  style: React.CSSProperties;
  className: string;
}
const NavBarContainer: React.FC<NavBarContainerProps> = ({
  style,
  className,
}) => {
  const lastScrollTop = useRef<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOnClickHiMenu = () => {
    dispatch(setIsMainSideMenuToggle({ isToggle: true }));
  };
  useEffect(() => {
    const listener = _.debounce(() => {
      setIsHidden(lastScrollTop.current - window.scrollY < 0 ? true : false);
      lastScrollTop.current = window.scrollY;
    }, 100);
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={style}
      className={`${className} ${isHidden ? "pointer-events-none opacity-0" : "opacity-100"} transition-[opacity] duration-300`}
    >
      <div className="flex h-full w-full items-center justify-between rounded-lg border-[0.13rem] border-slate-500 bg-slate-700 px-4 font-bold text-blog-white opacity-[95%]">
        <div
          className="hover:cursor-pointer xl:hidden"
          onClick={handleOnClickHiMenu}
        >
          <HiMenu className="pointer-events-none" size={"1.5rem"} />
        </div>
        <p className="hidden xl:block"> </p>
        <p>Blog Home</p>
        <p> </p>
      </div>
    </div>
  );
};

export default NavBarContainer;
