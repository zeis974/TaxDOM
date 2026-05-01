import vine from "@vinejs/vine"

export const CreateTransporterValidator = vine.create(
  vine.object({
    transporterName: vine.string().trim().minLength(1).maxLength(255),
    available: vine.boolean().optional(),
  }),
)

export const UpdateTransporterValidator = vine.create(
  vine.object({
    transporterName: vine.string().trim().minLength(1).maxLength(255).optional(),
    available: vine.boolean().optional(),
  }),
)
