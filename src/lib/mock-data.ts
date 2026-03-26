/**
 * Real content scraped from soraia-oliveira.com for local development.
 * Used as fallback when DB queries fail.
 */

import type { Artwork, ArtworkImage, Exhibition, NewsItem } from "./types";

// ─── Site Settings (real content from original site) ───

export const mockSettings: Record<string, string> = {
  hero_statement: "VISUAL ARTIST BASED IN PORTUGAL, GUIMARAES.",
  hero_tagline:
    "Self-portraiture, photography and drawing, exploring experimental printing and performance.",
  about_intro:
    "I'm Soraia, a multidisciplinary artist working with photography, drawing, self-portraiture and experimental processes.",
  about_bio: JSON.stringify([
    "Soraia Oliveira graduated in Fine Arts from the School of Arts and Design in Caldas da Rainha, with further artistic development through international programs at the Free University of Bolzano and the Accademia di Belle Arti in L'Aquila, Italy.",
    "Her practice combines photography, self-portraiture, performance, and drawing, using experimentation and the body as a territory of identity, intimacy, and transformation.",
    "Her work emerges from personal experience and observation of everyday life. She creates images functioning as fragments of visual autobiography, using the body as both subject and tool.",
    "Gesture and presence become ways of testing limits, inhabiting spaces, and allowing meaning to remain open and in transformation.",
  ]),
  about_identity: JSON.stringify([
    "CREATIVE THINKER",
    "DREAMER",
    "OBSERVER",
    "PERFORMER",
    "MULTI-TASKER",
    "EXPERIMENTER",
    "BOUNDARY PUSHER",
  ]),
  studio_description:
    "A creative studio based in Portugal, creating self-portraiture, photography, experimental printing and drawing. Founded in 2021, it's an extension of an ever-evolving creation. Located in Guimaraes, studio visits available by appointment to experience the work beyond finished pieces.",
  appointment_text:
    "Connecting with you is what fulfils me. Whether you'd like to visit the studio, discuss a piece, or simply have a conversation about art — I'd love to meet you.",
  appointment_url: "https://tidycal.com/soraiaoliveira/studio-visit",
  call_url: "https://tidycal.com/soraiaoliveira/online-meeting",
  contact_email: "info@soraia-oliveira.com",
  social_instagram: "https://www.instagram.com/soraianoliveira/",
  social_facebook: "https://www.facebook.com/soraiaoliveira.artist/",
  social_tiktok: "https://www.tiktok.com/@soraianoliveira",
  social_youtube: "https://www.youtube.com/@soraianoliveira",
  featured_artwork_id: "1",
};

// ─── Helper ───

function img(id: string, file: string, alt: string): ArtworkImage {
  return { id, url: `/images/artworks/${file}`, altText: alt, sortOrder: 0, isPrimary: true };
}

// ─── All 45 Artworks (real data from soraia-oliveira.com) ───

export const mockArtworks: Artwork[] = [
  // ── Artist Proofs ──
  { id: "1", title: "BA-NA-NA - Artist Proof", slug: "ba-na-na-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 19000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: true, sortOrder: 0, metaTitle: null, metaDescription: null, images: [img("1", "ba-na-na-ap.png", "BA-NA-NA - Artist Proof")] },
  { id: "2", title: "Shared my soul - Artist Proof", slug: "shared-my-soul-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 60000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 1, metaTitle: null, metaDescription: null, images: [img("2", "shared-my-soul-ap.png", "Shared my soul - Artist Proof")] },
  { id: "3", title: "His Meeting - Artist Proof", slug: "his-meeting-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 2, metaTitle: null, metaDescription: null, images: [img("3", "his-meeting-ap.png", "His Meeting - Artist Proof")] },
  { id: "4", title: "Refugio - Artist Proof", slug: "refugio-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 65000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 3, metaTitle: null, metaDescription: null, images: [img("4", "refugio-ap.png", "Refugio - Artist Proof")] },
  { id: "5", title: "I can't see - Artist Proof", slug: "i-cant-see-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 65000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 4, metaTitle: null, metaDescription: null, images: [img("5", "i-cant-see-ap.png", "I can't see - Artist Proof")] },
  { id: "6", title: "So suddently - Artist Proof", slug: "so-suddently-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 19000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 5, metaTitle: null, metaDescription: null, images: [img("6", "so-suddently-ap.png", "So suddently - Artist Proof")] },
  { id: "7", title: "A million faces - Artist Proof", slug: "a-million-faces-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 60000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 6, metaTitle: null, metaDescription: null, images: [img("7", "a-million-faces-ap.png", "A million faces - Artist Proof")] },
  { id: "8", title: "Caught in a Dream - Artist Proof", slug: "caught-in-a-dream-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 7, metaTitle: null, metaDescription: null, images: [img("8", "caught-in-a-dream-ap.png", "Caught in a Dream - Artist Proof")] },
  { id: "9", title: "Caught in a Dream - Artist Proof II", slug: "caught-in-a-dream-artist-proof-2", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 8, metaTitle: null, metaDescription: null, images: [img("9", "caught-in-a-dream-ap-2.png", "Caught in a Dream - Artist Proof II")] },
  { id: "10", title: "Desassossego Atual(izado) - Artist Proof", slug: "desassossego-atualizado-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: 55000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 9, metaTitle: null, metaDescription: null, images: [img("10", "desassossego-ap.png", "Desassossego Atual(izado) - Artist Proof")] },
  { id: "11", title: "Target on my chest - Artist Proof", slug: "target-on-my-chest-artist-proof", description: null, category: "artist-proofs", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 10, metaTitle: null, metaDescription: null, images: [img("11", "target-on-my-chest-ap.png", "Target on my chest - Artist Proof")] },

  // ── Photography ──
  { id: "12", title: "Romeu", slug: "romeu", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 11, metaTitle: null, metaDescription: null, images: [img("12", "romeu.png", "Romeu")] },
  { id: "13", title: "It's always there - Artist Proof", slug: "its-always-there-artist-proof", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: 120000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 12, metaTitle: null, metaDescription: null, images: [img("13", "its-always-there-ap.png", "It's always there")] },
  { id: "14", title: "Clouds never truly disappear", slug: "clouds-never-truly-disappear", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 13, metaTitle: null, metaDescription: null, images: [img("14", "clouds-never-disappear.png", "Clouds never truly disappear")] },
  { id: "15", title: "Shared my soul", slug: "shared-my-soul", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: 180000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 14, metaTitle: null, metaDescription: null, images: [img("15", "shared-my-soul.png", "Shared my soul")] },
  { id: "16", title: "Say yes to heaven", slug: "say-yes-to-heaven", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 15, metaTitle: null, metaDescription: null, images: [img("16", "say-yes-to-heaven.png", "Say yes to heaven")] },
  { id: "17", title: "ALTERA. ADERE. MOLDA", slug: "altera-adere-molda", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 16, metaTitle: null, metaDescription: null, images: [img("17", "altera-adere-molda.png", "ALTERA. ADERE. MOLDA")] },
  { id: "18", title: "A Million faces", slug: "a-million-faces", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 17, metaTitle: null, metaDescription: null, images: [img("18", "a-million-faces.png", "A Million faces")] },
  { id: "19", title: "Desci e Encontrei-te", slug: "desci-e-encontrei-te", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: 170000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 18, metaTitle: null, metaDescription: null, images: [img("19", "desci-e-encontrei-te.png", "Desci e Encontrei-te")] },
  { id: "20", title: "The Last Goodbye", slug: "the-last-goodbye", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 19, metaTitle: null, metaDescription: null, images: [img("20", "the-last-goodbye.png", "The Last Goodbye")] },
  { id: "21", title: "Caught in a Dream", slug: "caught-in-a-dream", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: 75000, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 20, metaTitle: null, metaDescription: null, images: [img("21", "caught-in-a-dream.png", "Caught in a Dream")] },
  { id: "22", title: "Desassossego Atual(izado)", slug: "desassossego-atualizado", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: true, isSold: false, isVisible: true, isFeatured: false, sortOrder: 21, metaTitle: null, metaDescription: null, images: [img("22", "desassossego-atualizado.png", "Desassossego Atual(izado)")] },
  { id: "23", title: "Untitled (Bodies)", slug: "untitled-bodies", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: 35000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 22, metaTitle: null, metaDescription: null, images: [img("23", "untitled-bodies.png", "Untitled (Bodies)")] },
  { id: "24", title: "Untitled (Paper)", slug: "untitled-paper", description: null, category: "photography", year: null, medium: null, edition: null, dimensions: null, priceCents: 35000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 23, metaTitle: null, metaDescription: null, images: [img("24", "untitled-paper.png", "Untitled (Paper)")] },

  // ── Drawings ──
  { id: "25", title: "Gelato al Limone #7", slug: "gelato-al-limone-7", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 18000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 24, metaTitle: null, metaDescription: null, images: [img("25", "gelato-al-limone-7.jpg", "Gelato al Limone #7")] },
  { id: "26", title: "Gelato al Limone AP #1", slug: "gelato-al-limone-ap-1", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 15000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 25, metaTitle: null, metaDescription: null, images: [img("26", "gelato-al-limone-ap-1.png", "Gelato al Limone AP #1")] },
  { id: "27", title: "Gelato al Limone #1", slug: "gelato-al-limone-1", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 15000, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 26, metaTitle: null, metaDescription: null, images: [img("27", "gelato-al-limone-1.png", "Gelato al Limone #1")] },
  { id: "28", title: "Gelato al Limone #4", slug: "gelato-al-limone-4", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 15000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 27, metaTitle: null, metaDescription: null, images: [img("28", "gelato-al-limone-4.png", "Gelato al Limone #4")] },
  { id: "29", title: "Gelato al Limone #3", slug: "gelato-al-limone-3", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 15000, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 28, metaTitle: null, metaDescription: null, images: [img("29", "gelato-al-limone-3.png", "Gelato al Limone #3")] },
  { id: "30", title: "Untitled (Drawing)", slug: "untitled-drawing", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 29, metaTitle: null, metaDescription: null, images: [img("30", "untitled-drawing.jpg", "Untitled (Drawing)")] },
  { id: "31", title: "Ravage the Desert", slug: "ravage-the-desert", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 30, metaTitle: null, metaDescription: null, images: [img("31", "ravage-the-desert.jpg", "Ravage the Desert")] },
  { id: "32", title: "Dopamine", slug: "dopamine", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 50000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 31, metaTitle: null, metaDescription: null, images: [img("32", "dopamine.jpg", "Dopamine")] },
  { id: "33", title: "Fever", slug: "fever", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 32, metaTitle: null, metaDescription: null, images: [img("33", "fever.jpg", "Fever")] },
  { id: "34", title: "Untitled (Cigarro)", slug: "untitled-cigarro", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 55000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 33, metaTitle: null, metaDescription: null, images: [img("34", "untitled-cigarro.png", "Untitled (Cigarro)")] },
  { id: "35", title: "Untitled", slug: "untitled-sor02584", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 50000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 34, metaTitle: null, metaDescription: null, images: [img("35", "untitled-sor02584.jpg", "Untitled")] },
  { id: "36", title: "FUN FAIR", slug: "fun-fair", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 35, metaTitle: null, metaDescription: null, images: [img("36", "fun-fair.jpg", "FUN FAIR")] },
  { id: "37", title: "Break my soul", slug: "break-my-soul", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: null, originalPriceCents: null, isPriceOnRequest: false, isSold: true, isVisible: true, isFeatured: false, sortOrder: 36, metaTitle: null, metaDescription: null, images: [img("37", "break-my-soul.jpg", "Break my soul")] },
  { id: "38", title: "Eye Sight", slug: "eye-sight", description: null, category: "drawings", year: null, medium: null, edition: null, dimensions: null, priceCents: 50000, originalPriceCents: null, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 37, metaTitle: null, metaDescription: null, images: [img("38", "eye-sight.jpg", "Eye Sight")] },

  // ── Jewelry ──
  { id: "39", title: "Golden Necklace", slug: "golden-necklace", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 21000, originalPriceCents: 30000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 38, metaTitle: null, metaDescription: null, images: [img("39", "golden-necklace.jpg", "Golden Necklace")] },
  { id: "40", title: "Golden Earrings", slug: "golden-earrings", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 25000, originalPriceCents: 36000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 39, metaTitle: null, metaDescription: null, images: [img("40", "golden-earrings.jpg", "Golden Earrings")] },
  { id: "41", title: "Golden Bracelet", slug: "golden-bracelet", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 24000, originalPriceCents: 34000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 40, metaTitle: null, metaDescription: null, images: [img("41", "golden-bracelet.jpg", "Golden Bracelet")] },
  { id: "42", title: "Golden Ring", slug: "golden-ring", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 20000, originalPriceCents: 27000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 41, metaTitle: null, metaDescription: null, images: [img("42", "golden-ring.jpg", "Golden Ring")] },
  { id: "43", title: "Silver Bracelet", slug: "silver-bracelet", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 21000, originalPriceCents: 30000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 42, metaTitle: null, metaDescription: null, images: [img("43", "silver-bracelet.jpg", "Silver Bracelet")] },
  { id: "44", title: "Silver Earrings", slug: "silver-earrings", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 22000, originalPriceCents: 32000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 43, metaTitle: null, metaDescription: null, images: [img("44", "silver-earrings.jpg", "Silver Earrings")] },
  { id: "45", title: "Silver Ring", slug: "silver-ring", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 17000, originalPriceCents: 24000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 44, metaTitle: null, metaDescription: null, images: [img("45", "silver-ring.jpg", "Silver Ring")] },
  { id: "46", title: "Silver Necklace", slug: "silver-necklace", description: null, category: "jewelry", year: null, medium: null, edition: null, dimensions: null, priceCents: 19000, originalPriceCents: 27000, isPriceOnRequest: false, isSold: false, isVisible: true, isFeatured: false, sortOrder: 45, metaTitle: null, metaDescription: null, images: [img("46", "silver-necklace.jpg", "Silver Necklace")] },
];

// ─── Exhibitions ───

export const mockExhibitions: Exhibition[] = [
  { id: "1", title: "Apenas Ser", location: "Museu Alberto Sampaio, Guimaraes", year: "2025", type: "group", externalUrl: "https://www.museualbertosampaio.gov.pt/event-item/apenas-ser-de-tales-frey-e-soraia-oliveira/" },
  { id: "2", title: "Guimaraes Project Room", location: "Guimaraes, Portugal", year: "2024", type: "solo", externalUrl: "https://jornaldeguimaraes.pt/noticias/fotografia-e-instalacao-dao-vida-a-nova-exposicao-do-guimaraes-project-room/" },
  { id: "3", title: "Fotografia Contemporanea Portuguesa", location: "Centro Portugues de Fotografia, Porto", year: "2024", type: "group", externalUrl: null },
  { id: "4", title: "Artist Residency", location: "Guimaraes, Portugal", year: "2023", type: "residency", externalUrl: null },
  { id: "5", title: "Jovens Criadores", location: "Culturgest, Lisboa", year: "2023", type: "group", externalUrl: null },
];

// ─── News ───

export const mockNews: NewsItem[] = [
  { id: "1", title: "Apenas Ser — Tales Frey & Soraia Oliveira", excerpt: "Collaboration with Tales Frey at Museu Alberto Sampaio, Guimaraes.", externalUrl: "https://www.museualbertosampaio.gov.pt/event-item/apenas-ser-de-tales-frey-e-soraia-oliveira/", publishedDate: "2025-01-15", isVisible: true },
  { id: "2", title: "Guimaraes Project Room Exhibition", excerpt: "Photography and installation give life to new exhibition at Guimaraes Project Room.", externalUrl: "https://jornaldeguimaraes.pt/noticias/fotografia-e-instalacao-dao-vida-a-nova-exposicao-do-guimaraes-project-room/", publishedDate: "2024-09-01", isVisible: true },
  { id: "3", title: "Wearable Sculpture Collection Launch", excerpt: "New jewelry collection where sculpture meets the body — handcrafted in gold and sterling silver.", externalUrl: null, publishedDate: "2024-06-20", isVisible: true },
];
