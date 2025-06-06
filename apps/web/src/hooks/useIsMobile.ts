"use server"

import { headers } from "next/headers"

export async function useDetectDevice() {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent")

  const isSmartphone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent || "",
  )

  return isSmartphone
}
