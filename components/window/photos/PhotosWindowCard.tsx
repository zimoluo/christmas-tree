import Image from "next/image";
import { useEntryWindow } from "@/components/contexts/EntryWindowContext";
import { trimTitleText } from "@/lib/photos/helper";
import { formatDate } from "@/lib/dateUtil";
import { useTheme } from "@/components/contexts/ThemeContext";
import { generateShadeMap } from "@/lib/themeMaker/colorHelper";
import { rgb } from "color-convert";
import { useMemo } from "react";

export default function PhotosWindowCard(entry: PhotosEntry) {
  const { setSlug, setIsMenuOpen, slug: currentSlug } = useEntryWindow();
  const { themeConfig } = useTheme();
  const cardTextColor = useMemo(
    () =>
      generateShadeMap(
        `#${rgb.hex(themeConfig.palette.primary).toLowerCase()}`,
        24
      ).shadeMap[0],
    [themeConfig.palette.primary]
  );

  const [widthRatio, heightRatio] = entry.images.aspectRatio
    .split(":")
    .map(Number);

  const titleText = trimTitleText(entry.title, 50);
  const date = formatDate(entry.date);

  return (
    <button
      className="w-full group text-start shadow-lg rounded-xl overflow-hidden"
      onClick={() => {
        if (entry.slug !== currentSlug) {
          setSlug(entry.slug);
        }
        setIsMenuOpen(false);
      }}
    >
      <div
        className="w-full h-28 px-4 py-4 backdrop-blur-lg bg-widget-70 relative font-bold"
        style={{ color: cardTextColor }}
      >
        <div className="w-full h-full absolute top-0 left-0">
          <Image
            src={entry.images.url[0]}
            alt="First photo of the post"
            width={400}
            height={(400 / widthRatio) * heightRatio}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-45 group-hover:opacity-80 transition-opacity duration-300 ease-out" />
        <p className="relative opacity-90 text-lg">{titleText}</p>
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2 w-full">
          <Image
            src={entry.authorProfile}
            alt="The profile picture of "
            width={80}
            height={80}
            className="w-auto h-6 aspect-square rounded-full shrink-0"
          />
          <p>{entry.author}</p>
          <p className="opacity-90 flex-grow text-end">{date}</p>
          <div
            className="h-0 w-5 pointer-events-none select-none touch-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  );
}
