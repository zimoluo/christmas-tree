import MenuEntriesInfo from "./MenuEntriesInfo";
import MenuEntriesSettings from "./MenuEntriesSettings";
import MenuEntriesTitle from "./MenuEntriesTitle";

export const menuNavigationItems = [
  "home",
  "photos",
  "blog",
  "projects",
  "about",
  "design",
  "themeMaker",
  "notebook",
  "management",
];

export default function MenuEntriesLayout() {
  return (
    <div className="h-full w-full overflow-y-auto px-6 md:px-8 py-8">
      <div className="rounded-full w-full bg-light bg-opacity-65 shadow-lg px-4 py-4 mt-8 mb-14 flex items-center">
        <MenuEntriesTitle />
      </div>

      <div className="rounded-2xl w-full bg-light bg-opacity-65 shadow-lg px-6 pt-6 pb-6 my-8 text-lg md:text-xl grid grid-cols-1 gap-4">
        <MenuEntriesSettings />
      </div>

      <MenuEntriesInfo />
    </div>
  );
}
