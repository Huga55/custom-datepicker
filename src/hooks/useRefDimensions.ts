import { useEffect, useRef, useState } from "react";

const useRefDimensions = <T extends HTMLElement>() => {
  const [dimensions, setDimensions] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [outsides, setOutsides] = useState({
    outOfBottomSide: false,
    outOfLeftSide: false,
    outOfRightSide: false,
    outOfTopSide: false,
  });

  const refElement = useRef<T | null>(null);

  useEffect(() => {
    const changeDimensions = () => {
      if (refElement.current) {
        const { current } = refElement;

        const boundingRect = current.getBoundingClientRect();

        const { width, height, left, top, bottom, right, x, y } = boundingRect;

        setDimensions({ bottom, height, left, right, top, width, x, y });
      }
    };

    changeDimensions();

    window.addEventListener("resize", changeDimensions);

    return () => {
      window.removeEventListener("resize", changeDimensions);
    };
  }, [refElement.current]);

  useEffect(() => {
    const getOutsides = () => {
      setOutsides({
        outOfBottomSide: dimensions.y + dimensions.height > window.innerHeight,
        outOfLeftSide: dimensions.x < 0,
        outOfRightSide: dimensions.x + dimensions.width > window.innerWidth,
        outOfTopSide: dimensions.y < 0,
      });
    };

    getOutsides();

    window.addEventListener("scroll", getOutsides);

    return () => {
      window.removeEventListener("scroll", getOutsides);
    };
  }, [dimensions.height, dimensions.width, dimensions.x, dimensions.y]);

  return {
    dimensions,
    ...outsides,
    refElement,
  };
};

export default useRefDimensions;
