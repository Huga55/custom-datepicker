import { useEffect, useRef } from "react";

export interface IUseClickAway {
  onClickAway?(): void;
}

const useClickAway = <T extends HTMLElement>({
  onClickAway,
}: IUseClickAway) => {
  const componentRef = useRef<T | null>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        onClickAway?.();
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [componentRef, onClickAway]);

  return {
    clickedAwayRef: componentRef,
  };
};

export default useClickAway;
