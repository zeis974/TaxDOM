import { execFile } from "node:child_process"
import { promisify } from "node:util"
import app from "@adonisjs/core/services/app"
import limiter from "@adonisjs/limiter/services/main"
import { getTableName, is, sql } from "drizzle-orm"
import { PgTable } from "drizzle-orm/pg-core"

import { db } from "#config/database"
import * as authSchema from "#database/auth-schema"
import * as schema from "#database/schema"
import env from "#start/env"

const run = promisify(execFile)

const schemaExports: unknown[] = [...Object.values(schema), ...Object.values(authSchema)]

const tableNames = schemaExports
  .filter((value): value is PgTable => is(value, PgTable))
  .map((table) => `"${getTableName(table)}"`)

const databaseName = new URL(env.get("DB_URL")).pathname.slice(1)

/**
 * An exported DB_URL takes precedence over `.env.test`, so refuse to push or truncate anything
 * that is not a dedicated test database.
 */
function assertTestDatabase() {
  if (!databaseName.endsWith("_test")) {
    throw new Error(`Refusing to run tests against "${databaseName}": expected a *_test database`)
  }
}

/**
 * Drizzle counterpart of `testUtils.db().migrate()`. Migrations are gitignored, so the test
 * database is synced from the schema files with `drizzle-kit push` instead.
 */
export async function pushSchema() {
  assertTestDatabase()

  try {
    await run("pnpm", ["exec", "drizzle-kit", "push", "--force"], {
      cwd: app.makePath(),
      env: { ...process.env, DB_URL: env.get("DB_URL") },
    })
  } catch (error) {
    // drizzle-kit exits without printing anything, so point at the usual causes
    throw new Error(
      `drizzle-kit push failed for "${databaseName}". Is Postgres running and the database created? (docker exec taxdom_db createdb -U postgres ${databaseName})`,
      { cause: error },
    )
  }
}

/**
 * Drizzle counterpart of `testUtils.db().truncate()`, meant for `group.each.setup()`. Also
 * resets the in-memory rate limiters so throttled routes start every test with a full quota.
 */
export async function truncateDatabase() {
  assertTestDatabase()
  await db.execute(sql.raw(`TRUNCATE ${tableNames.join(", ")} RESTART IDENTITY CASCADE`))
  await limiter.clear(["memory"])
}

export async function closeDatabase() {
  await db.$client.end()
}
