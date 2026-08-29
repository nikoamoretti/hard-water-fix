import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/dates";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="border-t border-ink/15 py-6 first:border-t-0 first:pt-0">
      <p className="text-sm text-ink-muted">{formatDate(article.date)}</p>
      <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-ink">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 max-w-2xl text-base leading-7 text-ink">{article.excerpt}</p>
      <p className="mt-3">
        <Link
          href={`/articles/${article.slug}`}
          className="text-sm font-medium text-accent underline-offset-2 hover:underline"
        >
          Read the steps
        </Link>
      </p>
    </article>
  );
}
