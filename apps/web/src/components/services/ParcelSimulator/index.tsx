import { styled } from "@/panda/jsx"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { getQueryClient } from "@/lib/getQueryClient"
import { templatesQueryOptions } from "@/lib/queries/templates"

import ParcelSimulatorForm from "./ParcelSimulatorForm"

export default async function ParcelSimulatorService() {
  const queryClient = getQueryClient()

  // Awaited so an unreachable API at build time leaves the query out of the dehydrated
  // state (the client fetches it) instead of failing the prerender with a rejected promise
  await queryClient.prefetchQuery(templatesQueryOptions)

  return (
    <Section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ParcelSimulatorForm />
      </HydrationBoundary>
    </Section>
  )
}

const Section = styled("section", {
  base: {
    width: "calc(100% - 20px)",
    height: "calc(100svh - ({sizes.navbarHeight} + 35px))",
    maxWidth: "{sizes.maxWidth}",
    margin: "0 auto",
    marginTop: "{spacing.s20}",
  },
})
