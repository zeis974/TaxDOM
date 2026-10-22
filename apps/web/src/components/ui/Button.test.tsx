import { fireEvent, render, screen } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import Button from "./Button"

it("renders a non-submitting button by default", () => {
  render(<Button>Calculer</Button>)
  expect(screen.getByRole("button", { name: "Calculer" })).toHaveProperty("type", "button")
})

it("forwards the type and event handlers", () => {
  const onClick = vi.fn()
  render(
    <Button type="submit" onClick={onClick}>
      Envoyer
    </Button>,
  )

  const button = screen.getByRole("button", { name: "Envoyer" })
  fireEvent.click(button)

  expect(button).toHaveProperty("type", "submit")
  expect(onClick).toHaveBeenCalledOnce()
})

it("forwards extra html attributes through the spread", () => {
  render(
    <Button aria-label="Enregistrer le colis" aria-disabled="true" className="custom">
      OK
    </Button>,
  )

  const button = screen.getByRole("button", { name: "Enregistrer le colis" })
  expect(button.getAttribute("aria-disabled")).toBe("true")
  expect(button.className).toContain("custom")
})
