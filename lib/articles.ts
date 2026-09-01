import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const productSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  note: z.string().min(1).optional(),
});

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  targetQuery: z.string().min(1),
  excerpt: z.string().min(1),
  products: z.array(productSchema).max(4).default([]),
});

export type Product = z.infer<typeof productSchema>;
export type ArticleMeta = z.infer<typeof frontmatterSchema>;

export type Article = ArticleMeta & {
  content: string;
  wordCount: number;
};

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function articleFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter(
      (file) =>
        !file.startsWith("_") &&
        (file.endsWith(".md") || file.endsWith(".mdx")),
    )
    .sort();
}

function toIsoDate(value: unknown): unknown {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

function parseArticle(filename: string): Article {
  const filepath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf8");
  const parsed = matter(raw);
  const frontmatter = frontmatterSchema.safeParse({
    ...parsed.data,
    date: toIsoDate(parsed.data.date),
  });

  if (!frontmatter.success) {
    const details = frontmatter.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid frontmatter in ${filename}: ${details}`);
  }

  const slugFromFile = filename.replace(/\.mdx?$/, "");

  if (frontmatter.data.slug !== slugFromFile) {
    throw new Error(
      `Slug mismatch in ${filename}: frontmatter slug "${frontmatter.data.slug}" must match filename "${slugFromFile}"`,
    );
  }

  return {
    ...frontmatter.data,
    content: parsed.content.trim(),
    wordCount: countWords(parsed.content),
  };
}

export function getArticles(): Article[] {
  return articleFiles()
    .map(parseArticle)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

export function getArticleSlugs(): string[] {
  return getArticles().map((article) => article.slug);
}

export const AFFILIATE_TAG_PLACEHOLDER = "YOURTAG";

export function isPlaceholderAffiliateUrl(url: string): boolean {
  return url.includes(`tag=${AFFILIATE_TAG_PLACEHOLDER}`);
}
