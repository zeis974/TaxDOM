import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/api"

interface FormOption {
  name: string
  value: string
  taxID?: string
  available?: boolean
  isEU?: boolean
}

export function useProductFormOptions() {
  return useQuery({
    queryKey: ["productFormOptions"],
    queryFn: async () => {
      const [categoriesRaw, originsRaw, territoriesRaw, taxesRaw] = await Promise.all([
        client.api.categories.index({}),
        client.api.origins.index({}),
        client.api.territories.index({}),
        client.api.products.listTaxes({}),
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
      }))

      const territories: FormOption[] = territoriesRaw.map((t) => ({
        name: t.territoryName,
        value: t.territoryID,
        available: t.available,
      }))

      const taxes = taxesRaw

      return { categories, origins, territories, taxes }
    },
    staleTime: 5 * 60 * 1000,
  })
}
