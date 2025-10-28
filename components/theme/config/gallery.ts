const galleryConfig: ThemeDataConfig = {
  palette: {
    primary: [253, 253, 253],
    saturated: [217, 217, 217],
    pastel: [151, 151, 151],
    light: [140, 140, 140],
    widget: [
      {
        type: "linear-gradient",
        stops: [
          {
            at: 0,
            color: [161, 161, 161],
            opacity: 0.78,
            isWidgetOpacity: true,
          },
          {
            at: 100,
            color: [161, 161, 161],
            opacity: 0.78,
            isWidgetOpacity: true,
          },
        ],
        angle: 0,
      },
    ],
    page: [
      {
        type: "linear-gradient",
        stops: [
          { at: 0, color: [168, 168, 168], opacity: 1 },
          { at: 100, color: [168, 168, 168], opacity: 1 },
        ],
        angle: 0,
      },
    ],
  },
  siteThemeColor: "#a8a8a8",
  favicon: {
    mode: "separate",
    outline: "#414141",
    gradient: [
      {
        stops: [
          { color: "#b3b3b3", offset: 0.0 },
          { color: "#eaeaea", offset: 1.0 },
        ],
      },
    ],
  },
  animatedBackgroundKey: "gallery",
};

export default galleryConfig;
