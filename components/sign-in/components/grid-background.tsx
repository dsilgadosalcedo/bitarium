"use client"

import { useEffect, useRef } from "react"
import {
  SIGN_IN_CELL_SIZE,
  getBackgroundPickerCells,
  getCellIndex,
  getLoginErrorZoneCells,
  getPanelBorderCells,
  getPanelCells,
  type SignInPanelLayout
} from "../constants/grid-layout"
import {
  getDrawLogoCells,
  getFooterMarkCells,
  FOOTER_INNER_FILL_OPACITY_HOVER,
  FOOTER_INNER_FILL_OPACITY_IDLE,
  getFooterInnerFillFlickerChance,
  getFooterMarkInnerFillCells,
  getFooterMarkReservedCells,
  randomFooterInnerFillColor
} from "../constants/grid-pixel-text"

const CELL_SIZE = SIGN_IN_CELL_SIZE

const GRID_COLOR_VARS = [
  "--draw-red-foreground",
  "--draw-orange-foreground",
  "--draw-yellow-foreground",
  "--draw-green-foreground",
  "--draw-blue-foreground",
  "--draw-purple-foreground",
  "--draw-pink-foreground",
  "--draw-brown-foreground"
] as const

type CanvasTheme = {
  background: string
  gridLine: string
  panelBorder: string
  colors: string[]
}

type ColoredCell = {
  color: string
  opacity: number
}

const DEFAULT_CANVAS_THEME: CanvasTheme = {
  background: "#e4e2de",
  gridLine: "rgba(55, 53, 48, 0.18)",
  panelBorder: "rgba(55, 53, 48, 0.28)",
  colors: [
    "#c4554d",
    "#cc782f",
    "#c29343",
    "#548164",
    "#487ca5",
    "#8a67ab",
    "#b35488",
    "#976d57"
  ]
}

const DEFAULT_LOGO_COLOR = "#373530"

function readCanvasTheme(): CanvasTheme {
  if (typeof window === "undefined") {
    return DEFAULT_CANVAS_THEME
  }

  const styles = getComputedStyle(document.body)

  const colors = GRID_COLOR_VARS.map((variable) =>
    styles.getPropertyValue(variable).trim()
  ).filter((color) => color.length > 0)

  return {
    background:
      styles.getPropertyValue("--sign-in-canvas-bg").trim() || "#e4e2de",
    gridLine:
      styles.getPropertyValue("--sign-in-grid-line").trim() ||
      "rgba(55, 53, 48, 0.18)",
    panelBorder:
      styles.getPropertyValue("--sign-in-panel-border").trim() ||
      "rgba(55, 53, 48, 0.28)",
    colors: colors.length > 0 ? colors : ["#c4554d"]
  }
}

function getGridDimensions(width: number, height: number) {
  return {
    cols: Math.ceil(width / CELL_SIZE),
    rows: Math.ceil(height / CELL_SIZE)
  }
}

function getMarkCellIndices(cols: number, rows: number) {
  const indices = new Set<number>()

  for (const { col, row } of getDrawLogoCells()) {
    indices.add(getCellIndex(col, row, cols))
  }

  for (const { col, row } of getFooterMarkReservedCells(cols, rows)) {
    indices.add(getCellIndex(col, row, cols))
  }

  return indices
}

function getReservedCellIndices(
  cols: number,
  rows: number,
  panelLayout: SignInPanelLayout
) {
  const indices = new Set<number>(getMarkCellIndices(cols, rows))

  for (const { col, row } of getPanelCells(panelLayout)) {
    indices.add(getCellIndex(col, row, cols))
  }

  for (const { col, row } of getLoginErrorZoneCells(panelLayout)) {
    indices.add(getCellIndex(col, row, cols))
  }

  for (const { col, row } of getBackgroundPickerCells(cols)) {
    indices.add(getCellIndex(col, row, cols))
  }

  return indices
}

function readLogoColor() {
  if (typeof window === "undefined") {
    return DEFAULT_LOGO_COLOR
  }

  return (
    getComputedStyle(document.body)
      .getPropertyValue("--sign-in-card-text")
      .trim() || DEFAULT_LOGO_COLOR
  )
}

function fillCell(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  color: string,
  alpha = 1
) {
  const x = col * CELL_SIZE
  const y = row * CELL_SIZE
  ctx.fillStyle = color
  ctx.globalAlpha = alpha
  ctx.fillRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1)
  ctx.globalAlpha = 1
}

interface GridBackgroundProps {
  panelLayout: SignInPanelLayout
  canvasBackground?: string
  footerMarkHovered?: boolean
}

export function GridBackground({
  panelLayout,
  canvasBackground,
  footerMarkHovered = false
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellsRef = useRef<Map<number, ColoredCell>>(new Map())
  const dimensionsRef = useRef({ cols: 0, rows: 0 })
  const themeRef = useRef<CanvasTheme>(DEFAULT_CANVAS_THEME)
  const logoColorRef = useRef(DEFAULT_LOGO_COLOR)
  const panelLayoutRef = useRef(panelLayout)
  const canvasBackgroundRef = useRef(canvasBackground)
  const footerMarkHoveredRef = useRef(footerMarkHovered)
  const footerInnerIndicesRef = useRef<number[]>([])
  const footerInnerColorsRef = useRef<Map<number, string>>(new Map())
  const frameRef = useRef<number>(0)

  useEffect(() => {
    panelLayoutRef.current = panelLayout
    canvasBackgroundRef.current = canvasBackground
    footerMarkHoveredRef.current = footerMarkHovered
  }, [panelLayout, canvasBackground, footerMarkHovered])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    themeRef.current = readCanvasTheme()
    logoColorRef.current = readLogoColor()

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const syncTheme = () => {
      const nextTheme = readCanvasTheme()
      const themeChanged =
        nextTheme.background !== themeRef.current.background ||
        nextTheme.gridLine !== themeRef.current.gridLine ||
        nextTheme.panelBorder !== themeRef.current.panelBorder

      themeRef.current = nextTheme
      logoColorRef.current = readLogoColor()

      if (themeChanged) {
        cellsRef.current.clear()
      }
    }

    const syncFooterInnerFill = () => {
      const { cols, rows } = dimensionsRef.current
      if (cols === 0 || rows === 0) return

      const indices = getFooterMarkInnerFillCells(cols, rows).map(
        ({ col, row }) => getCellIndex(col, row, cols)
      )
      footerInnerIndicesRef.current = indices

      const colors = new Map<number, string>()
      for (const index of indices) {
        colors.set(index, randomFooterInnerFillColor())
      }
      footerInnerColorsRef.current = colors
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensionsRef.current = getGridDimensions(clientWidth, clientHeight)
      cellsRef.current.clear()
      syncFooterInnerFill()
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(canvas)
    window.addEventListener("resize", resize)

    const themeObserver = new MutationObserver(syncTheme)
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"]
    })

    const colorRandomCells = () => {
      const { cols } = dimensionsRef.current
      const total = cols * dimensionsRef.current.rows
      if (total === 0) return

      const count = prefersReducedMotion ? 1 : 2 + Math.floor(Math.random() * 4)
      const { colors } = themeRef.current
      const reservedCells = getReservedCellIndices(
        cols,
        dimensionsRef.current.rows,
        panelLayoutRef.current
      )

      for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * total)
        let attempts = 0

        while (reservedCells.has(index) && attempts < 8) {
          index = Math.floor(Math.random() * total)
          attempts++
        }

        if (reservedCells.has(index)) continue

        const color =
          colors[Math.floor(Math.random() * colors.length)] ?? colors[0]
        cellsRef.current.set(index, { color, opacity: 1 })
      }

      const maxActive = prefersReducedMotion ? 12 : 80
      if (cellsRef.current.size > maxActive) {
        const keys = Array.from(cellsRef.current.keys())
        const toRemove = keys.slice(0, cellsRef.current.size - maxActive)
        for (const key of toRemove) {
          cellsRef.current.delete(key)
        }
      }
    }

    const draw = () => {
      const { clientWidth, clientHeight } = canvas
      const { cols, rows } = dimensionsRef.current
      const theme = themeRef.current
      const layout = panelLayoutRef.current
      const background = canvasBackgroundRef.current ?? theme.background

      ctx.fillStyle = background
      ctx.fillRect(0, 0, clientWidth, clientHeight)

      ctx.strokeStyle = theme.gridLine
      ctx.lineWidth = 0.5
      ctx.beginPath()
      for (let x = 0; x <= cols; x++) {
        const px = x * CELL_SIZE
        ctx.moveTo(px, 0)
        ctx.lineTo(px, rows * CELL_SIZE)
      }
      for (let y = 0; y <= rows; y++) {
        const py = y * CELL_SIZE
        ctx.moveTo(0, py)
        ctx.lineTo(cols * CELL_SIZE, py)
      }
      ctx.stroke()

      for (const { col, row, opacity } of getPanelBorderCells(layout)) {
        fillCell(ctx, col, row, theme.panelBorder, opacity)
      }

      for (const { col, row } of getDrawLogoCells()) {
        fillCell(ctx, col, row, logoColorRef.current, 0.92)
      }

      const footerInnerColors = footerInnerColorsRef.current
      const footerInnerFlickerChance = getFooterInnerFillFlickerChance(
        footerMarkHoveredRef.current,
        prefersReducedMotion
      )

      for (const index of footerInnerIndicesRef.current) {
        if (Math.random() < footerInnerFlickerChance) {
          footerInnerColors.set(index, randomFooterInnerFillColor())
        }

        const col = index % cols
        const row = Math.floor(index / cols)
        fillCell(
          ctx,
          col,
          row,
          footerInnerColors.get(index) ?? randomFooterInnerFillColor(),
          footerMarkHoveredRef.current
            ? FOOTER_INNER_FILL_OPACITY_HOVER
            : FOOTER_INNER_FILL_OPACITY_IDLE
        )
      }

      for (const { col, row } of getFooterMarkCells(cols, rows)) {
        fillCell(ctx, col, row, background, 1)
      }

      const fadeRate = prefersReducedMotion ? 0.008 : 0.012
      for (const [index, cell] of cellsRef.current) {
        const col = index % cols
        const row = Math.floor(index / cols)
        const x = col * CELL_SIZE
        const y = row * CELL_SIZE

        ctx.fillStyle = cell.color
        ctx.globalAlpha = cell.opacity
        ctx.fillRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1)

        cell.opacity -= fadeRate
        if (cell.opacity <= 0) {
          cellsRef.current.delete(index)
        }
      }
      ctx.globalAlpha = 1

      frameRef.current = requestAnimationFrame(draw)
    }

    colorRandomCells()
    const colorInterval = window.setInterval(
      colorRandomCells,
      prefersReducedMotion ? 1200 : 120
    )

    if (!prefersReducedMotion) {
      for (let i = 0; i < 24; i++) {
        colorRandomCells()
      }
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.clearInterval(colorInterval)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
