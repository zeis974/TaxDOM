import { type RefObject, useEffect, useRef } from "react"
import { DOT_SPACING, DotCanvas } from "./Login.styled"

const REST_RADIUS = 0.8
// About 4% of the light is left after this many seconds.
// The rings turn slowly, so a long fade is what turns the glow into an arc.
const FADE_SECONDS = 12
const LAMBDA = -Math.log(0.04) / FADE_SECONDS
const DEPOSIT = 0.7
const SIGMA2 = 2 * 1.5 * 1.5
const REACH = 4
const LEVELS = 24
const MAX_ALPHA = 0.85
// Chips move a fraction of a pixel per frame: 30 fps is visually identical at half the cost.
const FRAME_MS = 1000 / 30
// Below this, a cell is reset to 0 so it leaves the lit set.
const EPSILON = 0.002

// Intensity thresholds per level, so levels are found without an exp per cell.
const THRESHOLDS = Array.from({ length: LEVELS }, (_, k) => -Math.log(1 - k / LEVELS))
// Eased so the faintest levels blend into the resting grid instead of forming an edge.
const EASED = Array.from({ length: LEVELS }, (_, k) => ((k + 1) / LEVELS) ** 1.6)
const RADII = EASED.map((e) => REST_RADIUS + (DOT_SPACING * 0.4 - REST_RADIUS) * e)
const ALPHAS = EASED.map((e) => MAX_ALPHA * e)

const levelOf = (value: number) => {
  let level = 1
  while (level < LEVELS - 1 && value >= THRESHOLDS[level + 1]) level++
  return level
}

// Lit dots over the CSS resting grid: the orbiting product chips leave a fading glow on their path.
export function DotTrail({ orbitRef }: { orbitRef: RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const orbit = orbitRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !orbit || !ctx) return

    const chips = Array.from(orbit.querySelectorAll<HTMLElement>("[data-chip]"))
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")

    let dpr = 1
    let cols = 0
    let rows = 0
    let ox = 0
    let oy = 0
    let grid = new Float32Array(0)
    let levels = new Uint8Array(0)
    let order = new Int32Array(0)
    const counts = new Int32Array(LEVELS + 1)
    const cursor = new Int32Array(LEVELS)
    let color = ""
    let raf = 0
    let last = 0
    let visible = false

    const deposit = (amount: number) => {
      const base = canvas.getBoundingClientRect()
      for (const chip of chips) {
        const rect = chip.getBoundingClientRect()
        const gx = (rect.left + rect.width / 2 - base.left - ox) / DOT_SPACING
        const gy = (rect.top + rect.height / 2 - base.top - oy) / DOT_SPACING
        const ci = Math.round(gx)
        const cj = Math.round(gy)
        for (let j = Math.max(0, cj - REACH); j <= Math.min(rows - 1, cj + REACH); j++) {
          const dy = j - gy
          for (let i = Math.max(0, ci - REACH); i <= Math.min(cols - 1, ci + REACH); i++) {
            const dx = i - gx
            const d2 = dx * dx + dy * dy
            if (d2 <= REACH * REACH) grid[j * cols + i] += amount * Math.exp(-d2 / SIGMA2)
          }
        }
      }
    }

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Counting sort of lit cells by level: one path and one fill per level.
      counts.fill(0)
      const minLit = THRESHOLDS[1]
      for (let i = 0; i < grid.length; i++) {
        const level = grid[i] < minLit ? 0 : levelOf(grid[i])
        levels[i] = level
        if (level) counts[level + 1]++
      }
      for (let l = 1; l <= LEVELS; l++) counts[l] += counts[l - 1]
      cursor.set(counts.subarray(0, LEVELS))
      for (let i = 0; i < grid.length; i++) {
        if (levels[i]) order[cursor[levels[i]]++] = i
      }

      ctx.fillStyle = color
      for (let l = 1; l < LEVELS; l++) {
        if (counts[l] === counts[l + 1]) continue
        const r = RADII[l]
        ctx.globalAlpha = ALPHAS[l]
        ctx.beginPath()
        for (let p = counts[l]; p < counts[l + 1]; p++) {
          const x = ox + (order[p] % cols) * DOT_SPACING
          const y = oy + ((order[p] / cols) | 0) * DOT_SPACING
          ctx.moveTo(x + r, y)
          ctx.arc(x, y, r, 0, Math.PI * 2)
        }
        ctx.fill()
      }
    }

    // Reduced motion: the rings are static, so draw their steady-state glow once.
    const renderStill = () => {
      grid.fill(0)
      deposit(DEPOSIT / LAMBDA)
      render()
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (last && now - last < FRAME_MS - 2) return
      const dt = Math.min(last ? (now - last) / 1000 : FRAME_MS / 1000, 0.05)
      last = now
      const decay = Math.exp(-LAMBDA * dt)
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === 0) continue
        const value = grid[i] * decay
        grid[i] = value < EPSILON ? 0 : value
      }
      deposit(DEPOSIT * dt)
      render()
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const start = () => {
      if (raf || !visible) return
      if (reduceMotion.matches) {
        renderStill()
        return
      }
      last = 0
      raf = requestAnimationFrame(frame)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      // Same lattice as the CSS grid (`background-position: center`): a dot on the center.
      ox = (width / 2) % DOT_SPACING
      oy = (height / 2) % DOT_SPACING
      cols = Math.floor((width - ox) / DOT_SPACING) + 1
      rows = Math.floor((height - oy) / DOT_SPACING) + 1
      grid = new Float32Array(cols * rows)
      levels = new Uint8Array(cols * rows)
      order = new Int32Array(cols * rows)
      if (reduceMotion.matches) renderStill()
      else render()
    }

    const onThemeChange = () => {
      color = getComputedStyle(canvas).color
      render()
    }

    const onMotionChange = () => {
      stop()
      start()
    }

    color = getComputedStyle(canvas).color
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)
    const themeObserver = new MutationObserver(onThemeChange)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })
    colorScheme.addEventListener("change", onThemeChange)
    reduceMotion.addEventListener("change", onMotionChange)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      colorScheme.removeEventListener("change", onThemeChange)
      reduceMotion.removeEventListener("change", onMotionChange)
    }
  }, [orbitRef])

  return <DotCanvas ref={canvasRef} aria-hidden="true" />
}
