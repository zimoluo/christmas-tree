"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSettings } from "./SettingsContext";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import { themeKeyMap } from "../theme/util/themeKeyMap";
import { useNavigation } from "@/lib/helperHooks";

interface Props {
  children?: ReactNode;
  defaultThemeKey?: ThemeKey;
}

interface ThemeContextType {
  themeConfig: ThemeDataConfig;
  themeKey: ThemeKey;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultThemeKey = "eventideFestive",
}: Props) {
  const { updateSettings, settings } = useSettings();
  const navigationKey = useNavigation();

  const themeKey = settings.pageTheme[navigationKey] || defaultThemeKey;

  const safelyLoadTheme = (): ThemeDataConfig => {
    updateSettings({ pageTheme: defaultSettings.pageTheme });

    if (typeof defaultThemeKey === "object") {
      return defaultThemeKey;
    }

    return themeKeyMap[defaultThemeKey];
  };

  const themeConfig = themeKeyMap[themeKey] || safelyLoadTheme();

  return (
    <ThemeContext.Provider value={{ themeConfig, themeKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
