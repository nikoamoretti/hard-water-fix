export const site = {
  name: "Hard Water Fix",
  tagline: "Practical fixes for everyday hard-water stains and limescale.",
  description:
    "Clear, specific how-tos for hard-water stains on shower doors, dishes, faucets, and coffee makers. Written by Nico Amoretti. No fake reviews.",
  author: "Nico Amoretti",
} as const;

export const PRODUCTION_SITE_URL = "https://hard-water-fix.vercel.app";
export const LOCAL_SITE_URL = "http://localhost:3000";

type Env = Record<string, string | undefined>;

function originFromCandidate(raw: string | undefined): string | null {
  if (!raw) {
    return null;
  }

  const value = raw.trim();
  if (!value) {
    return null;
  }

  try {
    const href = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(href).origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(env: Env = process.env): string {
  const explicit = originFromCandidate(env.NEXT_PUBLIC_SITE_URL);
  if (explicit) {
    return explicit;
  }

  const vercelProduction = originFromCandidate(env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProduction) {
    return vercelProduction;
  }

  // Production / Vercel builds must never emit localhost sitemap or canonical URLs.
  if (env.VERCEL === "1" || env.VERCEL_ENV || env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  return LOCAL_SITE_URL;
}

export function absoluteUrl(pathname: string, env: Env = process.env): string {
  return new URL(pathname, getSiteUrl(env)).toString();
}
