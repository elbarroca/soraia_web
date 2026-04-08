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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://soraia-oliveira.com";
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
  const imageUrl = artwork.images[0]?.url;
  const absoluteImage = imageUrl?.startsWith("http")
    ? imageUrl
    : imageUrl
      ? `${baseUrl}${imageUrl}`
      : null;

  const priceText = artwork.isSold
    ? "SOLD"
    : artwork.isPriceOnRequest
      ? "Price on request"
      : artwork.priceCents
        ? `€${(artwork.priceCents / 100).toLocaleString("en-EU")}`
        : "";

  const details = [artwork.medium, artwork.dimensions, artwork.year]
    .filter(Boolean)
    .join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#1a1a1a",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Left: artwork image */}
        {absoluteImage && (
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
              src={absoluteImage}
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
            width: absoluteImage ? "50%" : "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 48px 48px 24px",
          }}
        >
          {/* Category label */}
          <div
            style={{
              fontSize: 12,
              color: "#8a8580",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {artwork.category.replaceAll("-", " ")}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {artwork.title}
          </div>

          {/* Price */}
          {priceText && (
            <div
              style={{
                fontSize: 22,
                color: artwork.isSold ? "#666666" : "#ffffff",
                marginBottom: 20,
              }}
            >
              {priceText}
            </div>
          )}

          {/* Details */}
          {details && (
            <div
              style={{
                fontSize: 14,
                color: "#666666",
                letterSpacing: "0.02em",
              }}
            >
              {details}
            </div>
          )}

          {/* Branding footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
              paddingTop: 24,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#666666",
                letterSpacing: "0.04em",
              }}
            >
              SORAIA OLIVEIRA
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#555555",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              soraia-oliveira.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
