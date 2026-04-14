import { styled } from "@/panda/jsx"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { fetchTemplates } from "@/lib/fetchTemplate"
import { getQueryClient } from "@/lib/getQueryClient"

import ParcelSimulatorForm from "./ParcelSimulatorForm"

export default function ParcelSimulatorService() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(fetchTemplates)

  return (
    <Section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ParcelSimulatorForm />
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
