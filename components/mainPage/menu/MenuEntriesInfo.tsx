import Link from "next/link";

const currentYear = new Date().getFullYear();
const displayYear = currentYear > 2024 ? `2024-${currentYear}` : "2024";

export default function MenuEntriesInfo() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 text-sm text-center">
      <p>
        Christmas Tree v
        <span className="font-tabular">{process.env.version}</span>
      </p>
      <p>
        &copy; {displayYear} Zimo Luo. All rights reserved.{" "}
        <Link
          target="_blank"
          href="https://github.com/zimoluo/christmas-tree"
          className="hover:underline underline-offset-2"
        >
          Source
        </Link>
        &nbsp;available.
      </p>
      <p>
        Software released under{" "}
        <Link
          target="_blank"
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          className="hover:underline underline-offset-2"
        >
          GNU&nbsp;AGPL&nbsp;3.0
        </Link>
        .
      </p>
    </div>
  );
}
