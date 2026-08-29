import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div
          style={{
            fontSize: 28,
            letterSpacing: -0.5,
            fontWeight: 600,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.15,
            fontWeight: 650,
            maxWidth: 900,
          }}
        >
          Practical fixes for hard-water stains and limescale.
        </div>
        <div style={{ fontSize: 26, color: "#4a453c" }}>{site.author}</div>
      </div>
    ),
    size,
  );
}
