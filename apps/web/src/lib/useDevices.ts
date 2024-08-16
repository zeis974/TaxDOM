import { headers } from "next/headers"

export default function useDevices() {
  const deviceHeaders = headers().get("X-Device")
  const deviceVendors = deviceHeaders?.match(/Vendor\/([^,]+)/)?.[1]
  const deviceType = deviceHeaders?.match(/Type\/([^,]+)/)?.[1]

  const isMobile = deviceType === "mobile"

  return { deviceType, isMobile, deviceVendors }
}
