import DisplayFavicon from "@/components/assets/DisplayFavicon";

export const iconTextMap: Record<NavigationKey, string> = {
  home: "Home",
};

export const iconImageMap: Record<NavigationKey, typeof DisplayFavicon> = {
  home: DisplayFavicon,
};
