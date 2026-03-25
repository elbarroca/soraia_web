import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
        }}
      >
        {/*
         * Inverted from the favicon: white mark on dark field.
         * At 180×180 we can afford more generous spacing — the letters
         * breathe slightly more but remain a single cohesive mark.
         * The 2px border provides the gallery-frame containment.
         */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 144,
            height: 144,
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <span
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-4px",
              color: "#ffffff",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            SO
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
