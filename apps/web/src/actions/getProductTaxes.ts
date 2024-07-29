"use server"

import type { TaxSimulatorFormValues } from "@taxdom/types"

export async function getProductTaxes(value: TaxSimulatorFormValues) {
  const data = await fetch(`${process.env.API_URL}/getProductTaxes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  }).then((res) => res.json())

  return data[0]
}
