import Link from "next/link";

export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className="border border-ink/20 bg-paper-shade px-4 py-3 text-sm leading-6 text-ink"
      aria-label="Affiliate disclosure"
    >
      <p>
        <strong>Affiliate disclosure.</strong>{" "}
        {compact
          ? "This article contains Amazon affiliate links. As an Amazon Associate, Hard Water Fix may earn a commission at no extra cost to you."
          : "Hard Water Fix is an affiliate site. Product links use Amazon Associates tag hardwaterfi04-20. As an Amazon Associate, we may earn a commission if you buy through those links, at no extra cost to you."}{" "}
        <Link href="/disclosure" className="underline">
          Full disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
