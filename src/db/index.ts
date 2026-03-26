import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy-init: neon() throws if DATABASE_URL is missing.
// During build, env vars may not be set — the site renders fine with mock data fallback.
let _db: NeonHttpDatabase<typeof schema> | null = null;

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    if (!_db) {
      const url = process.env.DATABASE_URL;
      if (!url) {
        // Return a dummy that makes all queries fail gracefully
        // (query functions in src/lib/queries/ have try/catch → mock data fallback)
        throw new Error("[DB] DATABASE_URL not set");
      }
      const sql: NeonQueryFunction<false, false> = neon(url);
      _db = drizzle({ client: sql, schema });
    }
    return (_db as unknown as Record<string | symbol, unknown>)[prop];
  },
});
