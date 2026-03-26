import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// Lazy-init: postgres() throws if DATABASE_URL is missing.
// During build, env vars may not be set — the site renders fine with mock data fallback.
let _db: PostgresJsDatabase<typeof schema> | null = null;

export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop) {
    if (!_db) {
      const url = process.env.DATABASE_URL;
      if (!url) {
        throw new Error("[DB] DATABASE_URL not set");
      }
      const sql = postgres(url, { prepare: false });
      _db = drizzle({ client: sql, schema });
    }
    return (_db as unknown as Record<string | symbol, unknown>)[prop];
  },
});
