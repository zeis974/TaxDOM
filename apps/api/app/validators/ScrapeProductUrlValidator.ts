import vine from "@vinejs/vine"

export const ScrapeProductUrlValidator = vine.create(
  vine.object({
    url: vine.string().trim().url().maxLength(2048),
  }),
)
