import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  decimal,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Artworks ───

export const artworks = pgTable(
  "artworks",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 50 }).notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    year: varchar("year", { length: 10 }),
    medium: varchar("medium", { length: 255 }),
    edition: varchar("edition", { length: 255 }),
    dimensions: varchar("dimensions", { length: 255 }),
    price: decimal("price", { precision: 10, scale: 2 }),
    originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
    priceOnRequest: boolean("price_on_request").default(false).notNull(),
    isSold: boolean("is_sold").default(false).notNull(),
    isVisible: boolean("is_visible").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("artworks_slug_idx").on(table.slug),
    index("artworks_category_idx").on(table.category),
    index("artworks_visible_idx").on(table.isVisible),
  ]
);

export const artworkImages = pgTable(
  "artwork_images",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    artworkId: integer("artwork_id")
      .notNull()
      .references(() => artworks.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    fileKey: varchar("file_key", { length: 255 }),
    altText: varchar("alt_text", { length: 255 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("artwork_images_artwork_idx").on(table.artworkId)]
);

// ─── News ───

export const news = pgTable(
  "news",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt"),
    externalUrl: text("external_url"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    isVisible: boolean("is_visible").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("news_visible_idx").on(table.isVisible)]
);

// ─── Exhibitions ───

export const exhibitions = pgTable(
  "exhibitions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }),
    year: varchar("year", { length: 10 }),
    type: varchar("type", { length: 50 }).notNull(),
    externalUrl: text("external_url"),
    isVisible: boolean("is_visible").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("exhibitions_type_idx").on(table.type)]
);

// ─── Site Settings ───

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ─── Contacts ───

export const contacts = pgTable("contacts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Newsletter Subscribers ───

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    email: varchar("email", { length: 255 }).notNull(),
    subscribedAt: timestamp("subscribed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (table) => [uniqueIndex("newsletter_email_idx").on(table.email)]
);

// ─── Orders ───

export const orders = pgTable(
  "orders",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    artworkId: integer("artwork_id").references(() => artworks.id, {
      onDelete: "set null",
    }),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
    status: varchar("status", { length: 50 }).default("pending").notNull(),
    stripeSessionId: varchar("stripe_session_id", { length: 255 }),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", {
      length: 255,
    }),
    shippingAddress: jsonb("shipping_address"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("orders_status_idx").on(table.status),
    index("orders_artwork_idx").on(table.artworkId),
  ]
);

// ─── Relations ───

export const artworksRelations = relations(artworks, ({ many }) => ({
  images: many(artworkImages),
  orders: many(orders),
}));

export const artworkImagesRelations = relations(artworkImages, ({ one }) => ({
  artwork: one(artworks, {
    fields: [artworkImages.artworkId],
    references: [artworks.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  artwork: one(artworks, {
    fields: [orders.artworkId],
    references: [artworks.id],
  }),
}));

// ─── Type exports ───

export type Artwork = typeof artworks.$inferSelect;
export type NewArtwork = typeof artworks.$inferInsert;
export type ArtworkImage = typeof artworkImages.$inferSelect;
export type NewArtworkImage = typeof artworkImages.$inferInsert;
export type NewsItem = typeof news.$inferSelect;
export type Exhibition = typeof exhibitions.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type Order = typeof orders.$inferSelect;
