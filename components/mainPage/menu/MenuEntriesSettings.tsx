"use client";

import { Fragment, ReactNode } from "react";
import { useSettings } from "@/components/contexts/SettingsContext";
import SettingsSlider from "./settings/SettingsSlider";
import menuStyle from "./menu.module.css";
import { useTheme } from "@/components/contexts/ThemeContext";
import SettingsThemePicker from "./settings/SettingsThemePicker";
import { useNavigation } from "@/lib/helperHooks";

const settingsNameMap: { [key in keyof Partial<SettingsState>]: string } = {
  backgroundRichness: "Background richness",
  pageTheme: "Theme palette",
};

interface SettingsPanelEntry {
  entry: keyof SettingsState;
  type: "flip" | "slider" | "special";
  condition?: { value: string; match: string | string[] | boolean | number }[];
  component?: ReactNode;
  values?: string[] | number[];
  captions?: string[];
}

const entryDivider = (
  <hr className="border-primary border-0.4 border-opacity-20 h-0" />
);

interface Props {
  ignoreConditions?: boolean;
}

export default function MenuEntriesSettings({
  ignoreConditions = false,
}: Props) {
  const { settings, updateSettings } = useSettings();
  const { themeConfig } = useTheme();
  const animationKey = themeConfig.animatedBackgroundKey;

  const currentPage = useNavigation();

  const settingsConfig: {
    title: string;
    entries: SettingsPanelEntry[];
  }[] = [
    {
      title: "Theme",
      entries: [
        {
          entry: "pageTheme",
          type: "special",
          component: (
            <div className="mt-2 mb-1">
              <SettingsThemePicker />
            </div>
          ),
        },
        {
          entry: "backgroundRichness",
          type: "slider",
          values: ["minimal", "reduced", "rich"],
          captions: ["Minimal", "Reduced", "Rich"],
        },
      ],
    },
  ];

  const checkCondition = (condition: SettingsPanelEntry["condition"]) => {
    if (ignoreConditions) {
      return true;
    }

    if (!condition) {
      return true;
    }

    return condition.some((cond) => {
      const { value, match } = cond;
      if (value === "animationKey") {
        if (!animationKey) {
          return false;
        }
        if (Array.isArray(match)) {
          if (Array.isArray(animationKey)) {
            return animationKey.some((key) => match.includes(key));
          } else if (typeof animationKey === "string") {
            return match.includes(animationKey);
          }
        } else if (typeof match === "string") {
          if (Array.isArray(animationKey)) {
            return animationKey.includes(match as ThemeAnimatedBackgroundKey);
          } else if (typeof animationKey === "string") {
            return animationKey === match || animationKey.includes(match);
          }
        }
      } else if (value === "currentPage") {
        if (Array.isArray(match)) {
          return match.includes(currentPage);
        }
        return currentPage === match;
      } else if (value.startsWith("settings-")) {
        const settingsKey = value.slice("settings-".length);

        if (settingsKey in settings) {
          if (Array.isArray(match)) {
            return match.includes(
              settings[settingsKey as keyof SettingsState] as any
            );
          }
          return (
            (settings[settingsKey as keyof SettingsState] as any) === match
          );
        }
      }

      return false;
    });
  };

  return (
    <>
      {settingsConfig.map((section, sectionIndex) => {
        const filteredEntries = section.entries.filter((entry) =>
          checkCondition(entry.condition)
        );
        return (
          <div
            key={`${section.title || "settings-section"}-${sectionIndex}`}
            className={
              "w-full bg-light bg-opacity-8 rounded-[2rem] shadow-xl py-4 px-5 mb-4 text-base grid grid-cols-1 gap-3 border border-highlight-light border-opacity-15"
            }
          >
            {filteredEntries.map((entry, entryIndex) => {
              const isLastEntry = entryIndex === filteredEntries.length - 1;
              const showDivider =
                !isLastEntry || sectionIndex !== settingsConfig.length - 1;

              switch (entry.type) {
                case "slider":
                  const entryValue = settings[entry.entry] as unknown as number;

                  return (
                    <Fragment key={`${entry.entry}-${entryIndex}`}>
                      <div className={`text-base ${menuStyle.entryMinWidth}`}>
                        {settingsNameMap[entry.entry]}
                      </div>
                      <SettingsSlider
                        setValue={(newValue: string | number) => {
                          updateSettings({
                            [entry.entry]: newValue,
                          } as Partial<SettingsState>);
                        }}
                        values={entry.values as (string | number)[]}
                        text={entry.captions ?? []}
                        entry={entryValue}
                      />
                      {showDivider && entryDivider}
                    </Fragment>
                  );
                case "special":
                  return (
                    <Fragment key={`${entry.entry}-${entryIndex}`}>
                      <div className={`text-base ${menuStyle.entryMinWidth}`}>
                        {settingsNameMap[entry.entry]}
                      </div>
                      {entry.component}
                      {showDivider && entryDivider}
                    </Fragment>
                  );
                default:
                  return null;
              }
            })}
          </div>
        );
      })}
    </>
  );
}
