import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Soraia Oliveira — Visual Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fafaf9",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative element */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid #e8e5e1",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: 200,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid #e8e5e1",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "72px 80px",
          }}
        >
          {/* Divider line */}
          <div
            style={{
              width: 48,
              height: 1,
              backgroundColor: "#8a8580",
              marginBottom: 28,
            }}
          />

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: 8,
            }}
          >
            Soraia
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: 28,
            }}
          >
            Oliveira
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 20,
              color: "#8a8580",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Visual Artist
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              color: "#a8a4a0",
              lineHeight: 1.5,
              maxWidth: 520,
            }}
          >
            Self-portraiture, photography, drawing, and experimental processes.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 80px 36px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#c4c0bb",
            }}
          >
            <span>Photography</span>
            <span style={{ color: "#e0ddd9" }}>·</span>
            <span>Drawings</span>
            <span style={{ color: "#e0ddd9" }}>·</span>
            <span>Artist Proofs</span>
          </div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c4c0bb",
            }}
          >
            Guimarães, Portugal
          </div>
        </div>

        {/* Right accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 6,
            height: "100%",
            backgroundColor: "#1a1a1a",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
