import { ReactNode } from "react";
import HomeAnimatedBackground from "@/components/mainPage/backgroundAnimations/home/HomeAnimatedBackground";
import GlitterAnimatedBackground from "@/components/mainPage/backgroundAnimations/glitter/GlitterAnimatedBackground";
import RainbowScroll from "@/components/mainPage/backgroundAnimations/rainbow/RainbowScroll";
import ChristmasAnimatedBackground from "@/components/mainPage/backgroundAnimations/christmas/ChristmasAnimatedBackground";
import PerpetuityAnimatedBackground from "@/components/mainPage/backgroundAnimations/perpetuity/PerpetuityAnimatedBackground";
import DuskAnimatedBackground from "@/components/mainPage/backgroundAnimations/dusk/DuskAnimatedBackground";

export const backgroundAnimationMap: Record<
  ThemeAnimatedBackgroundKey,
  ReactNode
> = {
  home: <HomeAnimatedBackground />,
  glitter: <GlitterAnimatedBackground />,
  rainbow: <RainbowScroll />,
  christmas: <ChristmasAnimatedBackground />,
  perpetuity: <PerpetuityAnimatedBackground />,
  dusk: <DuskAnimatedBackground />,
};
