import type { ParcelSimulatorTemplateType } from "@/components/services/ParcelSimulator/types"
import { api } from "../api/api-client"

export const templatesQueryOptions = api.getTemplates.queryOptions(
  {},
  {
    staleTime: 24 * 60 * 60 * 1000,
    select: (data): ParcelSimulatorTemplateType =>
      data.map((template) => ({
        templateID: Number(template.templateID),
        templateName: template.templateName,
        products: template.products.map((product) => ({
          productID: Number(product.productID),
          productName: product.productName,
        })),
      })),
  },
)
