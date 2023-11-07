import DisplayFavicon from "../images/DisplayFavicon";
import NavbarButtonWrapper from "./NavbarButtonWrapper";
import Link from "next/link";
import navbarStyle from "./navbar.module.css";
import { iconImageMap } from "@/lib/constants/iconMaps";
import React from "react";

export default function NavbarContent() {
  return (
    <nav className="bg-widget px-4 h-full w-full flex items-center justify-between">
      <div className="shrink-0">
        <Link href={`/`} passHref>
          <DisplayFavicon className="h-6 w-auto transform transition-all duration-300 hover:scale-110 cursor-pointer" />
        </Link>
      </div>
      <div
        className={`grid grid-cols-4 gap-x-1 md:gap-x-2 shrink-0 ${navbarStyle["navbar-spacing"]}`}
      >
        {["photos", "blog", "projects", "about"].map((item) => (
          <NavbarButtonWrapper
            key={item}
            item={item as "photos" | "blog" | "projects" | "about"}
          >
            {React.createElement(iconImageMap[item as NavigationKey], {
              className:
                "h-6 w-auto aspect-square transition-transform duration-300 group-hover:scale-110",
            })}
          </NavbarButtonWrapper>
        ))}
      </div>
      <div
        className="shrink-0 h-6 w-auto aspect-square select-none pointer-events-none"
        aria-hidden="true"
      />
    </nav>
  );
}
