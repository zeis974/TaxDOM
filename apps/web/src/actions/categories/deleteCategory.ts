"use server"

export interface DeleteCategoryResponse {
  message: string
}

export async function deleteCategory(categoryID: number): Promise<DeleteCategoryResponse> {
  if (!Number.isInteger(categoryID) || categoryID <= 0) {
    throw new Error("Invalid category ID");
  }
  const response = await fetch(`${process.env.API_URL}/categories/${categoryID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Erreur lors de la suppression de la catégorie")
  }

  return response.json()
}
