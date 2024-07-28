import React from 'react'
interface IPostSkeletonProps {
  width: string;
  height: string;
}
const PostSkeleton:React.FC<IPostSkeletonProps> = ({
  width,height
}) => {
  return (
    <div className='bg-red-600' style={{ width: width, height: height }}>

    </div>
  );
}

export default PostSkeleton