"use server"

import type { TaxSimulatorFormValues } from "@/services/TaxSimulator/types"

export async function getProductTaxes(value: TaxSimulatorFormValues) {
  const data = await fetch(`${process.env.API_URL}/products/taxes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(value),
  }).then((res) => res.json())

  if (data.errors) {
    // Logs errors
  }

  return data
}
