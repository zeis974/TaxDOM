"use server"

export async function getCategoryById(categoryID: string) {
  console.log(categoryID)
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
