import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description: `FTC affiliate disclosure for ${site.name}, including placeholder Amazon Associates tags.`,
  alternates: { canonical: "/disclosure" },
  openGraph: {
    title: `Affiliate disclosure — ${site.name}`,
    description: `How affiliate links work on ${site.name}.`,
    url: "/disclosure",
    type: "website",
  },
};

export default function DisclosurePage() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Affiliate disclosure
      </h1>
      <div className="prose prose-neutral prose-article mt-6 max-w-none">
        <p>
          {site.name} is an affiliate website. That means some links on article
          pages may earn a commission if you click them and later buy something.
          The price you pay does not change.
        </p>
        <p>
          This is the disclosure required by the Federal Trade Commission for
          material connections between a publisher and a seller.
        </p>
        <h2>Amazon links on this site</h2>
        <p>
          Product boxes use Amazon search URLs in this shape:
        </p>
        <p>
          <code>https://www.amazon.com/s?k=QUERY&amp;tag=YOURTAG</code>
        </p>
        <p>
          <strong>YOURTAG is a placeholder.</strong> It is not a real Amazon
          Associates tracking ID. Those links will not credit an Associates
          account and will not pay a commission until someone who owns this
          site replaces <code>YOURTAG</code> with their own tag after joining
          Amazon Associates.
        </p>
        <p>
          Articles recommend product <em>types</em> (a calcium-lime-rust
          cleaner, distilled white vinegar, rinse aid, a shower filter, a
          coffee-machine descaler, microfiber cloths). They do not claim to
          have tested every listing that appears in an Amazon search, and they
          do not invent star ratings or “editor’s choice” scores.
        </p>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not invent reviews or user testimonials.</li>
          <li>We do not invent traffic or revenue numbers.</li>
          <li>We do not hide that a link is an affiliate link.</li>
        </ul>
        <p>
          Every article also carries a short version of this notice at the top
          of the page.
        </p>
      </div>
    </main>
  );
}
