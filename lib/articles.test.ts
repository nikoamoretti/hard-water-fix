import assert from "node:assert/strict";
import { test } from "node:test";
import { getArticle, getArticles } from "./articles.ts";

test("all published articles parse and slugs match filenames", () => {
  const articles = getArticles();
  assert.ok(articles.length > 0, "expected published articles");

  const slugs = new Set(articles.map((article) => article.slug));
  assert.equal(slugs.size, articles.length, "article slugs must be unique");
});

test("Instant Pot article is published without Amazon products", () => {
  const article = getArticle("how-to-descale-instant-pot");
  assert.ok(article, "expected how-to-descale-instant-pot to parse");
  assert.equal(article.slug, "how-to-descale-instant-pot");
  assert.equal(article.date, "2026-08-31");
  assert.deepEqual(article.products, []);
  assert.match(article.content, /There is no Descale button on an Instant Pot/);
  assert.doesNotMatch(article.content, /amazon\.com/i);
  assert.doesNotMatch(article.content, /YOURTAG/);
  assert.doesNotMatch(article.content, /B00EYFKKZC/);
});
