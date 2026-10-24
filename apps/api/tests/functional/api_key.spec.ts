import { test } from "@japa/runner"

import { truncateDatabase } from "#tests/helpers/database"

test.group("Public api key", (group) => {
  group.each.setup(() => truncateDatabase())

  test("rejects write requests without an api key", async ({ client }) => {
    const response = await client.post("/v1/public/simulator/parcel").json({})

    response.assertStatus(401)
    response.assertHeader("www-authenticate", "ApiKey")
    response.assertBody({ error: "Unauthorized" })
  })

  test("rejects write requests with a wrong api key", async ({ client }) => {
    const response = await client
      .post("/v1/public/simulator/parcel")
      .header("X-Api-Key", "wrong-key")
      .json({})

    response.assertStatus(401)
    response.assertHeader("www-authenticate", "ApiKey")
    response.assertBody({ error: "Unauthorized" })
  })

  test("lets write requests with the api key reach validation", async ({ client }) => {
    const response = await client
      .post("/v1/public/simulator/parcel")
      .header("X-Api-Key", "test-api-key")
      .json({})

    response.assertStatus(422)
    response.assertBodyContains({ success: false, error: { code: "VALIDATION_ERROR" } })
  })
})
