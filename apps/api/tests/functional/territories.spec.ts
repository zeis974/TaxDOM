import { test } from "@japa/runner"

import { db } from "#config/database"
import { territories } from "#database/schema"
import { truncateDatabase } from "#tests/helpers/database"

test.group("Public territories", (group) => {
  group.each.setup(() => truncateDatabase())

  test("lists available territories sorted by name", async ({ client }) => {
    await db
      .insert(territories)
      .values([
        { territoryName: "REUNION" },
        { territoryName: "GUADELOUPE" },
        { territoryName: "MAYOTTE", available: false },
      ])

    const response = await client.get("/v1/public/territories")

    response.assertStatus(200)
    response.assertBody([{ name: "GUADELOUPE" }, { name: "REUNION" }])
  })

  test("does not require an api key for GET requests", async ({ client }) => {
    const response = await client.get("/v1/public/territories")

    response.assertStatus(200)
    response.assertBody([])
  })
})

test.group("Admin territories", (group) => {
  group.each.setup(() => truncateDatabase())

  test("rejects requests without a session", async ({ client }) => {
    const response = await client.get("/v1/admin/territories")

    response.assertStatus(401)
    response.assertBody({ error: "Unauthorized access" })
  })
})
