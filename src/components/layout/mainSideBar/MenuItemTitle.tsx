'use client'
import React from 'react'
interface ITitle {
  title: string;
}
const MenuItemTitle: React.FC<ITitle> = ({ title }) => {
  return (
    <div className="relative w-[calc(100%+8px)] h-[2.5rem] bg-gray-600 rounded-tr-md shadow shadow-black">
      <div className="absolute right-0 bottom-[-8px] w-[8px] h-[8px] border-t-[8px] border-l-[8px] border-t-[transparent] border-l-gray-600 rotate-90" />
      <p className="text-gray-100 p-2">{title}</p>
    </div>
  );
}

export default MenuItemTitle