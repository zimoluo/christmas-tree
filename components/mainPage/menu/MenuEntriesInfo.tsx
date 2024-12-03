import Link from "next/link";

export default function MenuEntriesInfo() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 text-sm text-center">
      <p>Christmas Tree v{process.env.version}</p>
      <p>
        &copy; 2024 Zimo Luo. All rights reserved.{" "}
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
