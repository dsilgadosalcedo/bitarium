export const SIGN_IN_CELL_SIZE = 18
export const LOGIN_ERROR_GAP_ROWS = 2
export const LOGIN_ERROR_ROWS = 3
export const BACKGROUND_PICKER_MARGIN_CELLS = 2
export const BACKGROUND_PICKER_SWATCH_CELLS = 2

export type SignInPanelLayout = {
  originCol: number
  originRow: number
  panelCols: number
  panelRows: number
  left: number
  top: number
  width: number
  height: number
}

export type GridCell = {
  col: number
  row: number
}

export type PanelBorderCell = GridCell & {
  opacity: number
}

export const PANEL_BORDER_MIN_OPACITY = 0.26
export const PANEL_BORDER_MAX_OPACITY = 0.85

export function getPanelBorderOpacity(
  row: number,
  originRow: number,
  lastRow: number
): number {
  if (lastRow <= originRow) {
    return PANEL_BORDER_MAX_OPACITY
  }

  const progress = (lastRow - row) / (lastRow - originRow)
  const opacity =
    PANEL_BORDER_MIN_OPACITY +
    progress * (PANEL_BORDER_MAX_OPACITY - PANEL_BORDER_MIN_OPACITY)

  return Math.round(opacity * 1000) / 1000
}

export function getSignInPanelDimensions(viewportWidth: number) {
  if (viewportWidth < 520) {
    return { panelCols: 20, panelRows: 24 }
  }

  return { panelCols: 24, panelRows: 24 }
}

export function computeSignInPanelLayout(
  viewportWidth: number,
  viewportHeight: number
): SignInPanelLayout {
  const { panelCols, panelRows } = getSignInPanelDimensions(viewportWidth)
  const gridCols = Math.ceil(viewportWidth / SIGN_IN_CELL_SIZE)
  const gridRows = Math.ceil(viewportHeight / SIGN_IN_CELL_SIZE)

  const originCol = Math.max(1, Math.floor((gridCols - panelCols) / 2))
  const originRow = Math.max(1, Math.floor((gridRows - panelRows) / 2))

  return {
    originCol,
    originRow,
    panelCols,
    panelRows,
    left: originCol * SIGN_IN_CELL_SIZE,
    top: originRow * SIGN_IN_CELL_SIZE,
    width: panelCols * SIGN_IN_CELL_SIZE,
    height: panelRows * SIGN_IN_CELL_SIZE
  }
}

export function getPanelCells(panel: SignInPanelLayout): GridCell[] {
  const cells: GridCell[] = []

  for (let row = 0; row < panel.panelRows; row++) {
    for (let col = 0; col < panel.panelCols; col++) {
      cells.push({
        col: panel.originCol + col,
        row: panel.originRow + row
      })
    }
  }

  return cells
}

export function getPanelBorderCells(
  panel: SignInPanelLayout
): PanelBorderCell[] {
  const cells: PanelBorderCell[] = []
  const { originCol, originRow, panelCols, panelRows } = panel
  const lastCol = originCol + panelCols - 1
  const lastRow = originRow + panelRows - 1

  const pushBorderCell = (col: number, row: number) => {
    cells.push({
      col,
      row,
      opacity: getPanelBorderOpacity(row, originRow, lastRow)
    })
  }

  for (let col = originCol; col <= lastCol; col++) {
    pushBorderCell(col, originRow)
    pushBorderCell(col, lastRow)
  }

  for (let row = originRow + 1; row < lastRow; row++) {
    pushBorderCell(originCol, row)
    pushBorderCell(lastCol, row)
  }

  return cells
}

export function getCellIndex(col: number, row: number, gridCols: number) {
  return row * gridCols + col
}

export function getContentColumnBounds(panelCols: number) {
  return {
    start: 3,
    end: panelCols - 1
  }
}

export type LoginErrorZoneLayout = {
  left: number
  top: number
  width: number
  height: number
}

export function getLoginErrorZoneLayout(
  panel: SignInPanelLayout
): LoginErrorZoneLayout {
  const { start, end } = getContentColumnBounds(panel.panelCols)

  return {
    left: panel.left + (start - 1) * SIGN_IN_CELL_SIZE,
    top: panel.top + panel.height + LOGIN_ERROR_GAP_ROWS * SIGN_IN_CELL_SIZE,
    width: (end - start) * SIGN_IN_CELL_SIZE,
    height: LOGIN_ERROR_ROWS * SIGN_IN_CELL_SIZE
  }
}

export function getBackgroundPickerCells(gridCols: number): GridCell[] {
  const cells: GridCell[] = []
  const margin = BACKGROUND_PICKER_MARGIN_CELLS
  const size = BACKGROUND_PICKER_SWATCH_CELLS
  const startRow = margin
  const blackStartCol = gridCols - margin - size
  const grayStartCol = blackStartCol - size

  for (const startCol of [grayStartCol, blackStartCol]) {
    for (let row = startRow; row < startRow + size; row++) {
      for (let col = startCol; col < startCol + size; col++) {
        if (col >= 0) {
          cells.push({ col, row })
        }
      }
    }
  }

  return cells
}

export type BackgroundPickerLayout = {
  top: number
  grayLeft: number
  blackLeft: number
  swatchSize: number
}

export function getBackgroundPickerLayout(
  viewportWidth: number
): BackgroundPickerLayout {
  const gridCols = Math.ceil(viewportWidth / SIGN_IN_CELL_SIZE)
  const margin = BACKGROUND_PICKER_MARGIN_CELLS
  const size = BACKGROUND_PICKER_SWATCH_CELLS
  const swatchSize = size * SIGN_IN_CELL_SIZE
  const blackLeft = (gridCols - margin - size) * SIGN_IN_CELL_SIZE
  const grayLeft = blackLeft - swatchSize
  const top = margin * SIGN_IN_CELL_SIZE

  return { top, grayLeft, blackLeft, swatchSize }
}

export function getLoginErrorZoneCells(panel: SignInPanelLayout): GridCell[] {
  const { start, end } = getContentColumnBounds(panel.panelCols)
  const cells: GridCell[] = []
  const firstRow = panel.originRow + panel.panelRows + LOGIN_ERROR_GAP_ROWS
  const lastRow = firstRow + LOGIN_ERROR_ROWS - 1
  const firstCol = panel.originCol + (start - 1)
  const lastCol = panel.originCol + (end - 1) - 1

  for (let row = firstRow; row <= lastRow; row++) {
    for (let col = firstCol; col <= lastCol; col++) {
      cells.push({ col, row })
    }
  }

  return cells
}

export type SignInPanelSectionRange = {
  start: number
  end: number
}

export type SignInPanelSectionLayout = {
  contentStart: number
  contentEnd: number
  columnSpan: string
  passwordInputColumn: string
  passwordToggleColumn: string
  submitGoogleColumn: string
  submitPasswordColumn: string
  header: SignInPanelSectionRange
  body: SignInPanelSectionRange
  footer: SignInPanelSectionRange
  rows: {
    username: string
    password: string
    passwordHint: string
    captcha: string
    submitSignIn: string
    submitSignUp: string
    flowToggleSignIn: string
    flowToggleSignUp: string
    termsSignIn: string
    termsSignUp: string
  }
}

export function getSignInFlowRows(
  flow: "signIn" | "signUp",
  rows: SignInPanelSectionLayout["rows"]
) {
  if (flow === "signUp") {
    return {
      submit: rows.submitSignUp,
      flowToggle: rows.flowToggleSignUp,
      terms: rows.termsSignUp
    }
  }

  return {
    submit: rows.submitSignIn,
    flowToggle: rows.flowToggleSignIn,
    terms: rows.termsSignIn
  }
}

export function getSignInPanelSectionLayout(
  panelCols: number
): SignInPanelSectionLayout {
  const { start, end } = getContentColumnBounds(panelCols)

  const toggleStart = end - 2
  const submitSplit = start + Math.floor((end - start) / 2)

  return {
    contentStart: start,
    contentEnd: end,
    columnSpan: `${start} / ${end}`,
    passwordInputColumn: `${start} / ${toggleStart}`,
    passwordToggleColumn: `${toggleStart} / ${end}`,
    submitGoogleColumn: `${start} / ${submitSplit}`,
    submitPasswordColumn: `${submitSplit} / ${end}`,
    header: { start: 2, end: 7 },
    body: { start: 8, end: 16 },
    footer: { start: 16, end: 24 },
    rows: {
      username: "8 / 10",
      password: "11 / 13",
      passwordHint: "13 / 14",
      captcha: "14 / 18",
      submitSignIn: "14 / 16",
      submitSignUp: "18 / 20",
      flowToggleSignIn: "17 / 19",
      flowToggleSignUp: "20 / 22",
      termsSignIn: "20 / 23",
      termsSignUp: "22 / 24"
    }
  }
}
