"use server"

import type { Product } from "@taxdom/types"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      next: {
        tags: ["products"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
    }

    const data: Product[] = await res.json()

    console.log(data)

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}
