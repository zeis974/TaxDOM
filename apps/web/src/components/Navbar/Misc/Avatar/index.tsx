import type { authClient } from "@/lib/auth-client"

import { AvatarIcon } from "./Avatar.styled"

export default function Avatar({ session }: { session: typeof authClient.$Infer.Session }) {
  return session && <AvatarIcon style={{ backgroundImage: `url(${session?.user?.image})` }} />
}
