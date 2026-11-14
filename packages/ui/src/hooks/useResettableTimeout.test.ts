import { renderHook } from "@testing-library/react"
import { afterEach, beforeEach, expect, it, vi } from "vitest"
import { useResettableTimeout } from "./useResettableTimeout"

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it("replaces the pending timeout when started again", () => {
  const first = vi.fn()
  const second = vi.fn()
  const { result } = renderHook(() => useResettableTimeout())

  result.current.start(first, 1000)
  result.current.start(second, 1000)
  vi.advanceTimersByTime(1000)

  expect(first).not.toHaveBeenCalled()
  expect(second).toHaveBeenCalledOnce()
})

it("cancels the pending timeout on unmount", () => {
  const callback = vi.fn()
  const { result, unmount } = renderHook(() => useResettableTimeout())

  result.current.start(callback, 1000)
  unmount()
  vi.advanceTimersByTime(1000)

  expect(callback).not.toHaveBeenCalled()
})
