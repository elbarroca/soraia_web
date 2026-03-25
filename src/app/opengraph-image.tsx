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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          SORAIA OLIVEIRA
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#999999",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Visual Artist — Guimarães, Portugal
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#666666",
            marginTop: 32,
            letterSpacing: "0.05em",
          }}
        >
          Photography · Drawings · Artist Proofs · Jewelry
        </div>
      </div>
    ),
    { ...size }
  );
}
