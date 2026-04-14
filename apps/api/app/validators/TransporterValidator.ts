import vine from "@vinejs/vine"

export const CreateTransporterValidator = vine.create({
  transporterName: vine.string().trim().minLength(1).maxLength(255),
})

export const UpdateTransporterValidator = vine.create({
  transporterName: vine.string().trim().minLength(1).maxLength(255).optional(),
  available: vine.boolean().optional(),
})
