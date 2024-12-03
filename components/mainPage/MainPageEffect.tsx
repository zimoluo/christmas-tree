"use client";

import { ReactNode, useEffect } from "react";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import _ from "lodash";
import ToastBannerReceiver from "../widgets/ToastBannerReceiver";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";
import PopUpManager from "../widgets/PopUpManager";

interface Props {
  children?: ReactNode;
}

const toastComponentMap: Record<NotificationStyle, ReactNode> = {
  disabled: null,
  toast: <ToastDisplayLegacy />,
  banner: <ToastBannerReceiver />,
};

const pageKeys: NavigationKey[] = [
  ...(Object.keys(defaultSettings.pageTheme) as NavigationKey[]),
];

export default function MainPageEffect({ children }: Props) {
  const { updateSettings, settings } = useSettings();

  useEffect(() => {
    const savedRawSettings = localStorage.getItem("websiteSettings");
    const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

    updateSettings(loadedSettings, false);
  }, []);

  return (
    <>
      <PopUpManager />
      {toastComponentMap[settings.notificationStyle]}
      {children}
    </>
  );
}
