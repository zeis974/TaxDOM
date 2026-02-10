"use server"

import type { SelectOption } from "@taxdom/types"
import { cookies } from "next/headers"

type ProductFormData = {
  categories: SelectOption[]
  origins: SelectOption[]
  territories: SelectOption[]
  flux: SelectOption[]
  taxes: { taxID: string; tva: number; om: number; omr: number }[]
}

export async function getProductFormData(): Promise<ProductFormData> {
  const cookieStore = await cookies()
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
    "Content-Type": "application/json",
    Cookie: cookieStore.toString(),
  }

  const [categoriesRes, originsRes, territoriesRes, fluxRes, taxesRes] = await Promise.all([
    fetch(`${process.env.API_URL}/dashboard/categories`, {
      headers,
      next: { tags: ["categories"] },
    }),
    fetch(`${process.env.API_URL}/dashboard/origins`, {
      headers,
      next: { tags: ["origins"] },
    }),
    fetch(`${process.env.API_URL}/dashboard/territories`, {
      headers,
      next: { tags: ["territories"] },
    }),
    fetch(`${process.env.API_URL}/dashboard/flux`, {
      headers,
      next: { tags: ["flux"] },
    }),
    fetch(`${process.env.API_URL}/dashboard/taxes`, {
      headers,
      next: { tags: ["taxes"] },
    }),
  ])

  const [categoriesData, originsData, territoriesData, fluxData, taxesData] = await Promise.all([
    categoriesRes.ok ? categoriesRes.json() : [],
    originsRes.ok ? originsRes.json() : [],
    territoriesRes.ok ? territoriesRes.json() : [],
    fluxRes.ok ? fluxRes.json() : [],
    taxesRes.ok ? taxesRes.json() : [],
  ])

  return {
    categories: categoriesData.map(
      (c: { categoryID: string; categoryName: string }): SelectOption => ({
        name: c.categoryName,
        value: c.categoryID,
      }),
    ),
    origins: originsData.map(
      (o: { originID: string; originName: string; isEU: boolean }): SelectOption => ({
        name: o.originName,
        value: o.originID,
        isEU: o.isEU,
      }),
    ),
    territories: territoriesData.map(
      (t: { territoryID: string; territoryName: string }): SelectOption => ({
        name: t.territoryName,
        value: t.territoryID,
      }),
    ),
    flux: fluxData.map(
      (f: { fluxID: string; fluxName: string }): SelectOption => ({
        name: f.fluxName,
        value: f.fluxID,
      }),
    ),
    taxes: taxesData,
  }
}
