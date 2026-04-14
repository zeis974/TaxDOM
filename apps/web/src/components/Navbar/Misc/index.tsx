import { headers } from "next/headers"

import { authClient } from "@/lib/auth-client"

import Avatar from "@/components/Navbar/Misc/Avatar"
import SettingsButton from "@/components/Navbar/Misc/SettingsButton"

export default async function Misc() {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  return session ? <Avatar session={session} /> : <SettingsButton />
}
