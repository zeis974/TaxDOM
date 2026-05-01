import vine from "@vinejs/vine"

export const createTerritoryValidator = vine.create(
  vine.object({
    territoryName: vine.string().trim().minLength(1).maxLength(100),
    available: vine.boolean().optional(),
  }),
)

export const updateTerritoryValidator = vine.create(
  vine.object({
    territoryName: vine.string().trim().minLength(1).maxLength(100).optional(),
    available: vine.boolean().optional(),
  }),
)
