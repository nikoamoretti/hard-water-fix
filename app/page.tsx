import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { getArticles } from "@/lib/articles";
import { getSiteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  const articles = getArticles();

  return (
    <main id="content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: getSiteUrl(),
          description: site.description,
          publisher: {
            "@type": "Person",
            name: site.author,
          },
        }}
      />
      <section className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Hard water leaves a film. These are the steps that remove it.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink">
          {site.name} is {site.author}&apos;s daily site for everyday limescale
          problems: cloudy shower doors, white film on dishes, crusty faucets,
          coffee-maker scale, washer residue. The writing is specific. If a
          method has a time limit or a warranty warning, it is in the article.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="latest-articles">
        <h2
          id="latest-articles"
          className="font-serif text-2xl font-semibold tracking-tight text-ink"
        >
          Latest articles
        </h2>
        <div className="mt-6">
          {articles.length === 0 ? (
            <p className="text-ink-muted">No articles published yet.</p>
          ) : (
            articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))
          )}
        </div>
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-6 text-ink-muted">
        Product links are Amazon Associates URLs (tag hardwaterfi04-20).
        They are not reviews and they are not paid placements.{" "}
        <Link href="/disclosure" className="underline">
          Disclosure
        </Link>
        .
      </p>
    </main>
  );
}
