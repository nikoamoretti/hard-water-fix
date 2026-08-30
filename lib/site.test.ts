import assert from "node:assert/strict";
import { test } from "node:test";
import { absoluteUrl, getSiteUrl } from "./site.ts";

test("local development without env uses localhost", () => {
  assert.equal(getSiteUrl({}), "http://localhost:3000");
  assert.equal(getSiteUrl({ NODE_ENV: "development" }), "http://localhost:3000");
});

test("NEXT_PUBLIC_SITE_URL wins when valid", () => {
  assert.equal(
    getSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://hard-water-fix.vercel.app/",
      VERCEL_PROJECT_PRODUCTION_URL: "other.example",
    }),
    "https://hard-water-fix.vercel.app",
  );
});

test("invalid NEXT_PUBLIC_SITE_URL is ignored", () => {
  assert.equal(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "not a url" }), "http://localhost:3000");
});

test("Vercel production domain is used when site URL is unset", () => {
  assert.equal(
    getSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "hard-water-fix.vercel.app" }),
    "https://hard-water-fix.vercel.app",
  );
});

test("production or Vercel builds never fall back to localhost", () => {
  assert.equal(getSiteUrl({ NODE_ENV: "production" }), "https://hard-water-fix.vercel.app");
  assert.equal(getSiteUrl({ VERCEL: "1" }), "https://hard-water-fix.vercel.app");
  assert.equal(getSiteUrl({ VERCEL_ENV: "preview" }), "https://hard-water-fix.vercel.app");
});

test("absoluteUrl prefixes the resolved origin", () => {
  assert.equal(
    absoluteUrl("/articles/example", { NODE_ENV: "production" }),
    "https://hard-water-fix.vercel.app/articles/example",
  );
});
