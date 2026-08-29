import { useQuery } from "@tanstack/react-query"
import { getCountryFlag } from "@taxdom/types"
import { client } from "@/lib/api"

interface FormOption {
  name: string
  value: string
  taxID?: string
  available?: boolean
  isEU?: boolean
  flag?: string
}
export function useProductFormOptions() {
  return useQuery({
    queryKey: ["productFormOptions"],
    queryFn: async () => {
      const [categoriesRaw, originsRaw, territoriesRaw] = await Promise.all([
        client.api.categories.index({}),
        client.api.origins.index({}),
        client.api.territories.index({}),
      ])

      const categories: FormOption[] = categoriesRaw.map((c) => ({
        name: c.categoryName,
        value: c.categoryID,
        taxID: c.taxID,
      }))

      const origins: FormOption[] = originsRaw.map((o) => ({
        name: o.name,
        value: o.originID,
        isEU: o.isEU,
        flag: getCountryFlag(o.name),
      }))

      const territories: FormOption[] = territoriesRaw.map((t) => ({
        name: t.territoryName,
        value: t.territoryID,
        available: t.available,
      }))

      return { categories, origins, territories }
    },
    staleTime: 5 * 60 * 1000,
  })
}
