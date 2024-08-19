declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tool-tip": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export default function Tooltip({ content, anchor }: { content: string; anchor: string }) {
  return (
    <tool-tip
      style={{ width: "100%", position: "absolute" }}
      data-content={content}
      data-anchor={anchor}
    />
  )
}

class TooltipCustomElement extends HTMLElement {
  private tooltipContainer: HTMLDivElement
  private tooltipText: HTMLSpanElement
  private isVisible = false

  constructor() {
    super()
    this.attachShadow({ mode: "open" })

    const tooltipContainer = document.createElement("div")
    tooltipContainer.style.position = "fixed"
    tooltipContainer.style.backgroundColor = "#000"
    tooltipContainer.style.color = "white"
    tooltipContainer.style.padding = "5px 10px"
    tooltipContainer.style.borderRadius = "4px"
    tooltipContainer.style.opacity = "0"
    tooltipContainer.style.transition = "opacity 250ms ease-in-out"
    tooltipContainer.style.pointerEvents = "none"
    tooltipContainer.style.zIndex = "9999"

    this.tooltipText = document.createElement("span")
    tooltipContainer.appendChild(this.tooltipText)
    this.shadowRoot?.appendChild(tooltipContainer)

    this.tooltipContainer = tooltipContainer
  }

  connectedCallback() {
    this.tooltipText.textContent = this.getAttribute("data-content") || "Tooltip"

    const targetId = this.getAttribute("data-anchor")
    // biome-ignore lint/style/noNonNullAssertion:
    const targetElement = document.getElementById(targetId!)

    if (targetElement) {
      targetElement.addEventListener("mouseover", this.showTooltip.bind(this))
      targetElement.addEventListener("mouseout", this.hideTooltip.bind(this))
    }
  }

  showTooltip() {
    if (this.isVisible) return
    this.isVisible = true

    const targetId = this.getAttribute("data-anchor")
    // biome-ignore lint/style/noNonNullAssertion:
    const targetElement = document.getElementById(targetId!)

    if (targetElement) {
      requestAnimationFrame(() => {
        const rect = targetElement.getBoundingClientRect()
        const tooltipRect = this.tooltipContainer.getBoundingClientRect()

        const topPosition = rect.top - tooltipRect.height - 10
        const leftPosition = rect.left + (rect.width - tooltipRect.width) / 2

        this.tooltipContainer.style.top = `${topPosition}px`
        this.tooltipContainer.style.left = `${leftPosition}px`
        this.tooltipContainer.style.opacity = "1"
      })
    }
  }

  hideTooltip() {
    if (!this.isVisible) return
    this.isVisible = false

    this.tooltipContainer.style.opacity = "0"
  }
}

customElements.define("tool-tip", TooltipCustomElement)
