import assert from "node:assert/strict";
import { test } from "node:test";
import { getArticle, getArticles } from "./articles.ts";

test("all published articles parse and slugs match filenames", () => {
  const articles = getArticles();
  assert.ok(articles.length > 0, "expected published articles");

  const slugs = new Set(articles.map((article) => article.slug));
  assert.equal(slugs.size, articles.length, "article slugs must be unique");
});

test("rust toilet article names Iron Out with no 3P Amazon ASINs", () => {
  const article = getArticle("how-to-remove-rust-stains-from-toilet-hard-water");
  assert.ok(article, "expected rust toilet article to parse");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "Bar Keepers Friend Powdered Cleanser, 12 oz (2-pack)");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B07JGH35XZ?tag=hardwaterfi04-20",
  );
  assert.match(article.content, /Iron Out/);
  assert.match(article.content, /amazon\.com\/dp\/B07JGH35XZ\?tag=hardwaterfi04-20/);
  assert.doesNotMatch(article.content, /B00JOLNSFA/);
  assert.doesNotMatch(article.content, /B016TQJGDK/);
  assert.doesNotMatch(article.content, /YOURTAG/);
  assert.doesNotMatch(JSON.stringify(article.products), /B00JOLNSFA|B016TQJGDK|YOURTAG/);
});

test("CLR vs Iron Out article uses only the allowed Amazon ASINs", () => {
  const article = getArticle("clr-vs-iron-out");
  assert.ok(article, "expected clr-vs-iron-out to parse");
  assert.equal(article.slug, "clr-vs-iron-out");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 2);
  assert.equal(article.products[0]?.url, "https://www.amazon.com/dp/B0C4G2BJKX?tag=hardwaterfi04-20");
  assert.equal(article.products[1]?.url, "https://www.amazon.com/dp/B07N4KGV2Q?tag=hardwaterfi04-20");
  assert.match(article.content, /amazon\.com\/dp\/B0C4G2BJKX\?tag=hardwaterfi04-20/);
  assert.match(article.content, /amazon\.com\/dp\/B07N4KGV2Q\?tag=hardwaterfi04-20/);
  assert.doesNotMatch(article.content, /B00JOLNSFA|B016TQJGDK|B00009EFEX|YOURTAG/);
  assert.doesNotMatch(JSON.stringify(article.products), /B00JOLNSFA|B016TQJGDK|B00009EFEX|YOURTAG/);
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
