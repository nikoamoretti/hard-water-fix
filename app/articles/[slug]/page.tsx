import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { ProductList } from "@/components/ProductList";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  const title = article.title;
  const description = article.excerpt;
  const url = `/articles/${article.slug}`;

  return {
    title,
    description,
    keywords: [article.targetQuery, "hard water", "limescale"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.date,
      authors: [site.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const url = absoluteUrl(`/articles/${article.slug}`);

  return (
    <main id="content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.date,
          author: {
            "@type": "Person",
            name: site.author,
          },
          publisher: {
            "@type": "Organization",
            name: site.name,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          keywords: article.targetQuery,
          wordCount: article.wordCount,
          url,
        }}
      />
      <p className="text-sm text-ink-muted">{formatDate(article.date)}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-[2.6rem] sm:leading-tight">
        {article.title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-ink">{article.excerpt}</p>
      <p className="mt-3 text-sm text-ink-muted">
        Written for the search: <span className="text-ink">{article.targetQuery}</span>
      </p>

      {article.products.length > 0 ? (
        <div className="mt-6">
          <AffiliateDisclosure compact />
        </div>
      ) : null}

      <article className="prose prose-neutral prose-article mt-10 max-w-none">
        <Markdown content={article.content} />
      </article>

      {article.products.length > 0 ? (
        <div className="mt-12">
          <ProductList products={article.products} />
        </div>
      ) : null}
    </main>
  );
}
