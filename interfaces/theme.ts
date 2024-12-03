type ThemeKey =
  | "christmas"
  | "dusk"
  | "about"
  | "perpetuity"
  | "glitter"
  | "oasis"
  | "cherry"
  | "mori"
  | "home"
  | "plainGray"
  | "penumbra"
  | "rainbow";

type ThemeAnimatedBackgroundKey =
  | "home"
  | "glitter"
  | "rainbow"
  | "christmas"
  | "perpetuity"
  | "dusk";

interface ThemeMiscOptions {
  readingBlur?: number;
}

interface ThemeDataConfig {
  palette: RawColorPaletteData;
  siteThemeColor: HexColor;
  favicon: FaviconConfig;
  animatedBackgroundKey?:
    | ThemeAnimatedBackgroundKey
    | ThemeAnimatedBackgroundKey[];
  misc?: ThemeMiscOptions;
}

interface RawColorPaletteData {
  primary: ColorTriplet;
  saturated: ColorTriplet;
  pastel: ColorTriplet;
  light: ColorTriplet;
  page: ColorGradient[];
  pageMinimal?: ColorGradient[];
  widget: ColorGradient[];
}

interface GradientStop {
  color: ColorTriplet;
  opacity: number; // [0.0, 1.0]
  isWidgetOpacity?: boolean;
  at: number; // in percentage
}

interface LinearGradientData {
  angle: number; // [0, 359]
}

interface LinearGradientOrientationData {
  linearGradientKeyword?: boolean;
  linearHorizontalOrientation?: LinearGradientHorizontal;
  linearVerticalOrientation?: LinearGradientVertical;
}

interface RadialGradientData {
  posX: number; // in percentage
  posY: number;
  sizeX: number;
  sizeY: number;
}

interface CircleRadialGradientAdditionalData {
  isCircle?: boolean;
  sizeKeyword?: RadialGradientSizeKeyword;
}

type RadialGradientSizeKeyword =
  | "closest-side"
  | "closest-corner"
  | "farthest-side"
  | "farthest-corner";

type LinearGradientHorizontal = "left" | "right";

type LinearGradientVertical = "top" | "bottom";

interface CustomGradientData {
  content: string;
}

type ColorGradient = {
  type: EditorGradientMode | "custom";
  stops?: GradientStop[];
  disabled?: boolean;
  colorInterpolation?: ColorInterpolationData;
} & Partial<LinearGradientData> &
  Partial<LinearGradientOrientationData> &
  Partial<RadialGradientData> &
  Partial<CircleRadialGradientAdditionalData> &
  Partial<CustomGradientData>;

type ColorTriplet = [number, number, number];

interface ColorInterpolationData {
  colorSpace: GradientColorSpace | "default";
  hueInterpolationMethod?: HueInterpolationMethod; // defaults to shorter
}

type GradientColorSpace =
  | "srgb"
  | "srgb-linear"
  | "display-p3"
  | "a98-rgb"
  | "prophoto-rgb"
  | "rec2020"
  | "lab"
  | "oklab"
  | "xyz"
  | "xyz-d50"
  | "xyz-d65"
  | PolarColorSpace;

type PolarColorSpace = "hsl" | "hwb" | "lch" | "oklch";

type HueInterpolationMethod =
  | "shorter"
  | "longer"
  | "increasing"
  | "decreasing";

type AccentColors = "primary" | "saturated" | "pastel" | "light" | "site";

type GradientCategory = "page" | "pageMinimal" | "widget";

type EditorGradientMode =
  | "linear-gradient"
  | "radial-gradient"
  | "repeating-linear-gradient"
  | "repeating-radial-gradient"
  | "conic-gradient"
  | "repeating-conic-gradient";

type FaviconMode = "backdrop" | "outline" | "separate" | "overall" | "custom";

type CustomFaviconKey = "dusk";

type HexColor = `#${string}`;

interface FaviconGradientStop {
  color: HexColor;
  offset: number; // [0.0, 1.0]
}

interface FaviconGradientStopsConfig {
  stops: FaviconGradientStop[];
  angle?: number;
}

type FaviconGradientConfig =
  | [
      FaviconGradientStopsConfig,
      FaviconGradientStopsConfig,
      FaviconGradientStopsConfig
    ]
  | [FaviconGradientStopsConfig];

interface FaviconConfig {
  mode: FaviconMode;
  outline?: AccentColors | HexColor;
  customKey?: CustomFaviconKey;
  gradient?: FaviconGradientConfig;
  backdropGradient?: ColorGradient[];
  backdropProhibitSVG?: boolean;
}
