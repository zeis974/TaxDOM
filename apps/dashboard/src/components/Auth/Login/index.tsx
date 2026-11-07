import { useSearch } from "@tanstack/react-router"
import { useRef, useState } from "react"
import laptop from "@/assets/products/laptop.webp"
import mobilePhone from "@/assets/products/mobile-phone.webp"
import packageBox from "@/assets/products/package.webp"
import runningShoe from "@/assets/products/running-shoe.webp"
import tShirt from "@/assets/products/t-shirt.webp"
import teddyBear from "@/assets/products/teddy-bear.webp"
import videoGame from "@/assets/products/video-game.webp"
import logo from "@/assets/taxdom.webp"
import { authClient } from "@/lib/auth-client"
import { DotTrail } from "./DotTrail"
import {
  BrandName,
  Button,
  Chip,
  ChipImage,
  Core,
  ErrorMessage,
  FormPanel,
  Icon,
  Layout,
  Main,
  Orbit,
  Ring,
  ShowcasePanel,
} from "./Login.styled"

type Product = { src: string; angle: number }

// Chips sit on the rings; each ring spins and its chips counter-spin to stay upright.
const OUTER: Product[] = [
  { src: laptop, angle: 270 },
  { src: mobilePhone, angle: 342 },
  { src: tShirt, angle: 54 },
  { src: teddyBear, angle: 126 },
  { src: packageBox, angle: 198 },
]
const INNER: Product[] = [
  { src: runningShoe, angle: 60 },
  { src: videoGame, angle: 240 },
]

const place = (angle: number) => ({
  left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
  top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
})

// Keys are the error codes of apps/api/app/lib/admin_access.ts.
const ERROR_MESSAGES: Record<string, string> = {
  admin_access_denied: "Ce compte n'est pas autorisé à accéder au dashboard.",
}
const FALLBACK_ERROR = "La connexion a échoué. Réessayez."

// `error` comes from the URL: an own-property check keeps `__proto__` or `constructor` out.
const describeError = (code: string) =>
  Object.hasOwn(ERROR_MESSAGES, code) ? ERROR_MESSAGES[code] : FALLBACK_ERROR

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false)
  const [signInFailed, setSignInFailed] = useState(false)
  const orbitRef = useRef<HTMLDivElement>(null)
  const { error } = useSearch({ from: "/_login-layout/login" })

  const handleGoogleLogin = async () => {
    setIsPending(true)
    setSignInFailed(false)
    // better-auth resolves HTTP errors as `{ error }` instead of throwing.
    const result = await authClient.signIn
      .social({
        provider: "google",
        callbackURL: import.meta.env.VITE_APP_URL,
        errorCallbackURL: `${import.meta.env.VITE_APP_URL}/login`,
      })
      .catch((error: unknown) => ({ error }))
    if (result.error) {
      console.error("Login error:", result.error)
      setSignInFailed(true)
      setIsPending(false)
    }
  }

  const errorMessage = signInFailed ? FALLBACK_ERROR : error ? describeError(error) : null

  return (
    <Layout>
      <FormPanel>
        <Main>
          <BrandName>TaxDOM</BrandName>
          <Button type="button" onClick={handleGoogleLogin} disabled={isPending}>
            <Icon viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </Icon>
            {isPending ? "Connexion en cours..." : "Continuer avec Google"}
          </Button>
          {errorMessage ? <ErrorMessage role="alert">{errorMessage}</ErrorMessage> : null}
        </Main>
      </FormPanel>
      <ShowcasePanel>
        <DotTrail orbitRef={orbitRef} />
        <Orbit ref={orbitRef} aria-hidden="true">
          <Ring position="outer" style={{ inset: "0" }}>
            {OUTER.map((product, index) => (
              <ProductChip key={product.angle} product={product} index={index} />
            ))}
          </Ring>
          <Ring position="inner" reverse style={{ inset: "22%" }}>
            {INNER.map((product, index) => (
              <ProductChip
                key={product.angle}
                product={product}
                index={OUTER.length + index}
                reverse
              />
            ))}
          </Ring>
          <Core src={logo} alt="" />
        </Orbit>
      </ShowcasePanel>
    </Layout>
  )
}

function ProductChip({
  product,
  index,
  reverse,
}: {
  product: Product
  index: number
  reverse?: boolean
}) {
  // Chips pop in one by one once the rings are drawn.
  const delay = 500 + index * 80
  return (
    <Chip
      data-chip
      reverse={reverse}
      style={{ ...place(product.angle), animationDelay: `${delay}ms, 0s` }}
    >
      <ChipImage src={product.src} alt="" />
    </Chip>
  )
}
