import { useState, useEffect, useRef } from "react";
import * as _ from "lodash";
export interface ComponentSize {
  width: number;
  height: number;
}
function useComponentSize({ throttleTime }: {throttleTime:number}): [React.RefObject<HTMLDivElement>, ComponentSize] {
  const [size, setSize] = useState<ComponentSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      const { width, height } =
        componentRef.current?.getBoundingClientRect() ?? {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      setSize({ width, height });
    };
    window.addEventListener(
      "resize",
      throttleTime === 0 ? handleResize : _.throttle(handleResize, throttleTime)
    );
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [componentRef, size];
}
export default useComponentSize;
