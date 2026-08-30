import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy for ${site.name}. This is a static content site with no accounts.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy — ${site.name}`,
    description: `How ${site.name} handles information.`,
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Privacy</h1>
      <div className="prose prose-neutral prose-article mt-6 max-w-none">
        <p>
          {site.name} is a static content site. There are no user accounts, no
          comments, and no checkout form on this website.
        </p>
        <h2>What this site collects</h2>
        <p>
          The pages themselves do not ask you for a name, email address, or
          payment information. If the host (for example Vercel) or your browser
          keeps standard request logs — IP address, user agent, pages requested —
          that is handled by those services under their own policies.
        </p>
        <h2>Cookies and affiliate clicks</h2>
        <p>
          This site does not set a first-party advertising cookie. If you click
          an Amazon link, Amazon may set its own cookies to attribute a later
          purchase. Those cookies are Amazon&apos;s, not ours. See Amazon&apos;s
          privacy policy for how that works.
        </p>
        <p>
          Product links use Amazon Associates tag{" "}
          <code>hardwaterfi04-20</code>. If you click one, Amazon may
          attribute a later purchase to this site.
        </p>
        <h2>Analytics</h2>
        <p>
          No third-party analytics script is bundled with this site as shipped.
          If analytics are added later, this page should be updated to name the
          tool and what it stores.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be directed to {site.author} through
          the GitHub repository for this site.
        </p>
      </div>
    </main>
  );
}
