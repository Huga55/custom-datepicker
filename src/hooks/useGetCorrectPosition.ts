import { useEffect, useState } from "react";

import useRefDimensions from "./useRefDimensions";

import { TDatepickerPosition } from "../schemas/wrapper";

export interface IUseGetCorrectPosition {
  position: TDatepickerPosition;
}

const useGetCorrectPosition = ({ position }: IUseGetCorrectPosition) => {
  const [horizontalCorrectPostion, setHorizontalCorrectPosition] =
    useState(position);

  const { dimensions, refElement: windowRef } =
    useRefDimensions<HTMLDivElement>();

  const windowElementRightPosition = dimensions?.right || 0;

  const isOutOfWindow =
    windowElementRightPosition >
    (window.innerWidth || document.documentElement.clientWidth);

  useEffect(() => {
    const changeLeftWindowPosition = () => {
      const correctPosition = position === "left" ? "right" : "left";

      setHorizontalCorrectPosition(isOutOfWindow ? correctPosition : position);
    };

    changeLeftWindowPosition();

    window.addEventListener("resize", changeLeftWindowPosition);

    return () => {
      window.removeEventListener("resize", changeLeftWindowPosition);
    };
  }, [isOutOfWindow, position]);

  return {
    horizontalCorrectPostion,
    windowRef,
  };
};

export default useGetCorrectPosition;
