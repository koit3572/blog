"use client"
import React, { useEffect } from 'react'
import dotenv from 'dotenv'
import { removeNumbering } from '@/lib/post';
import MenuItemTitle from './MenuItemTitle';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Link from 'next/link';
import { setIsMainSideMenuToggle } from '@/store/toggle/toggleSlice';
import { WIDTH_RESPONSE_STANDARD } from '@/constants';
import { fetchPost } from '@/store/post/postSlice';

dotenv.config();

interface IMainSideBarData {
  [dirName:string]:string[]
}
const handleOnClickTitle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  const parentEl = e.currentTarget.parentElement!;
  const opentitleClassList = parentEl!.querySelector(".open-title")!.classList.value.split(" "); 
  const isOpenTitle = !opentitleClassList.find((className) => className === 'hidden')
  const height = (parentEl.querySelector(".menu")!.children.length) - 1 * 30;
  if (isOpenTitle) {
    parentEl.querySelector(".open-title")!.classList.add("hidden");
    parentEl.querySelector(".close-title")!.classList.remove("hidden");
    parentEl.querySelector(".menu")!.classList.add("h-0");
    (
      parentEl.querySelector(".menu")! as HTMLElement
    ).style.height = `${height}px`;
  } else {
    parentEl.querySelector(".open-title")!.classList.remove("hidden");
    parentEl.querySelector(".close-title")!.classList.add("hidden");
    parentEl.querySelector(".menu")!.classList.remove("h-0");
    (
      parentEl.querySelector(".menu")! as HTMLElement
    ).style.height = `${height}px`;
  }
}
const RootMenu = () => {
  const dispatch = useAppDispatch();
  const { postFolderStructure, posts } = useAppSelector(
    (state) => state.postSlice.postData
  );
  if (!postFolderStructure) {
    dispatch(fetchPost());
  } else {
    const mainSideBarData = Object.keys(postFolderStructure).reduce(
      (acc1, dirName) => {
        const dirList = [...Object.keys(postFolderStructure[dirName])].filter(
          (dir) => dir.indexOf(".md") === -1
        );
        return (acc1 = {
          ...acc1,
          [dirName]: dirList,
        });
      },
      {} as IMainSideBarData
    );
    const handleOnClickList = () => {
      if (window.innerWidth <= WIDTH_RESPONSE_STANDARD) {
        dispatch(setIsMainSideMenuToggle({ isToggle: false }));
      }
    };
    return (
      <ul className="w-full text-gray-100">
        {Object.keys(mainSideBarData).map((rootDir, i) => (
          <li key={i} className="bg-gray-600">
            <div onClick={(e) => handleOnClickTitle(e)}>
              <div className="open-title hidden hover:cursor-pointer">
                <MenuItemTitle title={removeNumbering(rootDir)} />
              </div>
              <div className="close-title p-2 hover:cursor-pointer">
                {removeNumbering(rootDir)}
              </div>
            </div>
            <ul className="menu h-0 overflow-hidden transition-all">
              {mainSideBarData[rootDir].map((item: string, i: number) => (
                <li
                  key={i}
                  className="bg-gray-100 text-[#333] p-[3px] hover:cursor-pointer"
                  onClick={handleOnClickList}
                >
                  <Link
                    className="flex gap-1 items-center w-full h-full"
                    href={`/post/${rootDir}?choice=${item}`}
                  >
                    {removeNumbering(item)}
                    <p className="text-[0.8rem] opacity-80">{`(${
                      Object.keys(posts).filter((postPath) =>
                        postPath.includes(`${rootDir}/${item}`)
                      ).length
                    })`}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
};

export default RootMenu