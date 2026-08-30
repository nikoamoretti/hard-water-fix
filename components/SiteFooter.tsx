import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <p className="max-w-md">
          {site.name} is a daily how-to site by {site.author}. Some links are
          Amazon Associates links. See the{" "}
          <Link href="/disclosure" className="text-ink underline">
            disclosure
          </Link>
          .
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/about" className="text-ink underline-offset-2 hover:underline">
            About
          </Link>
          <Link href="/disclosure" className="text-ink underline-offset-2 hover:underline">
            Disclosure
          </Link>
          <Link href="/privacy" className="text-ink underline-offset-2 hover:underline">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
