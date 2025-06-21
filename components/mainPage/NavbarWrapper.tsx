"use client";

import { ReactNode, useRef, useState } from "react";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";
import ExpandMenuButton from "../widgets/ExpandMenuButton";

interface Props {
  children?: ReactNode;
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ menuContent }: Props) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const restoreNavbar = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <MenuSlideWrapper
        onClose={restoreNavbar}
        isOpen={menuOpen}
        menuButtonRef={menuButtonRef}
      >
        {menuContent}
      </MenuSlideWrapper>
      <div className="fixed top-3 right-4 z-40">
        <div className="relative h-0 w-0 pointer-events-none">
          <div className="absolute right-1 -top-1 h-8 w-8 bg-light bg-opacity-80 backdrop-blur-sm border-reflect rounded-full" />
        </div>
        <ExpandMenuButton
          className=""
          isOpen={menuOpen}
          onClick={menuOpen ? restoreNavbar : openMenu}
          buttonRef={menuButtonRef}
        />
      </div>
    </>
  );
}
