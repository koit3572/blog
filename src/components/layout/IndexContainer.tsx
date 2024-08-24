import React from "react";
interface IndexContainerProps {
  children: React.ReactNode;
  containerTailwindCss?: string;
  innerTailwindCss?: string;
}
const IndexContainer: React.FC<IndexContainerProps> = ({
  children,
  containerTailwindCss,
  innerTailwindCss,
}) => {
  return (
    <div
      className={`${containerTailwindCss} flex h-full w-full justify-center`}
    >
      <div
        className={`flex w-[1100px] max-w-[100%] flex-col items-center justify-center gap-12 ${innerTailwindCss} `}
      >
        {children}
      </div>
    </div>
  );
};

export default IndexContainer;
