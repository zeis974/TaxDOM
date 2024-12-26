import { TaxSimulatorStoreProvider } from "@/providers/TaxSimulatorStoreProvider"

export default function TaxSimulatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TaxSimulatorStoreProvider>{children}</TaxSimulatorStoreProvider>
}
