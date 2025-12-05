"use client";

import { useState, useEffect } from "react";
import CrossIcon from "@/components/assets/CrossIcon";
import { usePopUp } from "../contexts/PopUpContext";
import DarkOverlay from "./DarkOverlay";
import { PopUpActionProvider } from "../contexts/PopUpActionContext";
import popUpStyle from "./pop-up.module.css";

type Props = PopUp & {
  index: number;
};

export default function PopUpDisplay({
  content,
  onClose = () => {},
  index,
  hasDarkOverlay = true,
  hasUtilityButton = true,
  darkOpacity,
  uniqueId,
}: Props) {
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translate(0, 18px)",
  });

  const { removeLastPopUp, removePopUpByUniqueId, popUps, clearPopUp } =
    usePopUp();

  const closeThisPopUpIfLast = () => {
    if (!(index === popUps.length - 1)) {
      return;
    }

    onClose();
    removeLastPopUp();
  };

  const closeThisPopUp = () => {
    onClose();
    removePopUpByUniqueId(uniqueId);
  };

  useEffect(() => {
    setStyle({
      opacity: 1,
      transform: "translate(0, 0)",
      transition: "opacity 200ms ease-out, transform 200ms ease-out",
    });
  }, []);

  return (
    <>
      {hasDarkOverlay && <DarkOverlay opacity={darkOpacity} />}
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 px-12 py-12">
        <div style={style}>
          <PopUpActionProvider closePopUp={closeThisPopUp}>
            {content}
          </PopUpActionProvider>
        </div>
        {hasUtilityButton && (
          <div className="absolute top-3 right-3 z-70 rounded-full">
            <button
              className={`group flex items-center justify-center p-2 rounded-full bg-neutral-600/30 backdrop-blur-sm border-reflect-light ${popUpStyle.specialReflect}`}
              onClick={closeThisPopUpIfLast}
            >
              <CrossIcon
                color="#efefef"
                className="h-4 w-4 opacity-80 mix-blend-plus-lighter transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
