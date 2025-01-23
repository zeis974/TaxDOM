declare module "react" {
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
  private targetElement: HTMLElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: "open" })

    const tooltipContainer = document.createElement("div")

    Object.assign(tooltipContainer.style, {
      position: "fixed",
      backgroundColor: "#2d3436",
      color: "white",
      padding: "5px 10px",
      borderRadius: "4px",
      opacity: "0",
      transition: "opacity 250ms ease-in-out",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: "9999",
    })

    const style = document.createElement("style")
    style.textContent = `
      div::before {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #2d3436;
      }
    `
    this.shadowRoot?.appendChild(style)

    this.tooltipText = document.createElement("span")
    tooltipContainer.appendChild(this.tooltipText)
    this.shadowRoot?.appendChild(tooltipContainer)

    this.tooltipContainer = tooltipContainer
  }

  connectedCallback() {
    this.tooltipText.textContent = this.getAttribute("data-content")
    const targetId = this.getAttribute("data-anchor")
    // biome-ignore lint/style/noNonNullAssertion:
    this.targetElement = document.getElementById(targetId!)

    if (this.targetElement) {
      this.targetElement.addEventListener("mouseover", this.showTooltip.bind(this))
      this.targetElement.addEventListener("mouseleave", this.hideTooltip.bind(this))
    }

    this.tooltipContainer.addEventListener("mouseenter", () => {
      this.isVisible = true
    })

    this.tooltipContainer.addEventListener("mouseleave", () => {
      this.hideTooltip()
    })
  }

  disconnectedCallback() {
    if (this.targetElement) {
      this.targetElement.removeEventListener("mouseover", this.showTooltip.bind(this))
      this.targetElement.removeEventListener("mouseleave", this.hideTooltip.bind(this))
    }
  }

  showTooltip() {
    if (this.isVisible) return
    this.isVisible = true

    if (this.targetElement) {
      requestAnimationFrame(() => {
        // biome-ignore lint/style/noNonNullAssertion:
        const rect = this.targetElement!.getBoundingClientRect()
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
