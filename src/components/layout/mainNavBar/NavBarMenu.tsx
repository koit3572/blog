'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setIsMainSideMenuToggle } from "@/store/toggle/toggleSlice";
import { HiMenu } from "react-icons/hi";

const NavBarMenu = () => {
  const { isMainSideMenuToggle: isToggle } = useAppSelector(
    (state) => state.toggleSlice
  );
  const dispatch = useAppDispatch();
  return (
    <div
      className="text-shadow-border shadow-gray-600 hover:cursor-pointer 2xl:hidden"
      onClick={() => {
        if (!isToggle) dispatch(setIsMainSideMenuToggle({ isToggle: true }));
      }}
    >
      <HiMenu className='pointer-events-none' size={"1.5rem"} />
    </div>
  );
}

export default NavBarMenu