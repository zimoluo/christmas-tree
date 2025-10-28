import { ReactNode } from "react";
import HomeAnimatedBackground from "@/components/mainPage/backgroundAnimations/home/HomeAnimatedBackground";
import GlitterAnimatedBackground from "@/components/mainPage/backgroundAnimations/glitter/GlitterAnimatedBackground";
import ChristmasAnimatedBackground from "@/components/mainPage/backgroundAnimations/christmas/ChristmasAnimatedBackground";
import DuskAnimatedBackground from "@/components/mainPage/backgroundAnimations/dusk/DuskAnimatedBackground";
import CelebrationAnimatedBackground from "@/components/mainPage/backgroundAnimations/celebration/CelebrationAnimatedBackground";
import CrimsonAnimatedBackground from "@/components/mainPage/backgroundAnimations/crimson/CrimsonAnimatedBackground";
import GalleryAnimatedBackground from "@/components/mainPage/backgroundAnimations/gallery/GalleryAnimatedBackground";
import UnderwaterAnimatedBackground from "@/components/mainPage/backgroundAnimations/underwater/UnderwaterAnimatedBackground";

export const backgroundAnimationMap: Record<
  ThemeAnimatedBackgroundKey,
  ReactNode
> = {
  home: <HomeAnimatedBackground />,
  glitter: <GlitterAnimatedBackground />,
  christmas: <ChristmasAnimatedBackground />,
  dusk: <DuskAnimatedBackground />,
  celebration: <CelebrationAnimatedBackground />,
  crimson: <CrimsonAnimatedBackground />,
  gallery: <GalleryAnimatedBackground />,
  underwater: <UnderwaterAnimatedBackground />,
};
