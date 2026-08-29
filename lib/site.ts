export const site = {
  name: "Hard Water Fix",
  tagline: "Practical fixes for everyday hard-water stains and limescale.",
  description:
    "Clear, specific how-tos for hard-water stains on shower doors, dishes, faucets, and coffee makers. Written by Nico Amoretti. No fake reviews.",
  author: "Nico Amoretti",
} as const;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;

  if (!raw) {
    return "http://localhost:3000";
  }

  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}
