"use client";

import { ReactNode, useRef, useState } from "react";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";
import MenuIcon from "../assets/entries/MenuIcon";

interface Props {
  children?: ReactNode;
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ menuContent }: Props) {
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setIsSideMenuExpanded(true);
  };

  const restoreNavbar = () => {
    setIsSideMenuExpanded(false);
  };

  return (
    <>
      <MenuSlideWrapper
        isOpen={isSideMenuExpanded}
        onClose={restoreNavbar}
        menuButtonRef={menuButtonRef}
      >
        {menuContent}
      </MenuSlideWrapper>
      <div
        className={`fixed top-4 md:top-2.5 right-4 z-30 h-10 md:h-13 w-10 md:w-13 pointer-events-none select-none transition-[filter,opacity] duration-200 ease-out ${
          isSideMenuExpanded ? "opacity-0 blur-[8px]" : "opacity-100"
        }`}
      >
        <div className="w-full h-full shadow-lg rounded-full bg-light/65 backdrop-blur-sm border-reflect-light" />
      </div>
      <div className="fixed top-4 md:top-2.5 right-4 z-30 h-10 md:h-13 w-10 md:w-13">
        <button
          className="w-full h-full flex items-center justify-center rounded-full"
          onClick={isSideMenuExpanded ? restoreNavbar : openMenu}
          ref={menuButtonRef}
        >
          <MenuIcon
            className="h-6 md:h-7 w-6 md:w-7 pointer-events-none"
            isActive={isSideMenuExpanded}
          />
        </button>
      </div>
    </>
  );
}
