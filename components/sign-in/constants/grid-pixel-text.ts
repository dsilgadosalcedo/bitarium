import { SIGN_IN_CELL_SIZE, type GridCell } from "./grid-layout"

export type PixelTextConfig = {
  text: string
  patterns: Record<string, readonly string[]>
  letterWidth: number
  letterGap: number
  originCol: number
  originRow: number
}

export const BITARIUM_LOGO_PATTERNS: Record<string, readonly string[]> = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  i: ["1", "0", "1", "1", "1", "1", "1"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"]
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

const BITARIUM_LOGO_LETTER_WIDTH = 5
export const BITARIUM_LOGO_LETTER_GAP = 1
const BITARIUM_LOGO_NARROW_LETTER_WIDTH = 1
const BITARIUM_LOGO_ORIGIN_COL = 2
const BITARIUM_LOGO_ORIGIN_ROW = 2
const BITARIUM_LOGO_PREFIX = "BiT"
const BITARIUM_LOGO_SUFFIX = "ARIUM"

function getBitariumLogoLetterWidth(letter: string) {
  if (letter === "i") {
    return BITARIUM_LOGO_NARROW_LETTER_WIDTH
  }

  return BITARIUM_LOGO_LETTER_WIDTH
}

function getBitariumLogoTextAdvance(text: string) {
  let advance = 0

  for (let index = 0; index < text.length; index++) {
    const letter = text[index]
    if (!letter) continue

    advance += getBitariumLogoLetterWidth(letter)

    if (index < text.length - 1) {
      advance += BITARIUM_LOGO_LETTER_GAP
    }
  }

  return advance
}

export const BITARIUM_LOGO_BIT_OPACITY = 0.92
export const BITARIUM_LOGO_ARIUM_MIN_OPACITY = 0.05
export const BITARIUM_LOGO_ARIUM_MAX_OPACITY = 0.4

export type LogoOpacityCell = GridCell & {
  opacity: number
}

export function getBitariumLogoAriumOpacity(
  col: number,
  firstCol: number,
  lastCol: number
): number {
  if (lastCol <= firstCol) {
    return BITARIUM_LOGO_ARIUM_MAX_OPACITY
  }

  const progress = (lastCol - col) / (lastCol - firstCol)
  const opacity =
    BITARIUM_LOGO_ARIUM_MIN_OPACITY +
    progress *
      (BITARIUM_LOGO_ARIUM_MAX_OPACITY - BITARIUM_LOGO_ARIUM_MIN_OPACITY)

  return Math.round(opacity * 1000) / 1000
}

function buildBitariumLogoCells(text: string, originCol: number): GridCell[] {
  const cells: GridCell[] = []
  let colOffset = originCol

  for (const letter of text) {
    const pattern = BITARIUM_LOGO_PATTERNS[letter]
    if (!pattern) continue

    const letterWidth = getBitariumLogoLetterWidth(letter)

    for (let row = 0; row < pattern.length; row++) {
      const rowPattern = pattern[row] ?? ""
      for (let col = 0; col < rowPattern.length; col++) {
        if (rowPattern[col] === "1") {
          cells.push({
            col: colOffset + col,
            row: BITARIUM_LOGO_ORIGIN_ROW + row
          })
        }
      }
    }

    colOffset += letterWidth + BITARIUM_LOGO_LETTER_GAP
  }

  return cells
}

export function getBitariumLogoBitCells(): GridCell[] {
  return buildBitariumLogoCells(BITARIUM_LOGO_PREFIX, BITARIUM_LOGO_ORIGIN_COL)
}

export function getBitariumLogoAriumCells(): LogoOpacityCell[] {
  const ariumOriginCol =
    BITARIUM_LOGO_ORIGIN_COL +
    getBitariumLogoTextAdvance(BITARIUM_LOGO_PREFIX) +
    BITARIUM_LOGO_LETTER_GAP

  const baseCells = buildBitariumLogoCells(BITARIUM_LOGO_SUFFIX, ariumOriginCol)

  if (baseCells.length === 0) {
    return []
  }

  const cols = baseCells.map((cell) => cell.col)
  const firstCol = Math.min(...cols)
  const lastCol = Math.max(...cols)

  return baseCells.map(({ col, row }) => ({
    col,
    row,
    opacity: getBitariumLogoAriumOpacity(col, firstCol, lastCol)
  }))
}

export function getBitariumLogoCells(): GridCell[] {
  return [...getBitariumLogoBitCells(), ...getBitariumLogoAriumCells()]
}

export const BITARIUM_LOGO_URL = "/"

export function getBitariumLogoLinkLayout() {
  const cells = getBitariumLogoCells()
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

export const HEART_MARK_MARGIN_CELLS = 2
export const HEART_MARK_WIDTH = 5
export const HEART_MARK_HEIGHT = 5
export const HEART_MARK_OPACITY = 0.5

const HEART_MARK_PATTERN = [
  "01010",
  "11111",
  "11111",
  "01110",
  "00100"
] as const

export function getHeartMarkOrigin(gridCols: number, gridRows: number) {
  const margin = HEART_MARK_MARGIN_CELLS

  return {
    originCol: margin,
    originRow: gridRows - margin - HEART_MARK_HEIGHT
  }
}

export function getHeartMarkCells(
  gridCols: number,
  gridRows: number
): GridCell[] {
  const { originCol, originRow } = getHeartMarkOrigin(gridCols, gridRows)
  const cells: GridCell[] = []

  for (let row = 0; row < HEART_MARK_PATTERN.length; row++) {
    const rowPattern = HEART_MARK_PATTERN[row] ?? ""
    for (let col = 0; col < rowPattern.length; col++) {
      if (rowPattern[col] === "1") {
        cells.push({ col: originCol + col, row: originRow + row })
      }
    }
  }

  return cells
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
