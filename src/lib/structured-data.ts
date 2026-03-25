import type { Artwork } from "./types";
import { BASE_URL } from "./config";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Soraia Oliveira",
    url: BASE_URL,
    description:
      "Visual artist based in Guimarães, Portugal. Self-portraiture, photography, drawing, and wearable sculpture.",
  };
}

export function artistPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Soraia Oliveira",
    url: BASE_URL,
    jobTitle: "Visual Artist",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guimarães",
      addressCountry: "PT",
    },
    sameAs: ["https://instagram.com/soraiaoliveira.art"],
  };
}

export function artworkProductJsonLd(artwork: Artwork) {
  const availability = artwork.isSold
    ? "https://schema.org/SoldOut"
    : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: artwork.title,
    description: artwork.description,
    image: artwork.images[0]?.url,
    url: `${BASE_URL}/artworks/${artwork.slug}`,
    brand: {
      "@type": "Brand",
      name: "Soraia Oliveira",
    },
    offers: artwork.priceCents
      ? {
          "@type": "Offer",
          price: (artwork.priceCents / 100).toFixed(2),
          priceCurrency: "EUR",
          availability,
        }
      : undefined,
    category: artwork.category,
    material: artwork.medium,
  };
}
