import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/disclosure", label: "Disclosure" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-ink/15 bg-paper">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-ink no-underline"
          >
            {site.name}
          </Link>
          <p className="mt-1 max-w-md text-sm text-ink-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Primary" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
