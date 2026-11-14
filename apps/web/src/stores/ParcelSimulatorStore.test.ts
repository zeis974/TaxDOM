import type { ParcelSimulatorResult } from "@taxdom/types"
import { expect, it } from "vitest"
import { createParcelSimulatorStore, defaultInitState } from "./ParcelSimulatorStore"

it("starts from the default state", () => {
  expect(createParcelSimulatorStore().getState()).toMatchObject(defaultInitState)
})

it("updates the result and its flag independently", () => {
  const store = createParcelSimulatorStore()
  const result = { totalTaxes: 42 } as ParcelSimulatorResult

  store.getState().setResult(result)
  expect(store.getState()).toMatchObject({ result, hasResult: false })

  store.getState().setHasResult(true)
  expect(store.getState().hasResult).toBe(true)
})

it("keeps instances isolated", () => {
  const first = createParcelSimulatorStore()
  const second = createParcelSimulatorStore()

  first.getState().setHasResult(true)
  expect(second.getState().hasResult).toBe(false)
})
