"use client";

import { createContext, useContext, useState } from "react";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import _ from "lodash";

export const parseStoredSettings = (
  rawSettingsString: string
): SettingsState => {
  if (!rawSettingsString) {
    return defaultSettings;
  }

  const parsedSavedSettings = JSON.parse(
    rawSettingsString
  ) as Partial<SettingsState>;

  const filteredSavedSettings = purgeInvalidEntries(parsedSavedSettings);

  return { ...defaultSettings, ...filteredSavedSettings };
};

const purgeInvalidEntries = (
  rawSettings: Partial<SettingsState>
): Partial<SettingsState> => {
  return Object.keys(rawSettings)
    .filter((key): key is keyof SettingsState => key in defaultSettings)
    .reduce((obj, key) => {
      obj[key] = rawSettings[key] as any;
      return obj;
    }, {} as Partial<SettingsState>);
};

const SettingsContext = createContext<
  | {
      settings: SettingsState;
      updateSettings: (
        newSettings: Partial<SettingsState>,
        doSync?: boolean
      ) => void;
      updatePageTheme: (
        themeKey: ThemeKey,
        page: NavigationKey,
        doSync?: boolean
      ) => void;
    }
  | undefined
>(undefined);

export const SettingsProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const updateAndPersistSettings = (
    newSettings: Partial<SettingsState>,
    callback: (updatedSettings: SettingsState) => void = () => {}
  ) => {
    setSettings((prevSettings) => {
      const updatedSettings = {
        ...defaultSettings,
        ...prevSettings,
        ...newSettings,
      };

      const filteredSettings = purgeInvalidEntries(
        updatedSettings
      ) as SettingsState;

      localStorage.setItem(
        "websiteSettingsChristmasTreeZimoWeb",
        JSON.stringify(filteredSettings)
      );

      callback(filteredSettings);

      return filteredSettings;
    });
  };

  const updateSettings = (
    newSettings: Partial<SettingsState>,
    doSync: boolean = true
  ) => {
    updateAndPersistSettings(newSettings);
  };

  const updatePageTheme = (
    themeKey: ThemeKey,
    page: NavigationKey,
    doSync: boolean = true
  ) => {
    if (_.isEqual(themeKey, settings.pageTheme[page])) {
      return;
    }

    const newSettings: Partial<SettingsState> = {
      pageTheme: { ...settings.pageTheme, [page]: themeKey },
    };

    updateSettings(newSettings, doSync);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updatePageTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
