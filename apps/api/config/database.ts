import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import env from "#start/env"

const pool = new Pool({
  connectionString: env.get("DB_URL"),
  ssl: env.get("NODE_ENV") !== "development",
})

export const db = drizzle({ client: pool })
