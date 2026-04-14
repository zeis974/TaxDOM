import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import * as schema from "../database/schema.js"
import env from "../start/env.js"

const pool = new Pool({
  connectionString: env.get("DB_URL"),
  ssl: env.get("NODE_ENV") !== "development",
})

export const db = drizzle({ client: pool, schema })
