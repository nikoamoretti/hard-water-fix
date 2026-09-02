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

test("clothes stain article may only use B07N4KGV2Q and B00CNJREKK as Amazon ASINs", () => {
  const article = getArticle("how-to-remove-hard-water-stains-from-clothes");
  assert.ok(article, "expected how-to-remove-hard-water-stains-from-clothes to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-stains-from-clothes");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 2);
  assert.equal(article.products[0]?.name, "Iron Out All-Purpose Powder, 2-pack (IO65N)");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B07N4KGV2Q?tag=hardwaterfi04-20",
  );
  assert.equal(article.products[1]?.name, "Calgon Water Softener Liquid, 32 oz");
  assert.equal(
    article.products[1]?.url,
    "https://www.amazon.com/dp/B00CNJREKK?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)].sort(), ["B00CNJREKK", "B07N4KGV2Q"]);
  assert.doesNotMatch(haystack, /B00JOLNSFA|B016TQJGDK|B000VCFAXO|YOURTAG|\{\{AFF_/);
});

test("steam iron descale article may only use B07VD4KN28 as an Amazon ASIN", () => {
  const article = getArticle("how-to-descale-steam-iron");
  assert.ok(article, "expected how-to-descale-steam-iron to parse");
  assert.equal(article.slug, "how-to-descale-steam-iron");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "Amazon Grocery Distilled Water, 1 gallon");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B07VD4KN28?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)], ["B07VD4KN28"]);
  assert.doesNotMatch(
    haystack,
    /XD9060E0|XD9070E0|ZR850001|YOURTAG|\{\{AFF_|B00EYFKKZC|B003PSJ7F8|B0GQ51XV9R/,
  );
});

test("prevent shower door stains article may only use B000CCDBRK and B0D6X4PSZ3 as Amazon ASINs", () => {
  const article = getArticle("how-to-prevent-hard-water-stains-on-shower-doors");
  assert.ok(article, "expected how-to-prevent-hard-water-stains-on-shower-doors to parse");
  assert.equal(article.slug, "how-to-prevent-hard-water-stains-on-shower-doors");
  assert.equal(article.products.length, 2);
  assert.equal(article.products[0]?.name, "OXO Good Grips All-Purpose Squeegee");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B000CCDBRK?tag=hardwaterfi04-20",
  );
  assert.equal(article.products[1]?.name, "Rain-X Shower Door Water Repellent, 16 oz (2-pack)");
  assert.equal(
    article.products[1]?.url,
    "https://www.amazon.com/dp/B0D6X4PSZ3?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)].sort(), ["B000CCDBRK", "B0D6X4PSZ3"]);
  assert.doesNotMatch(haystack, /B01DXKZ7EM|YOURTAG|\{\{AFF_/);
});

test("etched shower glass article may only use B007460F7Q and B0D6X4PSZ3 as Amazon ASINs", () => {
  const article = getArticle("how-to-restore-etched-shower-glass");
  assert.ok(article, "expected how-to-restore-etched-shower-glass to parse");
  assert.equal(article.slug, "how-to-restore-etched-shower-glass");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 2);
  assert.equal(article.products[0]?.name, "3M Glass Polishing Compound 60150");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B007460F7Q?tag=hardwaterfi04-20",
  );
  assert.equal(article.products[1]?.name, "Rain-X Shower Door Water Repellent, 16 oz (2-pack)");
  assert.equal(
    article.products[1]?.url,
    "https://www.amazon.com/dp/B0D6X4PSZ3?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)].sort(), ["B007460F7Q", "B0D6X4PSZ3"]);
  assert.doesNotMatch(haystack, /B01DXKZ7EM|YOURTAG|\{\{AFF_|nufinish\.com/i);
});

test("windows stain article may only use B0C4G2BJKX as an Amazon ASIN", () => {
  const article = getArticle("how-to-remove-hard-water-stains-from-windows");
  assert.ok(article, "expected how-to-remove-hard-water-stains-from-windows to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-stains-from-windows");
  assert.equal(article.date, "2026-08-31");
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
  assert.doesNotMatch(haystack, /B07VD4KN28|B00009EFEX|B0D6X4PSZ3|YOURTAG|\{\{AFF_/);
});

test("shower tile article may only use B0C4G2BJKX as an Amazon ASIN", () => {
  const article = getArticle("how-to-remove-hard-water-stains-from-shower-tile");
  assert.ok(article, "expected how-to-remove-hard-water-stains-from-shower-tile to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-stains-from-shower-tile");
  assert.equal(article.date, "2026-08-31");
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
  assert.doesNotMatch(haystack, /B00009EFEX|Lime-A-Way|YOURTAG|\{\{AFF_/);
  assert.doesNotMatch(haystack, /brilliantbath\.com/i);
});

test("porcelain sink article may only use B0C4G2BJKX and B07N4KGV2Q as Amazon ASINs", () => {
  const article = getArticle("how-to-remove-hard-water-stains-from-porcelain-sink");
  assert.ok(article, "expected how-to-remove-hard-water-stains-from-porcelain-sink to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-stains-from-porcelain-sink");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 2);
  assert.equal(article.products[0]?.name, "CLR Calcium, Lime & Rust Remover, 80 oz");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B0C4G2BJKX?tag=hardwaterfi04-20",
  );
  assert.equal(article.products[1]?.name, "Iron Out All-Purpose Powder, 2-pack");
  assert.equal(
    article.products[1]?.url,
    "https://www.amazon.com/dp/B07N4KGV2Q?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)].sort(), ["B07N4KGV2Q", "B0C4G2BJKX"]);
  assert.doesNotMatch(haystack, /B00B28ZYPU|B00JOLNSFA|B00009EFEX|YOURTAG|\{\{AFF_/);
});

test("windshield spots article may only use B007460F7Q as an Amazon ASIN", () => {
  const article = getArticle("how-to-remove-hard-water-spots-from-car-windshield");
  assert.ok(article, "expected how-to-remove-hard-water-spots-from-car-windshield to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-spots-from-car-windshield");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "3M Glass Polishing Compound 60150");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B007460F7Q?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)], ["B007460F7Q"]);
  assert.doesNotMatch(haystack, /B0D6X4PSZ3|B07VD4KN28|B01DXKZ7EM|YOURTAG|\{\{AFF_/);
});

test("bathroom mirror article may only use B07VD4KN28 as an Amazon ASIN", () => {
  const article = getArticle("how-to-remove-hard-water-stains-from-bathroom-mirror");
  assert.ok(article, "expected how-to-remove-hard-water-stains-from-bathroom-mirror to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-stains-from-bathroom-mirror");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "Amazon Grocery Distilled Water, 1 gal");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B07VD4KN28?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)], ["B07VD4KN28"]);
  assert.doesNotMatch(haystack, /B0C4G2BJKX|B0D6X4PSZ3|B000WNED08|B007460F7Q|YOURTAG|\{\{AFF_/);
});

test("humidifier white dust article may only use B07VD4KN28 as an Amazon ASIN", () => {
  const article = getArticle("humidifier-white-dust-hard-water");
  assert.ok(article, "expected humidifier-white-dust-hard-water to parse");
  assert.equal(article.slug, "humidifier-white-dust-hard-water");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "Amazon Grocery Distilled Water, 1 gal");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B07VD4KN28?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)], ["B07VD4KN28"]);
  assert.doesNotMatch(haystack, /YOURTAG|\{\{AFF_/);
});

test("Hamilton Beach descale article may not contain any Amazon ASIN or amazon.com URL", () => {
  const article = getArticle("how-to-descale-hamilton-beach-coffee-maker");
  assert.ok(article, "expected how-to-descale-hamilton-beach-coffee-maker to parse");
  assert.equal(article.slug, "how-to-descale-hamilton-beach-coffee-maker");
  assert.equal(article.date, "2026-09-01");
  assert.deepEqual(article.products, []);

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.deepEqual(amazonAsins, []);
  assert.doesNotMatch(article.content, /amazon\.com/i);
  assert.doesNotMatch(article.content, /YOURTAG|\{\{AFF_/);
  assert.doesNotMatch(haystack, /amazon\.com|YOURTAG|\{\{AFF_/i);
});

test("Mr. Coffee descale article may not contain any Amazon ASIN or amazon.com URL", () => {
  const article = getArticle("how-to-descale-mr-coffee");
  assert.ok(article, "expected how-to-descale-mr-coffee to parse");
  assert.equal(article.slug, "how-to-descale-mr-coffee");
  assert.equal(article.date, "2026-09-02");
  assert.deepEqual(article.products, []);

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.deepEqual(amazonAsins, []);
  assert.doesNotMatch(article.content, /amazon\.com/i);
  assert.doesNotMatch(article.content, /YOURTAG|\{\{AFF_/);
  assert.doesNotMatch(haystack, /amazon\.com|YOURTAG|\{\{AFF_/i);
});

test("coffee carafe stain article may only use B07VD4KN28 as an Amazon ASIN", () => {
  const article = getArticle("how-to-remove-hard-water-stains-from-coffee-carafe");
  assert.ok(article, "expected how-to-remove-hard-water-stains-from-coffee-carafe to parse");
  assert.equal(article.slug, "how-to-remove-hard-water-stains-from-coffee-carafe");
  assert.equal(article.date, "2026-08-31");
  assert.equal(article.products.length, 1);
  assert.equal(article.products[0]?.name, "Amazon Grocery Distilled Water, 1 gal");
  assert.equal(
    article.products[0]?.url,
    "https://www.amazon.com/dp/B07VD4KN28?tag=hardwaterfi04-20",
  );

  const haystack = `${article.content}\n${JSON.stringify(article.products)}`;
  const amazonAsins = [
    ...haystack.matchAll(/amazon\.com\/(?:[\w%.-]+\/)*dp\/([A-Z0-9]{10})/gi),
  ].map((match) => match[1].toUpperCase());

  assert.ok(amazonAsins.length > 0, "expected at least one Amazon ASIN");
  assert.deepEqual([...new Set(amazonAsins)], ["B07VD4KN28"]);
  assert.doesNotMatch(haystack, /YOURTAG|\{\{AFF_/);
});
