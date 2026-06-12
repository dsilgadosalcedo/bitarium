import { SIGN_IN_CELL_SIZE, type GridCell } from "./grid-layout"

export type PixelTextConfig = {
  text: string
  patterns: Record<string, readonly string[]>
  letterWidth: number
  letterGap: number
  originCol: number
  originRow: number
}

export const DRAW_LOGO_PATTERNS: Record<string, readonly string[]> = {
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  W: ["10001", "10001", "10001", "10001", "10101", "10101", "01010"]
}

export const FOOTER_MARK_PATTERNS: Record<string, readonly string[]> = {
  "7": ["11", "01", "01", "01"],
  L: ["10", "10", "10", "11"]
}

export function buildPixelTextCells({
  text,
  patterns,
  letterWidth,
  letterGap,
  originCol,
  originRow
}: PixelTextConfig): GridCell[] {
  const cells: GridCell[] = []
  let colOffset = originCol

  for (const letter of text) {
    const pattern = patterns[letter]
    if (!pattern) continue

    for (let row = 0; row < pattern.length; row++) {
      const rowPattern = pattern[row] ?? ""
      for (let col = 0; col < rowPattern.length; col++) {
        if (rowPattern[col] === "1") {
          cells.push({ col: colOffset + col, row: originRow + row })
        }
      }
    }

    colOffset += letterWidth + letterGap
  }

  return cells
}

export function getDrawLogoCells(): GridCell[] {
  return buildPixelTextCells({
    text: "DRAW",
    patterns: DRAW_LOGO_PATTERNS,
    letterWidth: 5,
    letterGap: 1,
    originCol: 2,
    originRow: 2
  })
}

export const FOOTER_MARK_TEXT = "7L"
export const FOOTER_MARK_URL = "https://7lineas.com"
export const FOOTER_MARK_MARGIN_CELLS = 2
export const FOOTER_MARK_LETTER_WIDTH = 2
export const FOOTER_MARK_LETTER_HEIGHT = 4
export const FOOTER_MARK_LETTER_GAP = 1
export const FOOTER_MARK_RING_SEPARATION_CELLS = 1
export const FOOTER_INNER_FILL_COLOR_START = "#038FFF"
export const FOOTER_INNER_FILL_COLOR_END = "#67D2DF"
export const FOOTER_INNER_FILL_OPACITY_IDLE = 0.5
export const FOOTER_INNER_FILL_OPACITY_HOVER = 0.92
export const FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE = 0.015
export const FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER = 0.22
export const FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE_REDUCED = 0.006
export const FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER_REDUCED = 0.04

export function getFooterInnerFillFlickerChance(
  hovered: boolean,
  prefersReducedMotion: boolean
) {
  if (prefersReducedMotion) {
    return hovered
      ? FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER_REDUCED
      : FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE_REDUCED
  }

  return hovered
    ? FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER
    : FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE
}

export function getFooterMarkTextWidth() {
  return (
    FOOTER_MARK_TEXT.length * FOOTER_MARK_LETTER_WIDTH +
    (FOOTER_MARK_TEXT.length - 1) * FOOTER_MARK_LETTER_GAP
  )
}

function getFooterMarkExtentsFromOrigin(textWidth: number, textHeight: number) {
  const hole = getFooterMarkHoleBounds(0, 0, textWidth, textHeight)

  return {
    left: -hole.minCol,
    right: hole.maxCol,
    top: -hole.minRow,
    bottom: hole.maxRow
  }
}

export function getFooterMarkOrigin(gridCols: number, gridRows: number) {
  const textWidth = getFooterMarkTextWidth()
  const textHeight = FOOTER_MARK_LETTER_HEIGHT
  const margin = FOOTER_MARK_MARGIN_CELLS
  const extents = getFooterMarkExtentsFromOrigin(textWidth, textHeight)

  return {
    originCol: gridCols - margin - 1 - extents.right,
    originRow: gridRows - margin - 1 - extents.bottom,
    textWidth,
    textHeight
  }
}

export function getFooterMarkCells(
  gridCols: number,
  gridRows: number
): GridCell[] {
  const { originCol, originRow } = getFooterMarkOrigin(gridCols, gridRows)

  return buildPixelTextCells({
    text: FOOTER_MARK_TEXT,
    patterns: FOOTER_MARK_PATTERNS,
    letterWidth: FOOTER_MARK_LETTER_WIDTH,
    letterGap: FOOTER_MARK_LETTER_GAP,
    originCol,
    originRow
  })
}

export function getFooterMarkSquareBounds(
  originCol: number,
  originRow: number,
  textWidth: number,
  textHeight: number
) {
  const hole = getFooterMarkHoleBounds(
    originCol,
    originRow,
    textWidth,
    textHeight
  )

  return {
    minCol: hole.minCol,
    maxCol: hole.maxCol,
    minRow: hole.minRow,
    maxRow: hole.maxRow,
    side: hole.side
  }
}

function getFooterMarkHoleBounds(
  originCol: number,
  originRow: number,
  textWidth: number,
  textHeight: number
) {
  const gap = FOOTER_MARK_RING_SEPARATION_CELLS
  const textMinCol = originCol
  const textMaxCol = originCol + textWidth - 1
  const textMinRow = originRow
  const textMaxRow = originRow + textHeight - 1
  const holeWidth = textWidth + 2 * gap
  const holeHeight = textHeight + 2 * gap

  return {
    minCol: textMinCol - gap,
    maxCol: textMaxCol + gap,
    minRow: textMinRow - gap,
    maxRow: textMaxRow + gap,
    side: Math.max(holeWidth, holeHeight)
  }
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "")
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`
}

export function randomFooterInnerFillColor() {
  const start = hexToRgb(FOOTER_INNER_FILL_COLOR_START)
  const end = hexToRgb(FOOTER_INNER_FILL_COLOR_END)
  const t = Math.random()

  return rgbToHex(
    Math.round(start.r + (end.r - start.r) * t),
    Math.round(start.g + (end.g - start.g) * t),
    Math.round(start.b + (end.b - start.b) * t)
  )
}

export function getFooterMarkInnerFillCells(
  gridCols: number,
  gridRows: number
): GridCell[] {
  const { originCol, originRow, textWidth, textHeight } = getFooterMarkOrigin(
    gridCols,
    gridRows
  )
  const hole = getFooterMarkHoleBounds(
    originCol,
    originRow,
    textWidth,
    textHeight
  )
  const textKeys = new Set(
    getFooterMarkCells(gridCols, gridRows).map(
      ({ col, row }) => `${col},${row}`
    )
  )
  const cells: GridCell[] = []

  for (let col = hole.minCol; col <= hole.maxCol; col++) {
    for (let row = hole.minRow; row <= hole.maxRow; row++) {
      if (!textKeys.has(`${col},${row}`)) {
        cells.push({ col, row })
      }
    }
  }

  return cells
}

export function getFooterMarkReservedCells(
  gridCols: number,
  gridRows: number
): GridCell[] {
  const { originCol, originRow, textWidth, textHeight } = getFooterMarkOrigin(
    gridCols,
    gridRows
  )
  const hole = getFooterMarkHoleBounds(
    originCol,
    originRow,
    textWidth,
    textHeight
  )
  const cells: GridCell[] = []

  for (let col = hole.minCol; col <= hole.maxCol; col++) {
    for (let row = hole.minRow; row <= hole.maxRow; row++) {
      cells.push({ col, row })
    }
  }

  return cells
}

export function getFooterMarkLinkLayout(
  viewportWidth: number,
  viewportHeight: number
) {
  const gridCols = Math.ceil(viewportWidth / SIGN_IN_CELL_SIZE)
  const gridRows = Math.ceil(viewportHeight / SIGN_IN_CELL_SIZE)
  const cells = getFooterMarkReservedCells(gridCols, gridRows)
  const minCol = Math.min(...cells.map((cell) => cell.col))
  const maxCol = Math.max(...cells.map((cell) => cell.col))
  const minRow = Math.min(...cells.map((cell) => cell.row))
  const maxRow = Math.max(...cells.map((cell) => cell.row))

  return {
    left: minCol * SIGN_IN_CELL_SIZE,
    top: minRow * SIGN_IN_CELL_SIZE,
    width: (maxCol - minCol + 1) * SIGN_IN_CELL_SIZE,
    height: (maxRow - minRow + 1) * SIGN_IN_CELL_SIZE
  }
}
