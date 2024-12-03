import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getNavigation } from "./constants/navigationFinder";

export function useNavigation(): NavigationKey {
  const pathname = usePathname();
  const navigation = useMemo(() => {
    return getNavigation(pathname);
  }, [pathname]);

  return navigation;
}

export const useDragAndTouch = ({
  onMove = null,
  onFinish = () => {},
  onStart = () => {},
  dependencies = [],
  isDisabled = false,
}: {
  onMove?: ((event: MouseEvent | TouchEvent) => void) | null;
  onFinish?: ((event: MouseEvent | TouchEvent) => void) | (() => void);
  onStart?:
    | ((event: React.MouseEvent | React.TouchEvent) => void)
    | (() => void);
  dependencies?: any[];
  isDisabled?: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const handleStartDragging = (event: React.MouseEvent) => {
    event.preventDefault();
    onStart(event);
    setIsDragging(true);
  };

  const handleStartTouching = (event: React.TouchEvent) => {
    onStart(event);
    setIsTouching(true);
  };

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (onMove === null || (!isDragging && !isTouching)) {
        return;
      }

      onMove(event);
    },
    [isDragging, isTouching, onMove, ...dependencies]
  );

  const handleDragFinish = (event: MouseEvent) => {
    setIsDragging(false);

    if (!isTouching) {
      onFinish(event);
    }
  };

  const handleTouchFinish = (event: TouchEvent) => {
    setIsTouching(false);

    if (!isDragging) {
      onFinish(event);
    }
  };

  useEffect(() => {
    if (isDisabled) {
      setIsDragging(false);
      setIsTouching(false);
      return;
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleDragFinish);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleDragFinish);
    }

    if (isTouching) {
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleTouchFinish);
    } else {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleTouchFinish);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleDragFinish);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleTouchFinish);
    };
  }, [isDragging, isTouching, handleMove, handleDragFinish, handleTouchFinish]);

  return { handleStartDragging, handleStartTouching };
};
