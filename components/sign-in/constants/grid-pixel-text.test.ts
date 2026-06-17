import { describe, expect, it } from "vitest"
import {
  FOOTER_MARK_LETTER_HEIGHT,
  FOOTER_MARK_MARGIN_CELLS,
  FOOTER_MARK_TEXT,
  BITARIUM_LOGO_ARIUM_MAX_OPACITY,
  BITARIUM_LOGO_ARIUM_MIN_OPACITY,
  getBitariumLogoAriumCells,
  getBitariumLogoBitCells,
  getBitariumLogoCells,
  getBitariumLogoLinkLayout,
  FOOTER_INNER_FILL_COLOR_END,
  FOOTER_INNER_FILL_COLOR_START,
  FOOTER_INNER_FILL_FLICKER_CHANCE_HOVER,
  FOOTER_INNER_FILL_FLICKER_CHANCE_IDLE,
  getFooterInnerFillFlickerChance,
  getHeartMarkCells,
  HEART_MARK_HEIGHT,
  HEART_MARK_MARGIN_CELLS,
  getFooterMarkCells,
  getFooterMarkInnerFillCells,
  getFooterMarkLinkLayout,
  getFooterMarkReservedCells,
  randomFooterInnerFillColor
} from "./grid-pixel-text"
import { SIGN_IN_CELL_SIZE, type GridCell } from "./grid-layout"

describe("grid pixel text", () => {
  it("fades ARium opacity from 40% on the left to 5% on the right by column", () => {
    const ariumCells = getBitariumLogoAriumCells()
    const leftCol = Math.min(...ariumCells.map((cell) => cell.col))
    const rightCol = Math.max(...ariumCells.map((cell) => cell.col))
    const leftColCells = ariumCells.filter((cell) => cell.col === leftCol)
    const rightColCells = ariumCells.filter((cell) => cell.col === rightCol)
    const middleCol = leftCol + Math.floor((rightCol - leftCol) / 2)
    const middleColCells = ariumCells.filter((cell) => cell.col === middleCol)

    expect(
      leftColCells.every(
        (cell) => cell.opacity === BITARIUM_LOGO_ARIUM_MAX_OPACITY
      )
    ).toBe(true)
    expect(
      rightColCells.every(
        (cell) => cell.opacity === BITARIUM_LOGO_ARIUM_MIN_OPACITY
      )
    ).toBe(true)
    expect(
      middleColCells.every(
        (cell) => cell.opacity > BITARIUM_LOGO_ARIUM_MIN_OPACITY
      )
    ).toBe(true)
    expect(
      middleColCells.every(
        (cell) => cell.opacity < BITARIUM_LOGO_ARIUM_MAX_OPACITY
      )
    ).toBe(true)
  })

  it("matches ink spacing between Bi, i, and T to other logo letters", () => {
    const getInkGaps = (cells: GridCell[]) => {
      const colGroups: number[][] = []

      for (const col of [...new Set(cells.map((cell) => cell.col))].sort(
        (a, b) => a - b
      )) {
        const lastGroup = colGroups[colGroups.length - 1]
        const lastCol = lastGroup?.[lastGroup.length - 1]

        if (lastCol !== undefined && col - lastCol > 1) {
          colGroups.push([col])
        } else if (lastGroup) {
          lastGroup.push(col)
        } else {
          colGroups.push([col])
        }
      }

      const gaps: number[] = []

      for (let index = 0; index < colGroups.length - 1; index++) {
        const currentRight = colGroups[index]!.at(-1)!
        const nextLeft = colGroups[index + 1]![0]!
        gaps.push(nextLeft - currentRight)
      }

      return gaps
    }

    const bitGaps = getInkGaps(getBitariumLogoBitCells())
    const ariumGaps = getInkGaps(getBitariumLogoAriumCells())

    expect(bitGaps).toEqual([2, 2])
    expect(ariumGaps[0]).toBe(bitGaps[0])
  })

  it("places ARium after BiT without overlapping", () => {
    const bitCols = new Set(getBitariumLogoBitCells().map((cell) => cell.col))
    const ariumCols = new Set(
      getBitariumLogoAriumCells().map((cell) => cell.col)
    )

    for (const col of ariumCols) {
      expect(bitCols.has(col)).toBe(false)
    }

    expect(Math.min(...ariumCols)).toBeGreaterThan(Math.max(...bitCols))
  })

  it("renders the Bitarium logo taller than the footer mark", () => {
    const drawRows = new Set(getBitariumLogoCells().map((cell) => cell.row))
    const footerRows = new Set(
      getFooterMarkCells(72, 40).map((cell) => cell.row)
    )

    expect(Math.max(...drawRows) - Math.min(...drawRows) + 1).toBe(7)
    expect(Math.max(...footerRows) - Math.min(...footerRows) + 1).toBe(
      FOOTER_MARK_LETTER_HEIGHT
    )
  })

  it("keeps the heart mark in the bottom-left with margin", () => {
    const gridCols = Math.ceil(1280 / SIGN_IN_CELL_SIZE)
    const gridRows = Math.ceil(720 / SIGN_IN_CELL_SIZE)
    const margin = HEART_MARK_MARGIN_CELLS
    const heartCells = getHeartMarkCells(gridCols, gridRows)

    expect(heartCells.length).toBeGreaterThan(0)

    for (const { col, row } of heartCells) {
      expect(col).toBeGreaterThanOrEqual(margin)
      expect(row).toBeGreaterThanOrEqual(0)
      expect(col).toBeLessThan(gridCols)
      expect(row).toBeLessThan(gridRows)
    }

    expect(Math.min(...heartCells.map((cell) => cell.col))).toBe(margin)
    expect(Math.max(...heartCells.map((cell) => cell.row))).toBe(
      gridRows - margin - 1
    )
    expect(
      Math.max(...heartCells.map((cell) => cell.row)) -
        Math.min(...heartCells.map((cell) => cell.row)) +
        1
    ).toBe(HEART_MARK_HEIGHT)
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

  it("sizes the Bitarium logo link to the logo hit area", () => {
    const logoCells = getBitariumLogoCells()
    const layout = getBitariumLogoLinkLayout()
    const minCol = Math.min(...logoCells.map((cell) => cell.col))
    const maxCol = Math.max(...logoCells.map((cell) => cell.col))
    const minRow = Math.min(...logoCells.map((cell) => cell.row))
    const maxRow = Math.max(...logoCells.map((cell) => cell.row))

    expect(layout.left).toBe(minCol * SIGN_IN_CELL_SIZE)
    expect(layout.top).toBe(minRow * SIGN_IN_CELL_SIZE)
    expect(layout.width).toBe((maxCol - minCol + 1) * SIGN_IN_CELL_SIZE)
    expect(layout.height).toBe((maxRow - minRow + 1) * SIGN_IN_CELL_SIZE)
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
