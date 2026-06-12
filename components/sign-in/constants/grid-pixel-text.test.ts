import { describe, expect, it } from "vitest"
import {
  FOOTER_MARK_LETTER_HEIGHT,
  FOOTER_MARK_MARGIN_CELLS,
  FOOTER_MARK_TEXT,
  getDrawLogoCells,
  FOOTER_INNER_FILL_COLOR_END,
  FOOTER_INNER_FILL_COLOR_START,
  FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER,
  FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE,
  getFooterInnerFillFlickerChance,
  getFooterMarkCells,
  getFooterMarkInnerFillCells,
  getFooterMarkLinkLayout,
  getFooterMarkReservedCells,
  randomFooterInnerFillColor
} from "./grid-pixel-text"
import { SIGN_IN_CELL_SIZE } from "./grid-layout"

describe("grid pixel text", () => {
  it("renders DRAW taller than the footer mark", () => {
    const drawRows = new Set(getDrawLogoCells().map((cell) => cell.row))
    const footerRows = new Set(
      getFooterMarkCells(72, 40).map((cell) => cell.row)
    )

    expect(Math.max(...drawRows) - Math.min(...drawRows) + 1).toBe(7)
    expect(Math.max(...footerRows) - Math.min(...footerRows) + 1).toBe(
      FOOTER_MARK_LETTER_HEIGHT
    )
  })

  it("keeps the footer mark inside the grid with margin", () => {
    const gridCols = Math.ceil(1280 / SIGN_IN_CELL_SIZE)
    const gridRows = Math.ceil(720 / SIGN_IN_CELL_SIZE)
    const margin = FOOTER_MARK_MARGIN_CELLS
    const reservedCells = getFooterMarkReservedCells(gridCols, gridRows)

    expect(FOOTER_MARK_TEXT).toBe("7L")
    expect(reservedCells.length).toBeGreaterThan(0)

    for (const { col, row } of reservedCells) {
      expect(col).toBeGreaterThanOrEqual(0)
      expect(col).toBeLessThan(gridCols)
      expect(row).toBeGreaterThanOrEqual(0)
      expect(row).toBeLessThan(gridRows)
    }

    expect(Math.max(...reservedCells.map((cell) => cell.col))).toBe(
      gridCols - 1 - margin
    )
    expect(Math.max(...reservedCells.map((cell) => cell.row))).toBe(
      gridRows - 1 - margin
    )
  })

  it("fills the inner square around 7L without covering the text", () => {
    const gridCols = Math.ceil(1280 / SIGN_IN_CELL_SIZE)
    const gridRows = Math.ceil(720 / SIGN_IN_CELL_SIZE)
    const textKeys = new Set(
      getFooterMarkCells(gridCols, gridRows).map(
        ({ col, row }) => `${col},${row}`
      )
    )
    const fillCells = getFooterMarkInnerFillCells(gridCols, gridRows)

    expect(fillCells.length).toBeGreaterThan(0)

    for (const { col, row } of fillCells) {
      expect(textKeys.has(`${col},${row}`)).toBe(false)
    }
  })

  it("sizes the footer mark link to the reserved hit area", () => {
    const gridCols = Math.ceil(1280 / SIGN_IN_CELL_SIZE)
    const gridRows = Math.ceil(720 / SIGN_IN_CELL_SIZE)
    const reservedCells = getFooterMarkReservedCells(gridCols, gridRows)
    const layout = getFooterMarkLinkLayout(1280, 720)
    const minCol = Math.min(...reservedCells.map((cell) => cell.col))
    const maxCol = Math.max(...reservedCells.map((cell) => cell.col))
    const minRow = Math.min(...reservedCells.map((cell) => cell.row))
    const maxRow = Math.max(...reservedCells.map((cell) => cell.row))

    expect(layout.left).toBe(minCol * SIGN_IN_CELL_SIZE)
    expect(layout.top).toBe(minRow * SIGN_IN_CELL_SIZE)
    expect(layout.width).toBe((maxCol - minCol + 1) * SIGN_IN_CELL_SIZE)
    expect(layout.height).toBe((maxRow - minRow + 1) * SIGN_IN_CELL_SIZE)
  })

  it("flickers footer inner fill faster on hover than at idle", () => {
    expect(getFooterInnerFillFlickerChance(false, false)).toBe(
      FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE
    )
    expect(getFooterInnerFillFlickerChance(true, false)).toBe(
      FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER
    )
    expect(getFooterInnerFillFlickerChance(true, false)).toBeGreaterThan(
      getFooterInnerFillFlickerChance(false, false)
    )
  })

  it("picks footer inner colors between the blue endpoints", () => {
    const start = Number.parseInt(FOOTER_INNER_FILL_COLOR_START.slice(1), 16)
    const end = Number.parseInt(FOOTER_INNER_FILL_COLOR_END.slice(1), 16)

    for (let i = 0; i < 20; i++) {
      const color = Number.parseInt(randomFooterInnerFillColor().slice(1), 16)
      expect(color).toBeGreaterThanOrEqual(Math.min(start, end))
      expect(color).toBeLessThanOrEqual(Math.max(start, end))
    }
  })
})
