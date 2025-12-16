"use server"

export async function checkOriginDeletion(originID: string): Promise<{
  canDelete: boolean
  productsCount?: number
  error?: string
}> {
  try {
    const res = await fetch(`${process.env.API_URL}/dashboard/origins/${originID}/products/count`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })

    if (!res.ok) {
      return { canDelete: false, error: "Erreur lors de la vérification" }
    }

    const { count } = await res.json()

    return {
      canDelete: count === 0,
      productsCount: count,
    }
  } catch (error) {
    console.error("Error checking origin deletion:", error)
    return { canDelete: false, error: "Erreur lors de la vérification" }
  }
}
