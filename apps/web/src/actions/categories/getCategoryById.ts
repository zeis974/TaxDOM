"use server"

export async function getCategoryById(categoryID: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(categoryID)) {
    console.log("Invalid categoryID format:", categoryID)
    return null
  }

  try {
    const res = await fetch(`${process.env.API_URL}/categories/${categoryID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.log("Error fetching category:", error)
    return null
  }
}
