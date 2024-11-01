import * as schema from "#database/schema"

import env from "#start/env"
import { drizzle } from "drizzle-orm/libsql"

export const db = drizzle(env.get("DB_URL"), {
  schema: schema,
})
