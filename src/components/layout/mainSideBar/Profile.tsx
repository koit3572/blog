'use client'
import Link from 'next/link';
import React from 'react'
import { IoHome } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io5";
import { BsFilePersonFill } from "react-icons/bs";
import MenuItemTitle from './MenuItemTitle';
import { useAppDispatch } from '@/hooks/redux';
import { setIsMainSideMenuToggle } from '@/store/toggle/toggleSlice';
import { WIDTH_RESPONSE_STANDARD } from '@/constants';

const menuList = {
  home: {
    icon: <IoHome className="pointer-events-none" />,
    href: "/",
  },
  gitHub: {
    icon: <IoLogoGithub className="pointer-events-none" />,
    href: "https://github.com/koit3572",
  },
  resume: {
    icon: <BsFilePersonFill className="pointer-events-none" />,
    href: "#",
  },
};
const Profile = () => {
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    if (window.innerWidth <= WIDTH_RESPONSE_STANDARD) {
      dispatch(setIsMainSideMenuToggle({ isToggle: false }));
    }
  };
  return (
    <div className="relative h-full bg-gray-100">
      <MenuItemTitle title="Profile" />
      <div className="absolute top-[2.5rem] w-full h-[40%] bg-gray-500" />
      <div className="absolute flex justify-center items-center w-full h-[60%]">
        <div className="w-[8rem] h-[8rem] bg-gray-300 rounded-[50%] border-[0.5rem] border-gray-100"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full text-center">
        <h2>koit의 웹개발 블로그</h2>
        <p className="text-[0.8rem] text-gray-500">
          &quot;한번의 기록으로 영원한 기억을&quot;
        </p>
        <div className="flex justify-center items-center h-[2.2rem] gap-6 m-4 bg-gray-500 rounded-2xl">
          {Object.keys(menuList).map((item, i) => (
            <div
              key={i}
              className="text-gray-100 hover:cursor-pointer"
              onClick={handleOnClick}
            >
              {i !== 1 ? (
                <Link href={menuList[item as keyof typeof menuList].href}>
                  {menuList[item as keyof typeof menuList].icon}
                </Link>
              ) : (
                <Link
                  href={menuList[item as keyof typeof menuList].href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {menuList[item as keyof typeof menuList].icon}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile