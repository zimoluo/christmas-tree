import { Metadata } from "next";
import ChristmasTreeContainer from "./christmas-tree/ChristmasTreeContainer";

export const metadata: Metadata = {
  title: "🎄 Christmas Tree",
  description: "Decorate the Christmas Tree!",
  keywords:
    "Zimo Web, Zimo Luo, Christmas Tree, Personal Website, Decorate Christmas Tree, Holiday, Special, Holiday Special, Chritmas, Christmas Tree Decoration, Holidays",
  openGraph: {
    type: "article",
    title: "Christmas Tree",
    url: `/christmas-tree`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Tree",
  },
};

export default async function ChristmasTreePage() {
  return (
    <div className="flex justify-center items-center">
      <ChristmasTreeContainer />
    </div>
  );
}

export const revalidate = 0;
