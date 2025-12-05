const eventideFestiveConfig: ThemeDataConfig = {
  palette: {
    primary: [237, 241, 255],
    saturated: [156, 172, 219],
    pastel: [83, 107, 172],
    light: [44, 60, 114],
    widget: [
      {
        type: "radial-gradient",
        stops: [
          { color: [11, 79, 52], at: 0, opacity: 0.5, isWidgetOpacity: true },
          { color: [97, 209, 96], at: 150, opacity: 0 },
        ],
        posX: -2,
        posY: 20,
        isCircle: true,
        sizeKeyword: "closest-corner",
      },
      {
        type: "radial-gradient",
        stops: [
          { color: [117, 5, 5], at: 0, opacity: 0.4, isWidgetOpacity: true },
          { color: [178, 24, 24], at: 125, opacity: 0, isWidgetOpacity: true },
        ],
        posX: 105,
        posY: 40,
        isCircle: true,
        sizeKeyword: "closest-corner",
      },
      {
        type: "radial-gradient",
        stops: [
          { color: [92, 39, 17], at: 0, opacity: 0.5, isWidgetOpacity: true },
          { color: [209, 135, 96], at: 150, opacity: 0 },
        ],
        posX: 36,
        posY: 102,
        isCircle: true,
        sizeKeyword: "closest-corner",
      },
      {
        type: "radial-gradient",
        stops: [
          { at: 0, color: [42, 50, 94], opacity: 0.8, isWidgetOpacity: true },
          {
            at: 100,
            color: [30, 34, 61],
            opacity: 0.85,
            isWidgetOpacity: true,
          },
        ],
        posX: 50,
        posY: 100,
        isCircle: true,
        sizeKeyword: "farthest-corner",
      },
    ],
    page: [
      {
        type: "radial-gradient",
        stops: [
          { at: 0, color: [37, 40, 71], opacity: 1 },
          { at: 100, color: [23, 22, 39], opacity: 1 },
        ],
        posX: 50,
        posY: 100,
        isCircle: true,
        sizeKeyword: "farthest-corner",
      },
    ],
  },
  siteThemeColor: "#171627",
  favicon: {
    mode: "separate",
    gradient: [
      {
        stops: [
          { color: "#2c3c72", offset: 0 },
          { color: "#788ed0", offset: 1 },
        ],
      },
    ],
  },
  animatedBackgroundKey: "eventide",
  misc: { readingBlur: 8 },
};

export default eventideFestiveConfig;
