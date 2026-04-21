import vine from "@vinejs/vine"

export const CreateCategoryValidator = vine.create(
  vine.object({
    categoryName: vine.string().trim().minLength(1).maxLength(255),
    tva: vine.number().min(0),
    om: vine.number().min(0),
    omr: vine.number().min(0),
  }),
)

export const UpdateCategoryValidator = vine.create(
  vine.object({
    categoryName: vine.string().trim().minLength(1).maxLength(255),
    taxID: vine.string().uuid().optional(),
  }),
)
