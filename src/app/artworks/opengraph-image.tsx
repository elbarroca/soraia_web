import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Artworks — Soraia Oliveira";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ArtworksOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          fontFamily: "sans-serif",
          color: "#ffffff",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#8a8580",
            marginBottom: 20,
          }}
        >
          Collection
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            marginBottom: 24,
          }}
        >
          Artworks
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#8a8580",
            lineHeight: 1.5,
          }}
        >
          Photography, drawings &amp; artist proofs by Soraia Oliveira.
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#666666",
            }}
          >
            SORAIA OLIVEIRA
          </div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#555555",
            }}
          >
            soraia-oliveira.com
          </div>
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 4,
            backgroundColor: "#ffffff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
