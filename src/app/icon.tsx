import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/*
         * "SO" as a tight monogram: two letters rendered at 13px each
         * with -1px letter-spacing to pull them into a single mark.
         * Condensed weight gives maximum readability at 32×32 and 16×16.
         */}
        <span
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "-1px",
            color: "#1a1a1a",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          SO
        </span>
      </div>
    ),
    { ...size }
  );
}
