import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import CustomsTree from "@/components/Dashboard/CustomsTree"
import { ErrorComponent } from "@/components/ErrorComponent"

export const Route = createFileRoute("/_dashboard-layout/customs-tree")({
  validateSearch: (search: Record<string, unknown>) => ({
    chapter: (() => {
      const n = Number(search.chapter)
      return Number.isInteger(n) && n >= 1 && n <= 99 ? n : undefined
    })(),
    code: typeof search.code === "string" && search.code.length > 0 ? search.code : undefined,
  }),
  errorComponent: ErrorComponent,
  component: CustomsTreePage,
})

function CustomsTreePage() {
  return (
    <Suspense fallback={null}>
      <CustomsTree />
    </Suspense>
  )
}
