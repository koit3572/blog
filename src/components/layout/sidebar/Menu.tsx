"use client";
import React from "react";
import List from "./List";
import { useAppSelector } from "@/hooks/redux";

interface MenuProps {
  className: string;
}
const Menu: React.FC<MenuProps> = ({ className }) => {
  const { menu, posts } = useAppSelector((state) => state.postSlice);
  return (
    <ul className={`${className}`}>
      {Object.keys(menu).map((category, i) => {
        const currentFolder = menu[category];
        console.log(category, currentFolder);
        return (
          <List
            key={i}
            category={category}
            currentFolder={currentFolder as string[]}
            postPaths={Object.keys(posts)}
          />
        );
      })}
    </ul>
  );
};

export default Menu;
