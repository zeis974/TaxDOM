// import * as schema from "#database/schema"
// import env from "#start/env"

import * as schema from "../database/schema.js"
import env from "../start/env.js"

import { drizzle } from "drizzle-orm/libsql"
import { sql } from "drizzle-orm"

export const db = drizzle({
  connection: {
    url: env.get("DB_URL"),
    authToken: env.get("DB_AUTH_TOKEN"),
  },
  schema: schema,
})

await db.batch([
  db.run(sql`CREATE TABLE IF NOT EXISTS temp_check (x);`),
  db.run(sql`DROP TABLE IF EXISTS temp_check;`),
  db.run(sql`SELECT 1 FROM sqlite_master WHERE type='table' AND name='products_fts';`),
  db.run(sql`
    CREATE VIRTUAL TABLE IF NOT EXISTS products_fts USING fts5(
      product_name,
      content='products',
      content_rowid='product_id'
    );
  `),
  db.run(sql`
    SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='products_ai';
  `),
  db.run(sql`
    CREATE TRIGGER IF NOT EXISTS products_ai AFTER INSERT ON products BEGIN
      INSERT INTO products_fts(rowid, product_name)
      VALUES (new.product_id, new.product_name);
    END;
  `),
  db.run(sql`
    SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='products_au';
  `),
  db.run(sql`
    CREATE TRIGGER IF NOT EXISTS products_au AFTER UPDATE ON products BEGIN
      UPDATE products_fts
      SET product_name = new.product_name
      WHERE rowid = old.product_id;
    END;
  `),
  db.run(sql`
    SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='products_ad';
  `),
  db.run(sql`
    CREATE TRIGGER IF NOT EXISTS products_ad AFTER DELETE ON products BEGIN
      DELETE FROM products_fts WHERE rowid = old.product_id;
    END;
  `),
])
