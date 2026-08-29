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
          ? "This article contains placeholder Amazon search links. If those links later use a real Associates tag, Hard Water Fix may earn a commission at no extra cost to you."
          : "Hard Water Fix is an affiliate site. Product boxes use Amazon search URLs with the placeholder tag YOURTAG — that is not a real Associates tag and will not pay a commission until it is replaced. When a real tag is added, we may earn a commission if you buy through those links, at no extra cost to you."}{" "}
        <Link href="/disclosure" className="underline">
          Full disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
