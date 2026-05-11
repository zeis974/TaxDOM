import type { TypoTolerance } from "meilisearch"

import { productsIndex } from "#lib/meilisearch"

export async function getSynonyms() {
  const settings = await productsIndex.getSettings()
  return settings.synonyms ?? {}
}

export async function updateSynonyms(synonyms: Record<string, string[]>) {
  const { taskUid } = await productsIndex.updateSettings({ synonyms })
  await productsIndex.tasks.waitForTask(taskUid)
}

export async function addSynonym(key: string, values: string[]) {
  const current = await getSynonyms()
  const existing = current[key] ?? []
  const updated = [...new Set([...existing, ...values])]
  await updateSynonyms({ ...current, [key]: updated })
}

export async function removeSynonym(key: string, value: string) {
  const current = await getSynonyms()
  const existing = current[key] ?? []
  const updated = existing.filter((v: string) => v !== value)
  if (updated.length === 0) {
    const { [key]: _, ...rest } = current
    await updateSynonyms(rest)
  } else {
    await updateSynonyms({ ...current, [key]: updated })
  }
}

export async function getSearchConfig() {
  const settings = await productsIndex.getSettings()
  return {
    searchableAttributes: settings.searchableAttributes,
    displayedAttributes: settings.displayedAttributes,
    sortableAttributes: settings.sortableAttributes,
    filterableAttributes: settings.filterableAttributes,
    typoTolerance: settings.typoTolerance,
    synonyms: settings.synonyms ?? {},
    rankingRules: settings.rankingRules,
  }
}

export async function updateSearchConfig(config: {
  searchableAttributes?: string[]
  displayedAttributes?: string[]
  sortableAttributes?: string[]
  filterableAttributes?: string[]
  typoTolerance?: TypoTolerance
  rankingRules?: string[]
}) {
  const { taskUid } = await productsIndex.updateSettings(config)
  await productsIndex.tasks.waitForTask(taskUid)
}
