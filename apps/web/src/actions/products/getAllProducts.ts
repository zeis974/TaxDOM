"use server"

import type { Product } from "@taxdom/types"
import { cookies } from "next/headers"

export async function getAllProducts(): Promise<Product[]> {
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ["products"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
    }

    const data: Product[] = await res.json()

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}
