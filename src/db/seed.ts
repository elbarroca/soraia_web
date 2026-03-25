import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  artworks,
  artworkImages,
  news,
  exhibitions,
  siteSettings,
} from "./schema";
import * as schema from "./schema";

// Load .env.local
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

const SEED_ARTWORKS = [
  {
    title: "Self-Portrait No. 1",
    slug: "self-portrait-no-1",
    description: "A contemplative self-portrait exploring themes of identity and transformation through the medium of black and white photography.",
    category: "photography",
    year: "2023",
    medium: "Fine Art Print on Hahnemuhle Photo Rag",
    edition: "Edition of 5 + 2 AP",
    dimensions: "60 x 90 cm",
    price: "1800.00",
    tags: ["featured"],
    images: [{ url: "https://placehold.co/800x1100/1a1a1a/ffffff?text=Self+Portrait+1", altText: "Self-Portrait No. 1" }],
  },
  {
    title: "Body Language II",
    slug: "body-language-ii",
    description: "An exploration of form and gesture.",
    category: "photography",
    year: "2023",
    medium: "Fine Art Print on Hahnemuhle Photo Rag",
    edition: "Edition of 5 + 2 AP",
    dimensions: "90 x 60 cm",
    price: "2200.00",
    tags: [],
    images: [{ url: "https://placehold.co/1100x800/1a1a1a/ffffff?text=Body+Language+II", altText: "Body Language II" }],
  },
  {
    title: "Metamorphosis",
    slug: "metamorphosis",
    description: "The moment of becoming captured between states of being.",
    category: "photography",
    year: "2022",
    medium: "Fine Art Print on Hahnemuhle Photo Rag",
    edition: "Edition of 3",
    dimensions: "80 x 120 cm",
    priceOnRequest: true,
    tags: [],
    images: [{ url: "https://placehold.co/1200x800/1a1a1a/ffffff?text=Metamorphosis", altText: "Metamorphosis" }],
  },
  {
    title: "Traces I",
    slug: "traces-i",
    description: "Graphite and charcoal on cotton paper.",
    category: "drawings",
    year: "2023",
    medium: "Graphite and charcoal on cotton paper",
    edition: "Original",
    dimensions: "42 x 59.4 cm",
    price: "850.00",
    tags: ["new"],
    images: [{ url: "https://placehold.co/800x1100/1a1a1a/ffffff?text=Traces+I", altText: "Traces I" }],
  },
  {
    title: "Traces II",
    slug: "traces-ii",
    description: "Continuation of the Traces series.",
    category: "drawings",
    year: "2023",
    medium: "Charcoal on cotton paper",
    edition: "Original",
    dimensions: "42 x 59.4 cm",
    price: "850.00",
    isSold: true,
    tags: [],
    images: [{ url: "https://placehold.co/800x1100/1a1a1a/ffffff?text=Traces+II", altText: "Traces II" }],
  },
  {
    title: "Artist Proof - Solitude",
    slug: "artist-proof-solitude",
    description: "A rare artist proof from the Solitude series.",
    category: "artist-proofs",
    year: "2022",
    medium: "Fine Art Print on Baryta Paper",
    edition: "AP 1/2",
    dimensions: "50 x 70 cm",
    price: "3500.00",
    tags: [],
    images: [{ url: "https://placehold.co/700x1000/1a1a1a/ffffff?text=AP+Solitude", altText: "Artist Proof - Solitude" }],
  },
  {
    title: "Inward Ring",
    slug: "inward-ring",
    description: "Handcrafted sterling silver ring.",
    category: "jewelry",
    year: "2024",
    medium: "Sterling Silver 925",
    dimensions: "Adjustable",
    price: "210.00",
    originalPrice: "300.00",
    tags: ["new"],
    images: [{ url: "https://placehold.co/800x800/1a1a1a/ffffff?text=Inward+Ring", altText: "Inward Ring" }],
  },
  {
    title: "Presence III",
    slug: "presence-iii",
    description: "The third in the Presence series.",
    category: "photography",
    year: "2024",
    medium: "Fine Art Print on Hahnemuhle Photo Rag",
    edition: "Edition of 5",
    dimensions: "70 x 100 cm",
    price: "2400.00",
    tags: ["new", "featured"],
    images: [{ url: "https://placehold.co/1000x700/1a1a1a/ffffff?text=Presence+III", altText: "Presence III" }],
  },
  {
    title: "Echo Pendant",
    slug: "echo-pendant",
    description: "Delicate pendant in oxidized silver.",
    category: "jewelry",
    year: "2024",
    medium: "Oxidized Sterling Silver 925",
    dimensions: "Chain 45 cm, pendant 2 x 3 cm",
    price: "180.00",
    tags: ["new"],
    images: [{ url: "https://placehold.co/800x800/1a1a1a/ffffff?text=Echo+Pendant", altText: "Echo Pendant" }],
  },
  {
    title: "Whisper",
    slug: "whisper",
    description: "A quiet moment, frozen.",
    category: "photography",
    year: "2024",
    medium: "Fine Art Print on Hahnemuhle Photo Rag",
    edition: "Edition of 7",
    dimensions: "60 x 80 cm",
    price: "1600.00",
    tags: [],
    images: [{ url: "https://placehold.co/800x600/1a1a1a/ffffff?text=Whisper", altText: "Whisper" }],
  },
  {
    title: "Fragment IV",
    slug: "fragment-iv",
    description: "Ink and graphite on heavyweight paper.",
    category: "drawings",
    year: "2024",
    medium: "Ink and graphite on paper",
    edition: "Original",
    dimensions: "30 x 40 cm",
    price: "650.00",
    tags: [],
    images: [{ url: "https://placehold.co/750x1000/1a1a1a/ffffff?text=Fragment+IV", altText: "Fragment IV" }],
  },
  {
    title: "Artist Proof - Becoming",
    slug: "artist-proof-becoming",
    description: "An artist proof from the acclaimed Becoming series.",
    category: "artist-proofs",
    year: "2023",
    medium: "Fine Art Print on Baryta Paper",
    edition: "AP 2/2",
    dimensions: "60 x 80 cm",
    priceOnRequest: true,
    tags: [],
    images: [{ url: "https://placehold.co/800x600/1a1a1a/ffffff?text=AP+Becoming", altText: "Artist Proof - Becoming" }],
  },
];

const SEED_NEWS = [
  { title: "Featured in Vogue Portugal", excerpt: "Among emerging artists reshaping contemporary self-portraiture.", externalUrl: "#", publishedAt: new Date("2024-03-15") },
  { title: "Interview with Publico", excerpt: "An in-depth conversation about the intersection of photography, drawing, and identity.", externalUrl: "#", publishedAt: new Date("2024-01-20") },
  { title: "Artist Talk at Centro Cultural Vila Flor", excerpt: "An intimate conversation about practice and creative process.", externalUrl: "#", publishedAt: new Date("2023-11-10") },
  { title: "New Collection: Echo Jewelry Line", excerpt: "Wearable sculptures inspired by the reverberations of self-discovery.", externalUrl: "#", publishedAt: new Date("2024-02-01") },
];

const SEED_EXHIBITIONS = [
  { title: "Becoming - Solo Exhibition", location: "Galeria Municipal de Guimaraes, Portugal", year: "2024", type: "solo" as const },
  { title: "Body as Landscape", location: "Centro Cultural Vila Flor, Guimaraes", year: "2024", type: "solo" as const },
  { title: "Encontros da Imagem", location: "Braga, Portugal", year: "2023", type: "group" as const },
  { title: "Self & Other - Group Show", location: "Museu de Arte Contemporanea, Porto", year: "2023", type: "group" as const },
  { title: "Artist Residency", location: "Cite Internationale des Arts, Paris", year: "2022", type: "residency" as const },
  { title: "Emerging Portuguese Artists", location: "Culturgest, Lisbon", year: "2022", type: "group" as const },
  { title: "Young Artists Award - Finalist", location: "Fundacao EDP, Lisbon", year: "2021", type: "award" as const },
  { title: "Traces - Solo Exhibition", location: "Espaco Maus Habitos, Porto", year: "2021", type: "solo" as const },
];

const SEED_SETTINGS: Record<string, string> = {
  hero_statement: "VISUAL ARTIST BASED IN PORTUGAL, GUIMARAES.",
  hero_tagline: "Self-portraiture, photography and drawing as acts of transformation and self-discovery.",
  about_intro: "I'm Soraia, a multidisciplinary artist working at the intersection of body, identity, and transformation.",
  about_bio: JSON.stringify([
    "My practice revolves around the body as a site of meaning.",
    "Born and based in Guimaraes, Portugal, I draw from the intimacy of personal experience.",
    "My photographic work is printed on archival Hahnemuhle papers, each edition carefully limited.",
    "I believe art should be lived with, not just looked at.",
  ]),
  about_identity: JSON.stringify(["CREATIVE THINKER", "DREAMER", "VISUAL STORYTELLER", "PHOTOGRAPHER", "DRAWER", "MAKER", "EXPLORER"]),
  contact_email: "info@soraia-oliveira.com",
  studio_description: "A creative studio based in the historic city of Guimaraes, Portugal.",
  appointment_text: "Connecting with you is what fulfils me.",
  appointment_url: "https://tidycal.com/soraiaoliveira/studio-visit",
  call_url: "https://tidycal.com/soraiaoliveira/online-meeting",
  social_instagram: "https://instagram.com/soraiaoliveira.art",
};

async function seed() {
  console.log("Seeding database...");

  // Seed artworks
  for (let i = 0; i < SEED_ARTWORKS.length; i++) {
    const { images, tags, priceOnRequest, isSold, ...data } = SEED_ARTWORKS[i];
    const [artwork] = await db
      .insert(artworks)
      .values({
        ...data,
        tags: tags ?? [],
        priceOnRequest: priceOnRequest ?? false,
        isSold: isSold ?? false,
        sortOrder: i,
      })
      .returning();

    if (images.length > 0) {
      await db.insert(artworkImages).values(
        images.map((img, j) => ({
          artworkId: artwork.id,
          url: img.url,
          altText: img.altText,
          sortOrder: j,
          isPrimary: j === 0,
        }))
      );
    }
    console.log(`  Artwork: ${data.title}`);
  }

  // Seed news
  for (const item of SEED_NEWS) {
    await db.insert(news).values(item);
    console.log(`  News: ${item.title}`);
  }

  // Seed exhibitions
  for (const item of SEED_EXHIBITIONS) {
    await db.insert(exhibitions).values(item);
    console.log(`  Exhibition: ${item.title}`);
  }

  // Seed settings
  for (const [key, value] of Object.entries(SEED_SETTINGS)) {
    await db.insert(siteSettings).values({ key, value });
    console.log(`  Setting: ${key}`);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
