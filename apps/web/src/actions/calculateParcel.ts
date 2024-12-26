"use server"

import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

export async function calculateParcel(data: ParcelSimulatorFormValues) {
  const res = await fetch(`${process.env.API_URL}/simulator/parcel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())

  return res
}
