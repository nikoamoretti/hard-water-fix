import { ImageResponse } from "next/og";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4efe6",
          color: "#161410",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 600 }}>{site.name}</div>
        <div
          style={{
            fontSize: title.length > 70 ? 48 : 58,
            lineHeight: 1.15,
            fontWeight: 650,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: "#4a453c" }}>
          {article?.targetQuery ?? site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
