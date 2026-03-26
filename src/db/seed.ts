import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql as sqlFn } from "drizzle-orm";
import {
  artworks,
  artworkImages,
  news,
  exhibitions,
  siteSettings,
} from "./schema";
import * as schema from "./schema";

// Load .env.local
import { config } from "dotenv";
config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle({ client: sql, schema });

// ─── Helper: cents → decimal string ───
function centsToDecimal(cents: number | null): string | undefined {
  if (cents === null || cents === undefined) return undefined;
  return (cents / 100).toFixed(2);
}

// ─── All 46 Artworks (real data from soraia-oliveira.com) ───

const SEED_ARTWORKS = [
  // ── Artist Proofs ──
  { title: "BA-NA-NA - Artist Proof", slug: "ba-na-na-artist-proof", category: "artist-proofs", priceCents: 19000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 0, image: "ba-na-na-ap.png" },
  { title: "Shared my soul - Artist Proof", slug: "shared-my-soul-artist-proof", category: "artist-proofs", priceCents: 60000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 1, image: "shared-my-soul-ap.png" },
  { title: "His Meeting - Artist Proof", slug: "his-meeting-artist-proof", category: "artist-proofs", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 2, image: "his-meeting-ap.png" },
  { title: "Refugio - Artist Proof", slug: "refugio-artist-proof", category: "artist-proofs", priceCents: 65000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 3, image: "refugio-ap.png" },
  { title: "I can't see - Artist Proof", slug: "i-cant-see-artist-proof", category: "artist-proofs", priceCents: 65000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 4, image: "i-cant-see-ap.png" },
  { title: "So suddently - Artist Proof", slug: "so-suddently-artist-proof", category: "artist-proofs", priceCents: 19000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 5, image: "so-suddently-ap.png" },
  { title: "A million faces - Artist Proof", slug: "a-million-faces-artist-proof", category: "artist-proofs", priceCents: 60000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 6, image: "a-million-faces-ap.png" },
  { title: "Caught in a Dream - Artist Proof", slug: "caught-in-a-dream-artist-proof", category: "artist-proofs", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 7, image: "caught-in-a-dream-ap.png" },
  { title: "Caught in a Dream - Artist Proof II", slug: "caught-in-a-dream-artist-proof-2", category: "artist-proofs", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 8, image: "caught-in-a-dream-ap-2.png" },
  { title: "Desassossego Atual(izado) - Artist Proof", slug: "desassossego-atualizado-artist-proof", category: "artist-proofs", priceCents: 55000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 9, image: "desassossego-ap.png" },
  { title: "Target on my chest - Artist Proof", slug: "target-on-my-chest-artist-proof", category: "artist-proofs", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 10, image: "target-on-my-chest-ap.png" },

  // ── Photography ──
  { title: "Romeu", slug: "romeu", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 11, image: "romeu.png" },
  { title: "It's always there - Artist Proof", slug: "its-always-there-artist-proof", category: "photography", priceCents: 120000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 12, image: "its-always-there-ap.png" },
  { title: "Clouds never truly disappear", slug: "clouds-never-truly-disappear", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 13, image: "clouds-never-disappear.png", tags: ["featured"] },
  { title: "Shared my soul", slug: "shared-my-soul", category: "photography", priceCents: 180000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 14, image: "shared-my-soul.png" },
  { title: "Say yes to heaven", slug: "say-yes-to-heaven", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 15, image: "say-yes-to-heaven.png" },
  { title: "ALTERA. ADERE. MOLDA", slug: "altera-adere-molda", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 16, image: "altera-adere-molda.png" },
  { title: "A Million faces", slug: "a-million-faces", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 17, image: "a-million-faces.png" },
  { title: "Desci e Encontrei-te", slug: "desci-e-encontrei-te", category: "photography", priceCents: 170000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 18, image: "desci-e-encontrei-te.png" },
  { title: "The Last Goodbye", slug: "the-last-goodbye", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 19, image: "the-last-goodbye.png" },
  { title: "Caught in a Dream", slug: "caught-in-a-dream", category: "photography", priceCents: 75000, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 20, image: "caught-in-a-dream.png" },
  { title: "Desassossego Atual(izado)", slug: "desassossego-atualizado", category: "photography", priceCents: null, originalPriceCents: null, priceOnRequest: true, isSold: false, sortOrder: 21, image: "desassossego-atualizado.png" },
  { title: "Untitled (Bodies)", slug: "untitled-bodies", category: "photography", priceCents: 35000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 22, image: "untitled-bodies.png" },
  { title: "Untitled (Paper)", slug: "untitled-paper", category: "photography", priceCents: 35000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 23, image: "untitled-paper.png" },

  // ── Drawings ──
  { title: "Gelato al Limone #7", slug: "gelato-al-limone-7", category: "drawings", priceCents: 18000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 24, image: "gelato-al-limone-7.jpg" },
  { title: "Gelato al Limone AP #1", slug: "gelato-al-limone-ap-1", category: "drawings", priceCents: 15000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 25, image: "gelato-al-limone-ap-1.png" },
  { title: "Gelato al Limone #1", slug: "gelato-al-limone-1", category: "drawings", priceCents: 15000, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 26, image: "gelato-al-limone-1.png" },
  { title: "Gelato al Limone #4", slug: "gelato-al-limone-4", category: "drawings", priceCents: 15000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 27, image: "gelato-al-limone-4.png" },
  { title: "Gelato al Limone #3", slug: "gelato-al-limone-3", category: "drawings", priceCents: 15000, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 28, image: "gelato-al-limone-3.png" },
  { title: "Untitled (Drawing)", slug: "untitled-drawing", category: "drawings", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 29, image: "untitled-drawing.jpg" },
  { title: "Ravage the Desert", slug: "ravage-the-desert", category: "drawings", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 30, image: "ravage-the-desert.jpg" },
  { title: "Dopamine", slug: "dopamine", category: "drawings", priceCents: 50000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 31, image: "dopamine.jpg" },
  { title: "Fever", slug: "fever", category: "drawings", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 32, image: "fever.jpg" },
  { title: "Untitled (Cigarro)", slug: "untitled-cigarro", category: "drawings", priceCents: 55000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 33, image: "untitled-cigarro.png" },
  { title: "Untitled", slug: "untitled-sor02584", category: "drawings", priceCents: 50000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 34, image: "untitled-sor02584.jpg" },
  { title: "FUN FAIR", slug: "fun-fair", category: "drawings", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 35, image: "fun-fair.jpg" },
  { title: "Break my soul", slug: "break-my-soul", category: "drawings", priceCents: null, originalPriceCents: null, priceOnRequest: false, isSold: true, sortOrder: 36, image: "break-my-soul.jpg" },
  { title: "Eye Sight", slug: "eye-sight", category: "drawings", priceCents: 50000, originalPriceCents: null, priceOnRequest: false, isSold: false, sortOrder: 37, image: "eye-sight.jpg" },

  // ── Jewelry ──
  { title: "Golden Necklace", slug: "golden-necklace", category: "jewelry", priceCents: 21000, originalPriceCents: 30000, priceOnRequest: false, isSold: false, sortOrder: 38, image: "golden-necklace.jpg" },
  { title: "Golden Earrings", slug: "golden-earrings", category: "jewelry", priceCents: 25000, originalPriceCents: 36000, priceOnRequest: false, isSold: false, sortOrder: 39, image: "golden-earrings.jpg" },
  { title: "Golden Bracelet", slug: "golden-bracelet", category: "jewelry", priceCents: 24000, originalPriceCents: 34000, priceOnRequest: false, isSold: false, sortOrder: 40, image: "golden-bracelet.jpg" },
  { title: "Golden Ring", slug: "golden-ring", category: "jewelry", priceCents: 20000, originalPriceCents: 27000, priceOnRequest: false, isSold: false, sortOrder: 41, image: "golden-ring.jpg" },
  { title: "Silver Bracelet", slug: "silver-bracelet", category: "jewelry", priceCents: 21000, originalPriceCents: 30000, priceOnRequest: false, isSold: false, sortOrder: 42, image: "silver-bracelet.jpg" },
  { title: "Silver Earrings", slug: "silver-earrings", category: "jewelry", priceCents: 22000, originalPriceCents: 32000, priceOnRequest: false, isSold: false, sortOrder: 43, image: "silver-earrings.jpg" },
  { title: "Silver Ring", slug: "silver-ring", category: "jewelry", priceCents: 17000, originalPriceCents: 24000, priceOnRequest: false, isSold: false, sortOrder: 44, image: "silver-ring.jpg" },
  { title: "Silver Necklace", slug: "silver-necklace", category: "jewelry", priceCents: 19000, originalPriceCents: 27000, priceOnRequest: false, isSold: false, sortOrder: 45, image: "silver-necklace.jpg" },
];

const SEED_NEWS = [
  { title: "Apenas Ser — Tales Frey & Soraia Oliveira", excerpt: "Collaboration with Tales Frey at Museu Alberto Sampaio, Guimarães.", externalUrl: "https://www.museualbertosampaio.gov.pt/event-item/apenas-ser-de-tales-frey-e-soraia-oliveira/", publishedAt: new Date("2025-01-15") },
  { title: "Guimarães Project Room Exhibition", excerpt: "Photography and installation give life to new exhibition at Guimarães Project Room.", externalUrl: "https://jornaldeguimaraes.pt/noticias/fotografia-e-instalacao-dao-vida-a-nova-exposicao-do-guimaraes-project-room/", publishedAt: new Date("2024-09-01") },
  { title: "Wearable Sculpture Collection Launch", excerpt: "New jewelry collection where sculpture meets the body — handcrafted in gold and sterling silver.", externalUrl: null, publishedAt: new Date("2024-06-20") },
];

const SEED_EXHIBITIONS = [
  { title: "Apenas Ser", location: "Museu Alberto Sampaio, Guimarães", year: "2025", type: "group" as const, externalUrl: "https://www.museualbertosampaio.gov.pt/event-item/apenas-ser-de-tales-frey-e-soraia-oliveira/" },
  { title: "Guimarães Project Room", location: "Guimarães, Portugal", year: "2024", type: "solo" as const, externalUrl: "https://jornaldeguimaraes.pt/noticias/fotografia-e-instalacao-dao-vida-a-nova-exposicao-do-guimaraes-project-room/" },
  { title: "Fotografia Contemporânea Portuguesa", location: "Centro Português de Fotografia, Porto", year: "2024", type: "group" as const, externalUrl: null },
  { title: "Artist Residency", location: "Guimarães, Portugal", year: "2023", type: "residency" as const, externalUrl: null },
  { title: "Jovens Criadores", location: "Culturgest, Lisboa", year: "2023", type: "group" as const, externalUrl: null },
];

const SEED_SETTINGS: Record<string, string> = {
  hero_statement: "The body as subject, tool, and territory.",
  hero_tagline: "Self-portraiture, photography and drawing, exploring experimental printing and performance.",
  about_intro: "I'm Soraia, a multidisciplinary artist working with photography, drawing, self-portraiture and experimental processes.",
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
  studio_description: "A creative studio based in Portugal, creating self-portraiture, photography, experimental printing and drawing. Founded in 2021, it's an extension of an ever-evolving creation. Located in Guimarães, studio visits available by appointment to experience the work beyond finished pieces.",
  appointment_text: "Connecting with you is what fulfils me. Whether you'd like to visit the studio, discuss a piece, or simply have a conversation about art — I'd love to meet you.",
  appointment_url: "https://tidycal.com/soraiaoliveira/studio-visit",
  call_url: "https://tidycal.com/soraiaoliveira/online-meeting",
  contact_email: "info@soraia-oliveira.com",
  social_instagram: "https://www.instagram.com/soraianoliveira/",
  social_facebook: "https://www.facebook.com/soraiaoliveira.artist/",
  social_tiktok: "https://www.tiktok.com/@soraianoliveira",
  social_youtube: "https://www.youtube.com/@soraianoliveira",
};

async function seed() {
  console.log("Clearing existing data...");
  await db.delete(artworkImages);
  await db.delete(artworks);
  await db.delete(news);
  await db.delete(exhibitions);
  await db.delete(siteSettings);

  // Reset identity sequences
  await db.execute(sqlFn`ALTER SEQUENCE artworks_id_seq RESTART WITH 1`);
  await db.execute(sqlFn`ALTER SEQUENCE artwork_images_id_seq RESTART WITH 1`);
  await db.execute(sqlFn`ALTER SEQUENCE news_id_seq RESTART WITH 1`);
  await db.execute(sqlFn`ALTER SEQUENCE exhibitions_id_seq RESTART WITH 1`);
  await db.execute(sqlFn`ALTER SEQUENCE site_settings_id_seq RESTART WITH 1`);

  console.log("\nSeeding artworks...");
  for (const item of SEED_ARTWORKS) {
    const [artwork] = await db
      .insert(artworks)
      .values({
        title: item.title,
        slug: item.slug,
        category: item.category,
        tags: ("tags" in item ? (item as { tags: string[] }).tags : []),
        price: centsToDecimal(item.priceCents),
        originalPrice: centsToDecimal(item.originalPriceCents),
        priceOnRequest: item.priceOnRequest,
        isSold: item.isSold,
        sortOrder: item.sortOrder,
      })
      .returning();

    await db.insert(artworkImages).values({
      artworkId: artwork.id,
      url: `/images/artworks/${item.image}`,
      altText: item.title,
      sortOrder: 0,
      isPrimary: true,
    });

    console.log(`  [${item.category}] ${item.title}`);
  }

  console.log("\nSeeding news...");
  for (const item of SEED_NEWS) {
    await db.insert(news).values(item);
    console.log(`  ${item.title}`);
  }

  console.log("\nSeeding exhibitions...");
  for (const item of SEED_EXHIBITIONS) {
    await db.insert(exhibitions).values(item);
    console.log(`  ${item.title}`);
  }

  console.log("\nSeeding settings...");
  for (const [key, value] of Object.entries(SEED_SETTINGS)) {
    await db.insert(siteSettings).values({ key, value });
    console.log(`  ${key}`);
  }

  console.log(`\nDone! Seeded ${SEED_ARTWORKS.length} artworks, ${SEED_NEWS.length} news, ${SEED_EXHIBITIONS.length} exhibitions, ${Object.keys(SEED_SETTINGS).length} settings.`);
  await sql.end();
}

seed().catch(console.error);
