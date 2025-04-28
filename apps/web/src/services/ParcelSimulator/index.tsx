import { styled } from "@/panda/jsx"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import { fetchTemplates } from "@/lib/fetchTemplate"

import ParcelSimulator from "@/components/ParcelSimulatorForm"

export default async function ParcelSimulatorService() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(fetchTemplates)

  return (
    <Section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ParcelSimulator />
      </HydrationBoundary>
    </Section>
  )
}

const Section = styled.section`
  width: calc(100% - 20px);
  height: calc(100svh - (token(sizes.navbarHeight) + 35px));
  max-width: token(sizes.maxWidth);
  margin: 0 auto;
  margin-top: 20px;
`
