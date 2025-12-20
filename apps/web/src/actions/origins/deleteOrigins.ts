"use server"

interface DeleteOriginsResponse {
  message?: string
  error?: string
}

export async function deleteOrigins(originIDs: string[]): Promise<DeleteOriginsResponse> {
  const VALID_ID_REGEX = /^[a-zA-Z0-9\-_]{1,64}$/

  try {
    const results = await Promise.allSettled(
      originIDs.map(async (id) => {
        if (!VALID_ID_REGEX.test(id)) {
          throw new Error(`Invalid origin ID: ${id}`);
        }
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
