"use client"

import { authClient } from "@/lib/auth-client"

import { AvatarIcon } from "./Avatar.styled"

export default function Avatar() {
  const { data: session } = authClient.useSession()

  return (
    <>
      {session && (
        <AvatarIcon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundImage: `url(${session?.user?.image})` }}
        />
      )}
    </>
  )
}
