import vine from "@vinejs/vine"

export const createOriginValidator = vine.create(
  vine.object({
    originName: vine.string().trim().minLength(1).maxLength(100),
    isEU: vine.boolean(),
    available: vine.boolean().optional(),
  }),
)

export const updateOriginValidator = vine.create(
  vine.object({
    originName: vine.string().trim().minLength(1).maxLength(100).optional(),
    isEU: vine.boolean().optional(),
    available: vine.boolean().optional(),
  }),
)
