import { fireEvent, renderHook } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { useOutsideClick } from "./useOutsideClick"

it("fires only for clicks outside the referenced element", () => {
  const inside = document.createElement("div")
  document.body.append(inside)
  const callback = vi.fn()

  renderHook(() => useOutsideClick({ current: inside }, callback))

  fireEvent.mouseDown(inside)
  expect(callback).not.toHaveBeenCalled()

  fireEvent.mouseDown(document.body)
  expect(callback).toHaveBeenCalledOnce()

  inside.remove()
})
