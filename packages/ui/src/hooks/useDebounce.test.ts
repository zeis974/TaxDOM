import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, expect, it, vi } from "vitest"
import { useDebounce } from "./useDebounce"

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it("returns the initial value immediately", () => {
  const { result } = renderHook(() => useDebounce("a", 300))
  expect(result.current).toBe("a")
})

it("only publishes the last value once the delay has elapsed", () => {
  const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
    initialProps: { value: "a" },
  })

  rerender({ value: "ab" })
  act(() => vi.advanceTimersByTime(200))
  rerender({ value: "abc" })
  act(() => vi.advanceTimersByTime(200))
  expect(result.current).toBe("a")

  act(() => vi.advanceTimersByTime(100))
  expect(result.current).toBe("abc")
})
