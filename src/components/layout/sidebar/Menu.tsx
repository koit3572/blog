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
        return (
          <List key={i} category={category} postPaths={Object.keys(posts)} />
        );
      })}
    </ul>
  );
};

export default Menu;
