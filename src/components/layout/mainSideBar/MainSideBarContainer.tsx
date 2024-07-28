'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useComponentSize from '@/hooks/useComponentSize';
import useOnclickOutside from '@/hooks/useOnclickOutside';
import { setIsMainSideMenuToggle } from '@/store/toggle/toggleSlice';
import { useEffect, useRef } from 'react';
import * as _ from 'lodash'
interface IMainSideBarContainerProps {
  children: React.ReactNode;
}
const MainSideBarContainer: React.FC<IMainSideBarContainerProps> = ({
  children,
}) => {
  const { isMainSideMenuToggle: isToggle } = useAppSelector(
    (state) => state.toggleSlice
  );
  const dispatch = useAppDispatch();
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [componentRef, size] = useComponentSize({ throttleTime: 300 });
  useOnclickOutside([sideBarRef], () => {
    if (size.width < 1536 && isToggle === true) {
      dispatch(setIsMainSideMenuToggle({ isToggle: false }));
    }
  });
  useEffect(() => {
    if (size.width > 1500 && isToggle === false) {
      dispatch(setIsMainSideMenuToggle({ isToggle: true }));
    } else if (size.width < 1536 && isToggle === true) {
      dispatch(setIsMainSideMenuToggle({ isToggle: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);
  return (
    <div>
      <div
        className={`
        ${isToggle ? "w-[15rem]" : "w-0"} 
        transition-[width] duration-500`}
      />
      <div ref={componentRef} className="fixed top-0 left-0 w-[100vw]" />
      <div
        ref={sideBarRef}
        className={`
        ${isToggle ? "w-[15rem]" : "w-0"} 
        ${window.innerWidth < 1536 && "fixed top-0 left-0"}
        z-20 fixed transition-[width] duration-500 overflow-hidden `}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainSideBarContainer;
