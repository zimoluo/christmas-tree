"use client";

import { ReactNode, useEffect } from "react";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";
import PopUpManager from "../widgets/PopUpManager";

interface Props {
  children?: ReactNode;
}

export default function MainPageEffect({ children }: Props) {
  const { updateSettings } = useSettings();

  useEffect(() => {
    const savedRawSettings = localStorage.getItem("websiteSettings");
    const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

    updateSettings(loadedSettings, false);
  }, []);

  return (
    <>
      <PopUpManager />
      <ToastDisplayLegacy />
      {children}
    </>
  );
}
