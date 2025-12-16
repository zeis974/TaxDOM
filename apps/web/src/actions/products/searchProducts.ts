"use server"

export async function searchProducts(value: string) {
  const res = await fetch(`${process.env.API_URL}/products/search?name=${value}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })

  const data: { name: string }[] = await res.json()

  console.log(data)

  return data
}
