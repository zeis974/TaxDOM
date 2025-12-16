"use server"

interface DeleteOriginsResponse {
  message?: string
  error?: string
}

export async function deleteOrigins(originIDs: string[]): Promise<DeleteOriginsResponse> {
  try {
    // For now, we'll delete one by one since the API might not support bulk delete
    const results = await Promise.allSettled(
      originIDs.map(async (id) => {
        const res = await fetch(`${process.env.API_URL}/dashboard/origins/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to delete origin ${id}: ${res.status}`)
        }

        return id
      }),
    )

    const failed = results.filter((result) => result.status === "rejected")
    const successful = results.filter((result) => result.status === "fulfilled")

    if (failed.length > 0) {
      return {
        error: `${failed.length} origine(s) n'ont pas pu être supprimée(s)`,
      }
    }

    return {
      message: `${successful.length} origine(s) supprimée(s) avec succès`,
    }
  } catch (error) {
    console.error("Error deleting origins:", error)
    return {
      error: "Erreur lors de la suppression des origines",
    }
  }
}
