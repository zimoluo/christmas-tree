import { ReactNode } from "react";
import HomeAnimatedBackground from "@/components/mainPage/backgroundAnimations/home/HomeAnimatedBackground";
import GlitterAnimatedBackground from "@/components/mainPage/backgroundAnimations/glitter/GlitterAnimatedBackground";
import ChristmasAnimatedBackground from "@/components/mainPage/backgroundAnimations/christmas/ChristmasAnimatedBackground";
import DuskAnimatedBackground from "@/components/mainPage/backgroundAnimations/dusk/DuskAnimatedBackground";
import CelebrationAnimatedBackground from "@/components/mainPage/backgroundAnimations/celebration/CelebrationAnimatedBackground";
import GalleryAnimatedBackground from "@/components/mainPage/backgroundAnimations/gallery/GalleryAnimatedBackground";
import UnderwaterAnimatedBackground from "@/components/mainPage/backgroundAnimations/underwater/UnderwaterAnimatedBackground";
import EventideAnimatedBackground from "@/components/mainPage/backgroundAnimations/eventide/EventideAnimatedBackground";

export const backgroundAnimationMap: Record<
  ThemeAnimatedBackgroundKey,
  ReactNode
> = {
  home: <HomeAnimatedBackground />,
  glitter: <GlitterAnimatedBackground />,
  christmas: <ChristmasAnimatedBackground />,
  dusk: <DuskAnimatedBackground />,
  celebration: <CelebrationAnimatedBackground />,
  gallery: <GalleryAnimatedBackground />,
  underwater: <UnderwaterAnimatedBackground />,
  eventide: <EventideAnimatedBackground />,
};
