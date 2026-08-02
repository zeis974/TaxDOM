"use client"

import createGlobe, { type COBEOptions } from "cobe"
import { useEffect, useRef } from "react"

import { token } from "@/panda/tokens"
import {
  type Coordinates,
  coordsToCobeAngles,
  EUROPE_VIEW,
  getArcViewpoint,
  getCameraCoordinates,
  getCountryCoordinates,
  REUNION_COORDINATES,
  slerpCoordinates,
} from "@/lib/countryCoordinates"

interface CobeGlobeProps {
  origin?: string | null
  cameraTarget?: string | null
  showArcToReunion?: boolean
  dark?: boolean
}

type RGB = [number, number, number]

const TAU = Math.PI * 2
const SCALE_REST = 0.85
const SCALE_FOCUS = 1.1
const ARC_SPEED = 0.03

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

// Shortest-path angular interpolation (handles wrap-around on phi).
function lerpAngle(current: number, target: number, t: number) {
  let diff = (((target - current) % TAU) + TAU) % TAU
  if (diff > Math.PI) diff -= TAU
  return current + diff * t
}

function paletteFor(dark: boolean): { baseColor: RGB; markerColor: RGB; glowColor: RGB } {
  return dark
    ? {
        baseColor: [0.15, 0.15, 0.15],
        markerColor: [0.4, 0.7, 1],
        glowColor: [0.2, 0.2, 0.2],
      }
    : {
        baseColor: [0.9, 0.9, 0.9],
        markerColor: [0.2, 0.5, 1],
        glowColor: [0.7, 0.7, 0.7],
      }
}

// Mirrors COBE's internal U() function exactly.
function latLonToVec([lat, lon]: Coordinates): [number, number, number] {
  const latRad = (lat * Math.PI) / 180
  const lonRad = (lon * Math.PI) / 180 - Math.PI
  const cosLat = Math.cos(latRad)
  return [-cosLat * Math.cos(lonRad), Math.sin(latRad), cosLat * Math.sin(lonRad)]
}

const MARKER_RADIUS = 0.85 // COBE's ee (0.8) + default markerElevation (0.05)

/**
 * Mirrors COBE's internal O() + W() projection exactly.
 * Returns x/y in [0,1] range (use as percentages) and the raw zView depth
 * (-1 = fully behind globe, +1 = fully in front) for smooth fade/morph.
 */
function projectMarker(
  coords: Coordinates,
  phi: number,
  theta: number,
  scale: number,
  cssWidth: number,
  cssHeight: number,
): { x: number; y: number; zView: number } {
  const [vx, vy, vz] = latLonToVec(coords).map((c) => c * MARKER_RADIUS) as [number, number, number]

  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)

  const c = cosPhi * vx + sinPhi * vz
  const s = sinPhi * sinTheta * vx + cosTheta * vy - cosPhi * sinTheta * vz
  const zView = -sinPhi * cosTheta * vx + sinTheta * vy + cosPhi * cosTheta * vz

  const aspect = cssWidth / cssHeight
  return {
    x: (c / aspect) * scale * 0.5 + 0.5,
    y: -s * scale * 0.5 + 0.5,
    zView,
  }
}

// Fade starts at zView = -FADE_DEPTH, reaches full opacity at zView = +FADE_DEPTH.
const FADE_DEPTH = 0.15

export default function CobeGlobe({
  origin,
  cameraTarget,
  showArcToReunion,
  dark = false,
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  // ── Tag overlay refs ──
  const originTagRef = useRef<HTMLDivElement>(null)
  const reunionTagRef = useRef<HTMLDivElement>(null)

  // ── Camera state ──
  const phiRef = useRef(EUROPE_VIEW.phi)
  const thetaRef = useRef(EUROPE_VIEW.theta)
  const targetPhiRef = useRef(EUROPE_VIEW.phi)
  const targetThetaRef = useRef(EUROPE_VIEW.theta)
  const scaleRef = useRef(SCALE_REST)
  const targetScaleRef = useRef(SCALE_REST)

  // ── Live prop refs (synchronisées via useEffect #3) ──
  const originRef = useRef(origin)
  const showArcRef = useRef(showArcToReunion)
  const prevShowArcRef = useRef(showArcToReunion)
  const darkRef = useRef(dark)
  const prevDarkSentRef = useRef<boolean | null>(null)

  useEffect(() => {
    originRef.current = origin
    showArcRef.current = showArcToReunion
    darkRef.current = dark
  }, [origin, showArcToReunion, dark])

  // ── Arc animation ──
  const arcProgressRef = useRef(0)

  // ── Pointer drag state ──
  const activePointerRef = useRef<number | null>(null)
  const lastPointerRef = useRef({ x: 0, y: 0 })

  // ── Cached markers/arcs (markers cached on data change, arc recomputed per frame while animating) ──
  const prevMarkerKeyRef = useRef("")
  const cachedMarkersRef = useRef<COBEOptions["markers"]>([])
  const cachedArcsRef = useRef<COBEOptions["arcs"]>([])

  // ── 1. Initialisation du globe + animation loop ──
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let globe: ReturnType<typeof createGlobe> | null = null
    let disposed = false

    const buildGlobe = () => {
      const width = container.offsetWidth
      const height = container.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const palette = paletteFor(darkRef.current)
      prevDarkSentRef.current = darkRef.current

      return createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: height * dpr,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: darkRef.current ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: palette.baseColor,
        markerColor: palette.markerColor,
        glowColor: palette.glowColor,
        scale: scaleRef.current,
      })
    }

    // ── Unified pointer drag handlers (mouse + touch + pen) ──
    const onPointerDown = (e: PointerEvent) => {
      if (activePointerRef.current !== null) return
      activePointerRef.current = e.pointerId
      lastPointerRef.current = { x: e.clientX, y: e.clientY }
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = "grabbing"
    }

    const onPointerMove = (e: PointerEvent) => {
      if (activePointerRef.current !== e.pointerId) return
      const dx = e.clientX - lastPointerRef.current.x
      const dy = e.clientY - lastPointerRef.current.y
      lastPointerRef.current = { x: e.clientX, y: e.clientY }
      targetPhiRef.current += dx * 0.012
      targetThetaRef.current = Math.max(
        -Math.PI / 2 + 0.1,
        Math.min(Math.PI / 2 - 0.1, targetThetaRef.current + dy * 0.012),
      )
    }

    const onPointerEnd = (e: PointerEvent) => {
      if (activePointerRef.current !== e.pointerId) return
      activePointerRef.current = null
      canvas.style.cursor = "grab"
    }

    canvas.style.cursor = "grab"
    canvas.style.touchAction = "none"
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerEnd)
    canvas.addEventListener("pointercancel", onPointerEnd)

    // ── WebGL context loss recovery ──
    const onContextLost = (e: Event) => {
      e.preventDefault()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    const onContextRestored = () => {
      if (disposed) return
      globe?.destroy()
      globe = buildGlobe()
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate)
    }
    canvas.addEventListener("webglcontextlost", onContextLost)
    canvas.addEventListener("webglcontextrestored", onContextRestored)

    // ── Reduced motion: snap instantly instead of interpolating ──
    const reducedMotionMql =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null
    const getLerpFactor = () => (reducedMotionMql?.matches ? 1 : 0.08)
    const getArcSpeed = () => (reducedMotionMql?.matches ? 1 : ARC_SPEED)

    // ── Animation loop ──
    const animate = () => {
      const lf = getLerpFactor()
      phiRef.current = lerpAngle(phiRef.current, targetPhiRef.current, lf)
      thetaRef.current = lerp(thetaRef.current, targetThetaRef.current, lf)
      scaleRef.current = lerp(scaleRef.current, targetScaleRef.current, lf)

      const currentOrigin = originRef.current
      const currentShowArc = showArcRef.current
      const currentDark = darkRef.current

      // Reset arc progress on toggle ON
      if (currentShowArc && !prevShowArcRef.current) arcProgressRef.current = 0
      prevShowArcRef.current = currentShowArc

      if (currentShowArc && arcProgressRef.current < 1) {
        arcProgressRef.current = Math.min(1, arcProgressRef.current + getArcSpeed())
      }
      if (!currentShowArc) arcProgressRef.current = 0

      const originLocation = currentOrigin ? getCountryCoordinates(currentOrigin) : undefined

      // Markers only depend on origin + showArc — cached
      const markerKey = `${currentOrigin ?? ""}|${currentShowArc ? 1 : 0}`
      if (markerKey !== prevMarkerKeyRef.current) {
        prevMarkerKeyRef.current = markerKey
        const markers: COBEOptions["markers"] = []
        if (originLocation) markers.push({ location: originLocation, size: 0.04 })
        if (currentShowArc) markers.push({ location: REUNION_COORDINATES, size: 0.04 })
        cachedMarkersRef.current = markers
      }

      // Arc recomputed each frame while animating (no quantization → smooth)
      if (currentShowArc && originLocation && arcProgressRef.current > 0) {
        const eased = easeOutCubic(arcProgressRef.current)
        const toCoords =
          arcProgressRef.current >= 1
            ? REUNION_COORDINATES
            : slerpCoordinates(originLocation, REUNION_COORDINATES, eased)
        cachedArcsRef.current = [{ from: originLocation, to: toCoords }]
      } else if ((cachedArcsRef.current?.length ?? 0) > 0) {
        cachedArcsRef.current = []
      }

      // Only push palette/dark when it actually changes
      if (prevDarkSentRef.current !== currentDark) {
        prevDarkSentRef.current = currentDark
        const palette = paletteFor(currentDark)
        globe?.update({
          phi: phiRef.current,
          theta: thetaRef.current,
          scale: scaleRef.current,
          markers: cachedMarkersRef.current,
          arcs: cachedArcsRef.current,
          dark: currentDark ? 1 : 0,
          baseColor: palette.baseColor,
          markerColor: palette.markerColor,
          glowColor: palette.glowColor,
        })
      } else {
        globe?.update({
          phi: phiRef.current,
          theta: thetaRef.current,
          scale: scaleRef.current,
          markers: cachedMarkersRef.current,
          arcs: cachedArcsRef.current,
        })
      }

      // ── Tag overlay positioning (direct DOM — no React re-render) ──
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight

      const applyTag = (
        el: HTMLDivElement | null,
        location: ReturnType<typeof getCountryCoordinates> | undefined,
        label: string,
      ) => {
        if (!el) return
        if (!location) {
          el.style.display = "none"
          return
        }

        const proj = projectMarker(
          location,
          phiRef.current,
          thetaRef.current,
          scaleRef.current,
          cw,
          ch,
        )

        // t ∈ [0,1]: 0 = fully behind globe, 1 = fully in front
        const t = Math.max(0, Math.min(1, (proj.zView + FADE_DEPTH) / (FADE_DEPTH * 2)))

        if (t <= 0) {
          el.style.display = "none"
          return
        }

        el.style.display = "block"
        el.style.opacity = String(t)
        el.style.scale = String(0.7 + 0.3 * t)
        el.style.left = `${proj.x * 100}%`
        el.style.top = `${proj.y * 100}%`

        if (el.dataset.label !== label) {
          el.dataset.label = label
          el.textContent = label
        }
      }

      applyTag(originTagRef.current, originLocation, currentOrigin ?? "")
      applyTag(
        reunionTagRef.current,
        currentShowArc ? REUNION_COORDINATES : undefined,
        "La Réunion",
      )

      rafRef.current = requestAnimationFrame(animate)
    }

    globe = buildGlobe()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      disposed = true
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerEnd)
      canvas.removeEventListener("pointercancel", onPointerEnd)
      canvas.removeEventListener("webglcontextlost", onContextLost)
      canvas.removeEventListener("webglcontextrestored", onContextRestored)
      globe?.destroy()
    }
  }, [])

  // ── 2. Camera target update ──
  // Si l'arc est actif et qu'on a une origine, on cadre l'arc entier
  // via getArcViewpoint pour garder les deux extrémités visibles.
  useEffect(() => {
    let coords: ReturnType<typeof getCameraCoordinates>

    if (showArcToReunion && origin) {
      const originCoords = getCountryCoordinates(origin)
      coords = originCoords ? getArcViewpoint(originCoords, REUNION_COORDINATES) : undefined
    } else {
      const target = cameraTarget ?? origin
      coords = target ? getCameraCoordinates(target) : undefined
    }

    if (coords) {
      const angles = coordsToCobeAngles(coords)
      targetPhiRef.current = angles.phi
      targetThetaRef.current = angles.theta
    } else {
      targetPhiRef.current = EUROPE_VIEW.phi
      targetThetaRef.current = EUROPE_VIEW.theta
    }
    targetScaleRef.current = cameraTarget || origin ? SCALE_FOCUS : SCALE_REST
  }, [origin, cameraTarget, showArcToReunion])

  // transform/display are static or React-managed.
  // opacity, scale, left, top are RAF-managed only — intentionally absent here so React never resets them.
  const tagStyle: React.CSSProperties = {
    position: "absolute",
    transform: "translate(-50%, calc(-100% - 10px))",
    display: "none",
    pointerEvents: "none",
    userSelect: "none",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    padding: "3px 9px",
    borderRadius: "99px",
    backgroundColor: token("colors.elevated"),
    border: `1px solid ${token("colors.border")}`,
    color: token("colors.foreground"),
    backdropFilter: "blur(8px)",
    boxShadow: `0 2px 8px ${token("colors.shadow")}`,
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 350,
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "grab",
        }}
      />
      <div ref={originTagRef} style={tagStyle} />
      <div ref={reunionTagRef} style={tagStyle}>
        La Réunion
      </div>
    </div>
  )
}
