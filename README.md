# Hard Water Fix

A small daily site about hard-water stains and limescale: shower doors, cloudy dishes, coffee-maker scale, faucet crust, washer residue.

There is no login and no admin panel. Tomorrow’s article is a markdown file. After you add the file, rebuild (or let the host rebuild) and the new post shows up on the home page, in the sitemap, and at its own URL.

Written by Nico Amoretti. Product boxes are Amazon Associates links using tracking ID `hardwaterfi04-20`. As an Amazon Associate, the site may earn from qualifying purchases.

## Pages

- `/` — what the site is, plus the latest articles
- `/articles/your-slug` — one article
- `/about`
- `/disclosure` — FTC affiliate disclosure
- `/privacy`
- `/sitemap.xml` and `/robots.txt`

## Add tomorrow’s article (no coding)

1. Open the folder `content/articles`.
2. Copy `_template.md` and rename the copy so the filename matches the slug you want.
   - Example filename: `hard-water-stains-on-faucet.md`
   - That article will live at `/articles/hard-water-stains-on-faucet`
3. Edit the top section between the `---` lines. Every field is required:

   - **title** — the headline people see, and the browser tab title
   - **slug** — lowercase words separated by hyphens. Must match the filename (without `.md`)
   - **date** — `YYYY-MM-DD` in quotes (example: `"2026-08-30"`). Quotes keep the date a string so the build does not treat it as a calendar object.
   - **targetQuery** — the search phrase this article is written for
   - **excerpt** — one or two sentences. This is the meta description and the home-page blurb
   - **products** — one to four products, each with a name, an Amazon URL (`/dp/` or search), and an optional note

4. Write the article under the second `---`. Aim for about 1,000–1,400 words. Be specific. Do not invent reviews, ratings, or traffic numbers.
5. For each product URL, keep this shape:

   `https://www.amazon.com/s?k=WHAT+PEOPLE+WOULD+SEARCH&tag=hardwaterfi04-20`

   Use Associates tag `hardwaterfi04-20` on every product URL. Leave the rest of the URL alone.
6. Save the file.
7. Rebuild the site (see below). Refresh the home page. The newest **date** appears first.

Files that start with `_` (like the template) are ignored on purpose. Do not remove the underscore from the template itself unless you want that sample published.

## Run it on your computer

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

`npm run build` is the check that the site is ready to publish. It will fail if an article’s frontmatter is missing a field, if the slug does not match the filename, or if you list fewer than two or more than four products.

## Publish

Connect this GitHub repo to [Vercel](https://vercel.com) (or another Next.js host). Set the environment variable:

- `NEXT_PUBLIC_SITE_URL` — your live domain, including `https://`, no trailing slash  
  Example: `https://www.example.com`

Each push rebuilds the site. Adding a markdown file and pushing it is enough to publish the next daily post.

## House style

- Practical and specific. Include dwell times, dilutions, and “do not mix” warnings when they matter.
- No fake reviews. Recommend product *types* (vinegar, CLR, rinse aid, shower filter, descaling solution, microfiber), not a made-up ranking.
- Affiliate disclosure stays on every article automatically. Do not delete it from the layout.
- Product Amazon URLs use Associates tag `hardwaterfi04-20`.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, markdown files in `content/articles` with YAML frontmatter. Articles are read at build time.
