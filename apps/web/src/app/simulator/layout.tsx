import { ParcelSimulatorStoreProvider } from "@/providers/ParcelSimulatorStoreProvider"

export default function ParcelSimulatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ParcelSimulatorStoreProvider>{children}</ParcelSimulatorStoreProvider>
}
