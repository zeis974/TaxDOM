import { fireEvent, renderHook } from "@testing-library/react"
import { afterEach, expect, it, vi } from "vitest"
import { useOutsideClick } from "./useOutsideClick"

const targets: HTMLElement[] = []

/** Creates and tracks a target element so a failing assertion can't leak it into later tests. */
const mountTarget = () => {
  const target = document.createElement("div")
  document.body.append(target)
  targets.push(target)
  return target
}

afterEach(() => {
  for (const target of targets.splice(0)) {
    target.remove()
  }
})

it("fires only for clicks outside the referenced element", () => {
  const inside = mountTarget()
  const callback = vi.fn()

  renderHook(() => useOutsideClick({ current: inside }, callback))

  fireEvent.mouseDown(inside)
  expect(callback).not.toHaveBeenCalled()

  fireEvent.mouseDown(document.body)
  expect(callback).toHaveBeenCalledOnce()
})

it("stops listening once the hook is unmounted", () => {
  const target = mountTarget()
  const callback = vi.fn()

  const { unmount } = renderHook(() => useOutsideClick({ current: target }, callback))
  unmount()

  fireEvent.mouseDown(document.body)
  expect(callback).not.toHaveBeenCalled()
})
