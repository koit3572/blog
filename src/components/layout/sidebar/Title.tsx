import React from "react";

interface TitleProps {
  title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="relative h-[2.5rem] w-full">
      <div className="absolute bottom-[-0.5rem] right-[-0.5rem] h-[0.5rem] w-[0.5rem] rotate-90 border-l-[0.5rem] border-t-[0.5rem] border-l-slate-600 border-t-[transparent]" />
      <div className="absolute w-[calc(100%+0.5rem)] rounded-tr-lg bg-slate-600 p-2 text-blog-white">
        <h3 className="font-[600]">{title}</h3>
      </div>
    </div>
  );
};

export default Title;
