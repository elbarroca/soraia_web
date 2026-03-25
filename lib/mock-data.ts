export type ArtworkImage = {
  id: string;
  url: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
};

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: "photography" | "artist-proofs" | "drawings" | "jewelry";
  year: string | null;
  medium: string | null;
  edition: string | null;
  dimensions: string | null;
  priceCents: number | null;
  originalPriceCents: number | null;
  isPriceOnRequest: boolean;
  isSold: boolean;
  isVisible: boolean;
  isFeatured: boolean;
  sortOrder: number;
  images: ArtworkImage[];
};

export type Exhibition = {
  id: string;
  title: string;
  location: string;
  year: string;
  type: "solo" | "group" | "residency" | "award";
  externalUrl: string | null;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string | null;
  externalUrl: string | null;
  publishedDate: string;
  isVisible: boolean;
};

export type SiteSettings = Record<string, string>;

// ─── Placeholder images ───
const placeholder = (w: number, h: number, label: string) =>
  `https://placehold.co/${w}x${h}/1a1a1a/ffffff?text=${encodeURIComponent(label)}`;

// ─── Mock artworks (representative sample) ───
export const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Self-Portrait No. 1",
    slug: "self-portrait-no-1",
    description: "A contemplative self-portrait exploring themes of identity and transformation through the medium of black and white photography. This piece invites the viewer to reflect on the boundaries between the self and the other.",
    category: "photography",
    year: "2023",
    medium: "Fine Art Print on Hahnemühle Photo Rag",
    edition: "Edition of 5 + 2 AP",
    dimensions: "60 × 90 cm",
    priceCents: 180000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: true,
    sortOrder: 0,
    images: [
      { id: "img1", url: placeholder(800, 1100, "Self+Portrait+1"), altText: "Self-Portrait No. 1", sortOrder: 0, isPrimary: true },
      { id: "img1b", url: placeholder(800, 1100, "Detail+View"), altText: "Detail view", sortOrder: 1, isPrimary: false },
    ],
  },
  {
    id: "2",
    title: "Body Language II",
    slug: "body-language-ii",
    description: "An exploration of form and gesture. The body becomes a landscape, a territory mapped through light and shadow.",
    category: "photography",
    year: "2023",
    medium: "Fine Art Print on Hahnemühle Photo Rag",
    edition: "Edition of 5 + 2 AP",
    dimensions: "90 × 60 cm",
    priceCents: 220000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 1,
    images: [
      { id: "img2", url: placeholder(1100, 800, "Body+Language+II"), altText: "Body Language II", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "3",
    title: "Metamorphosis",
    slug: "metamorphosis",
    description: "The moment of becoming — captured between states of being. A study of transformation and vulnerability.",
    category: "photography",
    year: "2022",
    medium: "Fine Art Print on Hahnemühle Photo Rag",
    edition: "Edition of 3",
    dimensions: "80 × 120 cm",
    priceCents: null,
    originalPriceCents: null,
    isPriceOnRequest: true,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 2,
    images: [
      { id: "img3", url: placeholder(1200, 800, "Metamorphosis"), altText: "Metamorphosis", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "4",
    title: "Traces I",
    slug: "traces-i",
    description: "Graphite and charcoal on cotton paper. Part of the ongoing series exploring the traces we leave behind.",
    category: "drawings",
    year: "2023",
    medium: "Graphite and charcoal on cotton paper",
    edition: "Original",
    dimensions: "42 × 59.4 cm",
    priceCents: 85000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 3,
    images: [
      { id: "img4", url: placeholder(800, 1100, "Traces+I"), altText: "Traces I", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "5",
    title: "Traces II",
    slug: "traces-ii",
    description: "Continuation of the Traces series. Charcoal gestures that dance between figuration and abstraction.",
    category: "drawings",
    year: "2023",
    medium: "Charcoal on cotton paper",
    edition: "Original",
    dimensions: "42 × 59.4 cm",
    priceCents: 85000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: true,
    isVisible: true,
    isFeatured: false,
    sortOrder: 4,
    images: [
      { id: "img5", url: placeholder(800, 1100, "Traces+II"), altText: "Traces II", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "6",
    title: "Artist Proof — Solitude",
    slug: "artist-proof-solitude",
    description: "A rare artist proof from the Solitude series. Each proof is uniquely annotated by the artist.",
    category: "artist-proofs",
    year: "2022",
    medium: "Fine Art Print on Baryta Paper",
    edition: "AP 1/2",
    dimensions: "50 × 70 cm",
    priceCents: 350000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 5,
    images: [
      { id: "img6", url: placeholder(700, 1000, "AP+Solitude"), altText: "Artist Proof — Solitude", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "7",
    title: "Inward Ring",
    slug: "inward-ring",
    description: "Handcrafted sterling silver ring. A wearable sculpture reflecting the artist's exploration of the inner self.",
    category: "jewelry",
    year: "2024",
    medium: "Sterling Silver 925",
    edition: null,
    dimensions: "Adjustable",
    priceCents: 21000,
    originalPriceCents: 30000,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 6,
    images: [
      { id: "img7", url: placeholder(800, 800, "Inward+Ring"), altText: "Inward Ring", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "8",
    title: "Presence III",
    slug: "presence-iii",
    description: "The third in the Presence series. An intimate study of the body in space.",
    category: "photography",
    year: "2024",
    medium: "Fine Art Print on Hahnemühle Photo Rag",
    edition: "Edition of 5",
    dimensions: "70 × 100 cm",
    priceCents: 240000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 7,
    images: [
      { id: "img8", url: placeholder(1000, 700, "Presence+III"), altText: "Presence III", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "9",
    title: "Echo Pendant",
    slug: "echo-pendant",
    description: "Delicate pendant in oxidized silver, part of the Echo collection.",
    category: "jewelry",
    year: "2024",
    medium: "Oxidized Sterling Silver 925",
    edition: null,
    dimensions: "Chain 45 cm, pendant 2 × 3 cm",
    priceCents: 18000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 8,
    images: [
      { id: "img9", url: placeholder(800, 800, "Echo+Pendant"), altText: "Echo Pendant", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "10",
    title: "Whisper",
    slug: "whisper",
    description: "A quiet moment, frozen. Part of the Silence series exploring stillness and presence.",
    category: "photography",
    year: "2024",
    medium: "Fine Art Print on Hahnemühle Photo Rag",
    edition: "Edition of 7",
    dimensions: "60 × 80 cm",
    priceCents: 160000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 9,
    images: [
      { id: "img10", url: placeholder(800, 600, "Whisper"), altText: "Whisper", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "11",
    title: "Fragment IV",
    slug: "fragment-iv",
    description: "Ink and graphite on heavyweight paper. Abstract composition of body fragments.",
    category: "drawings",
    year: "2024",
    medium: "Ink and graphite on paper",
    edition: "Original",
    dimensions: "30 × 40 cm",
    priceCents: 65000,
    originalPriceCents: null,
    isPriceOnRequest: false,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 10,
    images: [
      { id: "img11", url: placeholder(750, 1000, "Fragment+IV"), altText: "Fragment IV", sortOrder: 0, isPrimary: true },
    ],
  },
  {
    id: "12",
    title: "Artist Proof — Becoming",
    slug: "artist-proof-becoming",
    description: "An artist proof from the acclaimed Becoming series.",
    category: "artist-proofs",
    year: "2023",
    medium: "Fine Art Print on Baryta Paper",
    edition: "AP 2/2",
    dimensions: "60 × 80 cm",
    priceCents: null,
    originalPriceCents: null,
    isPriceOnRequest: true,
    isSold: false,
    isVisible: true,
    isFeatured: false,
    sortOrder: 11,
    images: [
      { id: "img12", url: placeholder(800, 600, "AP+Becoming"), altText: "Artist Proof — Becoming", sortOrder: 0, isPrimary: true },
    ],
  },
];

// ─── Mock settings ───
export const mockSettings: SiteSettings = {
  hero_statement: "VISUAL ARTIST BASED IN PORTUGAL, GUIMARÃES.",
  hero_tagline: "Self-portraiture, photography and drawing as acts of transformation and self-discovery.",
  about_intro: "I'm Soraia, a multidisciplinary artist working at the intersection of body, identity, and transformation.",
  about_bio: JSON.stringify([
    "My practice revolves around the body as a site of meaning — through self-portraiture, photography, and drawing, I explore the ways we inhabit, perform, and transform ourselves.",
    "Born and based in Guimarães, Portugal, I draw from the intimacy of personal experience to create work that resonates universally. Each piece is an invitation to pause, to look closer, to feel.",
    "My photographic work is printed on archival Hahnemühle papers, each edition carefully limited. The drawings emerge from an intuitive process — charcoal and graphite moving across paper like breath across skin.",
    "I believe art should be lived with, not just looked at. Whether through a fine art print on your wall or a piece of wearable sculpture, I want my work to become part of your daily landscape of meaning.",
  ]),
  about_identity: JSON.stringify([
    "CREATIVE THINKER",
    "DREAMER",
    "VISUAL STORYTELLER",
    "PHOTOGRAPHER",
    "DRAWER",
    "MAKER",
    "EXPLORER",
  ]),
  contact_email: "info@soraia-oliveira.com",
  studio_description: "A creative studio based in the historic city of Guimarães, Portugal — where heritage meets contemporary vision.",
  appointment_text: "Connecting with you is what fulfils me. Whether you want to visit the studio, discuss a piece, or explore a commission — I'd love to meet you.",
  appointment_url: "https://tidycal.com/soraiaoliveira/studio-visit",
  call_url: "https://tidycal.com/soraiaoliveira/online-meeting",
  social_instagram: "https://instagram.com/soraiaoliveira.art",
};

// ─── Mock exhibitions ───
export const mockExhibitions: Exhibition[] = [
  { id: "e1", title: "Becoming — Solo Exhibition", location: "Galeria Municipal de Guimarães, Portugal", year: "2024", type: "solo", externalUrl: null },
  { id: "e2", title: "Body as Landscape", location: "Centro Cultural Vila Flor, Guimarães", year: "2024", type: "solo", externalUrl: null },
  { id: "e3", title: "Encontros da Imagem", location: "Braga, Portugal", year: "2023", type: "group", externalUrl: null },
  { id: "e4", title: "Self & Other — Group Show", location: "Museu de Arte Contemporânea, Porto", year: "2023", type: "group", externalUrl: null },
  { id: "e5", title: "Artist Residency", location: "Cité Internationale des Arts, Paris", year: "2022", type: "residency", externalUrl: null },
  { id: "e6", title: "Emerging Portuguese Artists", location: "Culturgest, Lisbon", year: "2022", type: "group", externalUrl: null },
  { id: "e7", title: "Young Artists Award — Finalist", location: "Fundação EDP, Lisbon", year: "2021", type: "award", externalUrl: null },
  { id: "e8", title: "Traces — Solo Exhibition", location: "Espaço Maus Hábitos, Porto", year: "2021", type: "solo", externalUrl: null },
];

// ─── Mock news ───
export const mockNews: NewsItem[] = [
  { id: "n1", title: "Featured in Vogue Portugal — \"Artists Redefining Self-Portraiture\"", excerpt: "Soraia Oliveira among emerging artists reshaping the landscape of contemporary self-portraiture in Portugal.", externalUrl: "#", publishedDate: "2024-03-15", isVisible: true },
  { id: "n2", title: "Interview with Público — \"The Body as Canvas\"", excerpt: "An in-depth conversation about the intersection of photography, drawing, and identity.", externalUrl: "#", publishedDate: "2024-01-20", isVisible: true },
  { id: "n3", title: "Artist Talk at Centro Cultural Vila Flor", excerpt: "Join Soraia for an intimate conversation about her practice and creative process.", externalUrl: "#", publishedDate: "2023-11-10", isVisible: true },
  { id: "n4", title: "New Collection: Echo Jewelry Line", excerpt: "Introducing wearable sculptures inspired by the reverberations of self-discovery.", externalUrl: "#", publishedDate: "2024-02-01", isVisible: true },
];

// ─── Categories for filtering ───
export const categories = [
  { value: "all", label: "All Works" },
  { value: "photography", label: "Photography" },
  { value: "artist-proofs", label: "Artist Proofs" },
  { value: "drawings", label: "Drawings" },
  { value: "jewelry", label: "Jewelry" },
] as const;
