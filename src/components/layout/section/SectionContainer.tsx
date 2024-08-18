import React from "react";
interface MainSectionContainerProps {
  className: string;
  children: React.ReactNode;
}
const SectionContainer: React.FC<MainSectionContainerProps> = ({
  className,
  children,
}) => {
  return <div className={`${className}`}>{children}</div>;
};

export default SectionContainer;
