'use client'
import React, { useEffect, useRef } from 'react'
import Profile from './Profile'
import RootMenu from './RootMenu'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import useComponentSize from '@/hooks/useComponentSize'
import useOnclickOutside from '@/hooks/useOnclickOutside'
import { setIsMainSideMenuToggle } from '@/store/toggle/toggleSlice'
import { WIDTH_RESPONSE_STANDARD } from '@/constants'
interface IMainSideBarProps {
  className: string;
  maxWidth: string;
}
const MainSideBar: React.FC<IMainSideBarProps> = ({ className, maxWidth }) => {

  const { isMainSideMenuToggle: isToggle } = useAppSelector(
    (state) => state.toggleSlice
  );
  const dispatch = useAppDispatch();
  const sideContainerRef = useRef<HTMLElement>(null);
  const [componentRef, size] = useComponentSize({ throttleTime: 300 });
  useOnclickOutside([sideContainerRef], () => {
    if (size.width < WIDTH_RESPONSE_STANDARD && isToggle === true) {
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
    <>
      <aside
        ref={sideContainerRef}
        className={`${className} ${isToggle ? maxWidth : "w-0"} overflow-hidden`}
      >
        <div className={`${maxWidth} absolute z-10`}>
          <div className="relative w-full h-[100vh] overflow-y-scroll scrollbar-hide bg-transparent">
            <div className="absolute top-0 left-0 w-[calc(100%-0.5rem)] h-full bg-gray-600" />
            <div className="w-[calc(100%-0.5rem)] h-[20rem]">
              <Profile />
            </div>
            <div className="absolute top-[320px] w-[calc(100%-0.5rem)]">
              <RootMenu />
            </div>
          </div>
        </div>
      </aside>
      <div ref={componentRef} className="fixed w-[100vw]" />
      <div
        className={`${
          isToggle && size.width < WIDTH_RESPONSE_STANDARD ? "block" : "hidden"
        } z-50 fixed w-[100vw] h-[100vh] bg-gray-800 opacity-45`}
      />
    </>
  );
};

export default MainSideBar