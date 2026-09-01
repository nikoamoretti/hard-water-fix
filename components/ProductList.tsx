import type { Product } from "@/lib/articles";

export function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="border border-ink/20 bg-paper-shade px-5 py-5"
      aria-labelledby="recommended-products"
    >
      <h2 id="recommended-products" className="font-serif text-xl font-semibold text-ink">
        Product types that match this job
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        These are product recommendations, not reviews. Links are Amazon URLs
        with Associates tag{" "}
        <code className="font-mono text-[0.9em]">hardwaterfi04-20</code>. As an
        Amazon Associate, Hard Water Fix may earn from qualifying purchases.
      </p>
      <ul className="mt-4 grid gap-4">
        {products.map((product) => (
          <li key={product.name} className="border-t border-ink/15 pt-4 first:border-t-0 first:pt-0">
            <a
              href={product.url}
              className="font-medium text-accent underline-offset-2 hover:underline"
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
            >
              {product.name}
            </a>
            {product.note ? (
              <p className="mt-1 text-sm leading-6 text-ink">{product.note}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
