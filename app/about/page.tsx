import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Who writes ${site.name} and how product recommendations work.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: `Who writes ${site.name} and how product recommendations work.`,
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">About</h1>
      <div className="prose prose-neutral prose-article mt-6 max-w-none">
        <p>
          {site.name} is a small daily site by {site.author}. The niche is
          narrow on purpose: the stains and scale hard water leaves on things
          people use every day. Shower glass. Faucets. Dishwashers. Coffee
          makers. Washing machines. White film that will not wipe off.
        </p>
        <p>
          The voice is practical. Each article is written around one search
          query, then filled with steps you can actually follow — dwell times,
          dilutions, what to try first, and when a cloudy surface is etched
          instead of dirty. There are no invented before-and-after stories and
          no fake product reviews.
        </p>
        <p>
          When an article names a product type (CLR, rinse aid, a shower
          filter, a descaling solution), that is because the chemistry or the
          manufacturer instructions point there. Links go to Amazon search
          pages so you can pick a current listing. They currently use the
          placeholder tag <code>YOURTAG</code>. That is not a real Associates
          tag. See the{" "}
          <Link href="/disclosure">affiliate disclosure</Link>.
        </p>
        <p>
          Tomorrow&apos;s post is a new markdown file in{" "}
          <code>content/articles</code>. There is no login and no CMS.
        </p>
      </div>
    </main>
  );
}
