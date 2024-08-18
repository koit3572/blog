import { useEffect } from "react";

const useOnclickOutside = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const result = refs.filter((ref) =>
        ref.current?.contains(e.target as Node),
      );
      if (result.length > 0) {
        return null;
      } else {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler]);
};
export default useOnclickOutside;
