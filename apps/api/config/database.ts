import * as schema from "#database/schema"

import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import env from "#start/env"

const client = createClient({
  url: env.get("DB_URL"),
})

export const db = drizzle(client, { schema: schema })

async function initializeDatabase() {
  const queries = [
    ["CREATE TABLE IF NOT EXISTS temp_check (x);", "DROP TABLE IF EXISTS temp_check;"],
    [
      "SELECT 1 FROM sqlite_master WHERE type='table' AND name='products_fts';",
      `CREATE VIRTUAL TABLE IF NOT EXISTS products_fts USING fts5(
        product_name,
        content='products',
        content_rowid='product_id'
      );`,
    ],
    [
      "SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='products_ai';",
      `CREATE TRIGGER IF NOT EXISTS products_ai AFTER INSERT ON products BEGIN
        INSERT INTO products_fts(rowid, product_name)
        VALUES (new.product_id, new.product_name);
      END;`,
    ],
    [
      "SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='products_au';",
      `CREATE TRIGGER IF NOT EXISTS products_au AFTER UPDATE ON products BEGIN
        UPDATE products_fts
        SET product_name = new.product_name
        WHERE rowid = old.product_id;
      END;`,
    ],
    [
      "SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='products_ad';",
      `CREATE TRIGGER IF NOT EXISTS products_ad AFTER DELETE ON products BEGIN
        DELETE FROM products_fts WHERE rowid = old.product_id;
      END;`,
    ],
  ]

  for (const queryBatch of queries) {
    await client.batch(queryBatch, "write")
  }
}

initializeDatabase().catch(console.error)
