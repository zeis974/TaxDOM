import env from "#start/env"

import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "#database/schema"

const client = createClient({
  url: env.get("DB_URL"),
})

export const db = drizzle(client, { schema })
