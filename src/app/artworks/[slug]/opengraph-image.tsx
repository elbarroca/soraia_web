import { ImageResponse } from "next/og";
import { getArtworkBySlug } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";

export const runtime = "edge";
export const alt = "Artwork by Soraia Oliveira";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ArtworkOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbArtwork = await getArtworkBySlug(slug);

  if (!dbArtwork) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            fontSize: 48,
          }}
        >
          Artwork Not Found
        </div>
      ),
      { ...size }
    );
  }

  const artwork = toPublicArtwork(dbArtwork);
  const priceText = artwork.isSold
    ? "SOLD"
    : artwork.isPriceOnRequest
      ? "Price on request"
      : artwork.priceCents
        ? `€${(artwork.priceCents / 100).toLocaleString("en-EU")}`
        : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: artwork image */}
        {artwork.images[0]?.url && (
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <img
              src={artwork.images[0].url}
              alt={artwork.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* Right: info */}
        <div
          style={{
            width: artwork.images[0]?.url ? "50%" : "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#999999",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {artwork.category.replaceAll("-", " ")}
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            {artwork.title}
          </div>
          {priceText && (
            <div
              style={{
                fontSize: 24,
                color: artwork.isSold ? "#999999" : "#ffffff",
                marginBottom: 24,
              }}
            >
              {priceText}
            </div>
          )}
          <div
            style={{
              fontSize: 16,
              color: "#666666",
              marginTop: "auto",
            }}
          >
            SORAIA OLIVEIRA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
