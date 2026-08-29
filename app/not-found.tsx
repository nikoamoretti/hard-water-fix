import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-lg leading-8">
        That URL does not match an article or a site page.
      </p>
      <p className="mt-6">
        <Link href="/" className="font-medium text-accent underline">
          Back to articles
        </Link>
      </p>
    </main>
  );
}
