"use client";
import { WIDTH_RESPONSE_STANDARD } from "@/constent";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useComponentSize from "@/hooks/useComponentSize";
import useOnclickOutside from "@/hooks/useOnclickOutside";
import { setIsMainSideMenuToggle } from "@/store/toggle/toggleSlice";
import React, { useEffect, useRef } from "react";
import Profile from "./Profile";
import Menu from "./Menu";
import { usePathname, useSearchParams } from "next/navigation";

interface SideBarContainerProps {
  className: string;
}

const SideBarContainer: React.FC<SideBarContainerProps> = ({ className }) => {
  const path = usePathname();
  const query = useSearchParams();
  const sideContainerRef = useRef<HTMLDivElement>(null);
  const [componentRef, size] = useComponentSize({ throttleTime: 100 });
  const dispatch = useAppDispatch();
  const { isSideBarToggle } = useAppSelector((state) => state.toggleSlice);

  useOnclickOutside([sideContainerRef], () => {
    if (size.width < WIDTH_RESPONSE_STANDARD && isSideBarToggle === true) {
      dispatch(setIsMainSideMenuToggle({ isToggle: false }));
    }
  });

  useEffect(() => {
    if (
      size.width > WIDTH_RESPONSE_STANDARD - 10 &&
      isSideBarToggle === false
    ) {
      dispatch(setIsMainSideMenuToggle({ isToggle: true }));
    } else if (
      size.width < WIDTH_RESPONSE_STANDARD &&
      isSideBarToggle === true
    ) {
      dispatch(setIsMainSideMenuToggle({ isToggle: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, path, query]);

  // ? size.width > WIDTH_RESPONSE_STANDARD
  //             ? "15.5rem"
  //             : "30.5rem"
  return (
    <>
      <div
        ref={sideContainerRef}
        className={`${className}`}
        style={{
          width: isSideBarToggle ? "15.5rem" : "0",
        }}
      >
        <div className="h-full w-[15rem] bg-slate-600">
          <Profile className="relative flex h-[18rem] flex-col items-center bg-blog-white" />
          <Menu className="h-[calc(100%-22rem)] w-[calc(100%+0.5rem)] overflow-y-scroll scrollbar-hide" />
        </div>
      </div>
      <div
        className={`${
          isSideBarToggle && size.width < WIDTH_RESPONSE_STANDARD
            ? "block"
            : "hidden"
        } fixed z-[998] h-[100vh] w-[100vw] bg-gray-800 opacity-45`}
      />
    </>
  );
};

export default SideBarContainer;
