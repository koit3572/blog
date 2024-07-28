import React from 'react'
interface IPostContainerProps {
  children: React.ReactNode;
}
const PostContainer: React.FC<IPostContainerProps> = ({
  children
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full pb-24 bg-gray-200">
      <div className="max-w-[1100px] bg-gray-200">
        {children}
      </div>
    </div>
  );
};

export default PostContainer;