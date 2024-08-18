"use client";
import React from "react";
import { useAppDispatch } from "@/hooks/redux";
import { IoHome, IoLogoGithub } from "react-icons/io5";
import { BsFilePersonFill } from "react-icons/bs";
import { WIDTH_RESPONSE_STANDARD } from "@/constent";
import { setIsMainSideMenuToggle } from "@/store/toggle/toggleSlice";
import Link from "next/link";
import Title from "./Title";

interface ProfileProps {
  className: string;
}
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

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    if (window.innerWidth <= WIDTH_RESPONSE_STANDARD) {
      dispatch(setIsMainSideMenuToggle({ isToggle: false }));
    }
  };

  return (
    <div className={`${className}`}>
      <Title title="Profile" />
      <div className="h-[5rem] w-full bg-slate-500" />
      <div className="absolute top-[3.5rem] h-[8.5rem] w-[8.5rem] rounded-[4.25rem] border-[0.5rem] border-blog-white bg-slate-400">
        {/*추후 프로필 사진 추가 */}
      </div>
      <div className="pt-[4.5rem]">
        <p className="flex flex-col items-center">
          <span>koit의 웹개발 블로그</span>
          <span className="text-[0.8rem]">{`"한번의 기록으로 영원한 기억을"`}</span>
        </p>
        <div className="mt-2 flex h-[2.2rem] w-full items-center justify-center gap-6 rounded-xl bg-slate-500">
          {Object.keys(menuList).map((item, i) => (
            <div
              key={i}
              className="text-blog-white hover:cursor-pointer"
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
};

export default Profile;
