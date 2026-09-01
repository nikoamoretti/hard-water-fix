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

test("coffee descale articles have no 3P Dezcal Amazon ASIN", () => {
  for (const slug of [
    "how-to-descale-a-keurig-with-vinegar",
    "vinegar-vs-descaling-solution-coffee-maker",
    "how-to-descale-ninja-coffee-maker",
    "how-to-descale-cuisinart-coffee-maker",
  ]) {
    const article = getArticle(slug);
    assert.ok(article, `expected ${slug} to parse`);
    assert.doesNotMatch(article.content, /B003PSJ7F8/);
    assert.doesNotMatch(JSON.stringify(article.products), /B003PSJ7F8/);
  }
});

test("Breville descale article uses only the allowed Amazon ASIN", () => {
  const article = getArticle("how-to-descale-breville-espresso-machine");
  assert.ok(article, "expected how-to-descale-breville-espresso-machine to parse");
  assert.equal(article.slug, "how-to-descale-breville-espresso-machine");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 1);
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B0GQ51XV9R?tag=hardwaterfi04-20",
  );
  assert.match(article.content, /amazon\.com\/dp\/B0GQ51XV9R\?tag=hardwaterfi04-20/);
  assert.doesNotMatch(
    article.content,
    /B003PSJ7F8|B004NRZ6F0|B079DDC829|B00EYFKKZC|B00JOLNSFA|B00009EFEX|YOURTAG/,
  );
  assert.doesNotMatch(
    JSON.stringify(article.products),
    /B003PSJ7F8|B004NRZ6F0|B079DDC829|B00EYFKKZC|B00JOLNSFA|B00009EFEX|YOURTAG/,
  );
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

test("Cuisinart descale article parses with no amazon.com href", () => {
  const article = getArticle("how-to-descale-cuisinart-coffee-maker");
  assert.ok(article, "expected how-to-descale-cuisinart-coffee-maker to parse");
  assert.equal(article.slug, "how-to-descale-cuisinart-coffee-maker");
  assert.equal(article.date, "2026-08-31");
  assert.deepEqual(article.products, []);
  assert.match(article.content, /Dezcal/);
  assert.doesNotMatch(article.content, /amazon\.com/i);
  assert.doesNotMatch(article.content, /href=["'][^"']*amazon\.com/i);
  assert.doesNotMatch(article.content, /YOURTAG|AFF_|B003PSJ7F8|B0GQ51XV9R/);
  assert.doesNotMatch(JSON.stringify(article.products), /amazon\.com|YOURTAG|AFF_|B003PSJ7F8|B0GQ51XV9R/i);
});

test("baking soda vs vinegar article may only use B0C4G2BJKX as an Amazon ASIN", () => {
  const article = getArticle("baking-soda-vs-vinegar-hard-water-stains");
  assert.ok(article, "expected baking-soda-vs-vinegar-hard-water-stains to parse");
  assert.equal(article.slug, "baking-soda-vs-vinegar-hard-water-stains");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "CLR Calcium, Lime & Rust Remover, 80 oz");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B0C4G2BJKX?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)], ["B0C4G2BJKX"]);
  assert.doesNotMatch(haystack, /B00009EFEX|B00EYFKKZC|B003PSJ7F8|YOURTAG|\{\{AFF_/);
});
