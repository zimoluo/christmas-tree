interface SettingsState {
  backgroundRichness: "minimal" | "reduced" | "rich";
  pageTheme: Record<NavigationKey, ThemeKey>;
  viewedChristmasTreeMessages: string[];
}
