import { describe, expect, it } from "vitest"
import {
  SIGN_IN_CELL_SIZE,
  BACKGROUND_PICKER_MARGIN_CELLS,
  BACKGROUND_PICKER_SWATCH_CELLS,
  computeSignInPanelLayout,
  getBackgroundPickerCells,
  getBackgroundPickerLayout,
  PANEL_BORDER_MAX_OPACITY,
  PANEL_BORDER_MIN_OPACITY,
  getContentColumnBounds,
  getPanelBorderCells,
  getPanelCells,
  getLoginErrorZoneCells,
  getLoginErrorZoneLayout,
  getSignInPanelSectionLayout
} from "./grid-layout"

describe("computeSignInPanelLayout", () => {
  it("centers the panel on the viewport grid", () => {
    const layout = computeSignInPanelLayout(1280, 720)

    expect(layout.left % SIGN_IN_CELL_SIZE).toBe(0)
    expect(layout.top % SIGN_IN_CELL_SIZE).toBe(0)
    expect(layout.width).toBe(layout.panelCols * SIGN_IN_CELL_SIZE)
    expect(layout.height).toBe(layout.panelRows * SIGN_IN_CELL_SIZE)
  })

  it("uses a narrower panel on small viewports", () => {
    const desktop = computeSignInPanelLayout(1280, 720)
    const mobile = computeSignInPanelLayout(400, 800)

    expect(desktop.panelCols).toBe(24)
    expect(mobile.panelCols).toBe(20)
    expect(desktop.panelRows).toBe(24)
    expect(mobile.panelRows).toBe(24)
  })
})

describe("panel cell helpers", () => {
  it("reserves every interior cell for the login panel", () => {
    const layout = computeSignInPanelLayout(900, 600)
    const cells = getPanelCells(layout)

    expect(cells).toHaveLength(layout.panelCols * layout.panelRows)
  })

  it("draws a one-cell-thick border frame", () => {
    const layout = computeSignInPanelLayout(900, 600)
    const border = getPanelBorderCells(layout)
    const expected = layout.panelCols * 2 + (layout.panelRows - 2) * 2

    expect(border).toHaveLength(expected)
  })

  it("fades the panel border from full opacity at the top to 26% at the bottom", () => {
    const layout = computeSignInPanelLayout(1280, 720)
    const border = getPanelBorderCells(layout)
    const lastRow = layout.originRow + layout.panelRows - 1
    const topRowCells = border.filter((cell) => cell.row === layout.originRow)
    const bottomRowCells = border.filter((cell) => cell.row === lastRow)
    const middleRow = layout.originRow + Math.floor(layout.panelRows / 2)
    const middleRowCells = border.filter((cell) => cell.row === middleRow)

    expect(
      topRowCells.every((cell) => cell.opacity === PANEL_BORDER_MAX_OPACITY)
    ).toBe(true)
    expect(
      bottomRowCells.every((cell) => cell.opacity === PANEL_BORDER_MIN_OPACITY)
    ).toBe(true)
    expect(
      middleRowCells.every((cell) => cell.opacity > PANEL_BORDER_MIN_OPACITY)
    ).toBe(true)
    expect(
      middleRowCells.every((cell) => cell.opacity < PANEL_BORDER_MAX_OPACITY)
    ).toBe(true)
  })

  it("keeps form content inset from the panel edge", () => {
    const { start, end } = getContentColumnBounds(24)

    expect(start).toBe(3)
    expect(end).toBe(23)
    expect(end - start).toBe(20)
  })

  it("divides the panel into header, body, and footer sections", () => {
    const sections = getSignInPanelSectionLayout(24)

    expect(sections.header).toEqual({ start: 2, end: 7 })
    expect(sections.body).toEqual({ start: 8, end: 16 })
    expect(sections.footer).toEqual({ start: 16, end: 24 })
    expect(sections.footer.end).toBe(24)
  })

  it("splits the submit row into Google and password buttons", () => {
    const sections = getSignInPanelSectionLayout(24)

    expect(sections.submitGoogleColumn).toBe("3 / 13")
    expect(sections.submitPasswordColumn).toBe("13 / 23")
  })

  it("reserves a 2-column square for the password visibility toggle", () => {
    const sections = getSignInPanelSectionLayout(24)

    expect(sections.passwordInputColumn).toBe("3 / 21")
    expect(sections.passwordToggleColumn).toBe("21 / 23")
  })

  it("places the login error zone two rows below the panel border", () => {
    const panel = computeSignInPanelLayout(1280, 720)
    const zone = getLoginErrorZoneLayout(panel)
    const cells = getLoginErrorZoneCells(panel)

    expect(zone.top).toBe(panel.top + panel.height + 36)
    expect(zone.height).toBe(54)
    expect(cells).toHaveLength(60)
  })
})

describe("background picker layout", () => {
  it("reserves two 2x2 swatches in the top-right corner", () => {
    const viewportWidth = 1280
    const gridCols = Math.ceil(viewportWidth / SIGN_IN_CELL_SIZE)
    const cells = getBackgroundPickerCells(gridCols)

    expect(cells).toHaveLength(
      2 * BACKGROUND_PICKER_SWATCH_CELLS * BACKGROUND_PICKER_SWATCH_CELLS
    )
  })

  it("positions swatches on the grid with a two-cell margin", () => {
    const viewportWidth = 1280
    const gridCols = Math.ceil(viewportWidth / SIGN_IN_CELL_SIZE)
    const layout = getBackgroundPickerLayout(viewportWidth)
    const swatchSize = BACKGROUND_PICKER_SWATCH_CELLS * SIGN_IN_CELL_SIZE
    const margin = BACKGROUND_PICKER_MARGIN_CELLS

    expect(layout.top).toBe(margin * SIGN_IN_CELL_SIZE)
    expect(layout.swatchSize).toBe(swatchSize)
    expect(layout.blackLeft).toBe((gridCols - margin - 2) * SIGN_IN_CELL_SIZE)
    expect(layout.grayLeft + swatchSize).toBe(layout.blackLeft)
  })
})
