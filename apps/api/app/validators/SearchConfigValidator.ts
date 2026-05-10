import vine from "@vinejs/vine"

const minWordSizeForTyposSchema = vine.object({
  oneTypo: vine.number().min(1).optional(),
  twoTypos: vine.number().min(1).optional(),
})

const typoToleranceSchema = vine.object({
  enabled: vine.boolean().optional(),
  disableOnAttributes: vine.array(vine.string().trim().maxLength(255)).optional(),
  disableOnNumbers: vine.boolean().optional(),
  disableOnWords: vine.array(vine.string().trim().maxLength(255)).optional(),
  minWordSizeForTypos: minWordSizeForTyposSchema.optional(),
})

const stringArraySchema = vine.array(vine.string().trim().maxLength(255))

export const SearchConfigValidator = vine.create(
  vine.object({
    searchableAttributes: stringArraySchema.optional(),
    displayedAttributes: stringArraySchema.optional(),
    sortableAttributes: stringArraySchema.optional(),
    filterableAttributes: stringArraySchema.optional(),
    rankingRules: stringArraySchema.optional(),
    typoTolerance: typoToleranceSchema.optional(),
  }),
)
