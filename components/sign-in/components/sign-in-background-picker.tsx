"use client"

import {
  SIGN_IN_BACKGROUNDS,
  type SignInBackgroundId
} from "../constants/sign-in-background"
import {
  getBackgroundPickerLayout,
  type BackgroundPickerLayout
} from "../constants/grid-layout"
import { useViewportSize } from "../hooks/use-viewport-size"
import { px } from "../utils/px"

const swatchSharedClass =
  "pointer-events-auto absolute cursor-pointer rounded-none border shadow-none transition-[border-color] focus-visible:ring-0"

function getSwatchClassName(isSelected: boolean) {
  if (isSelected) {
    return `${swatchSharedClass} border-[var(--draw-purple-foreground)]`
  }

  return `${swatchSharedClass} border-transparent hover:border-[color-mix(in_srgb,var(--draw-purple-foreground)_50%,transparent)] focus-visible:border-[var(--draw-purple-foreground)]`
}

interface SignInBackgroundPickerProps {
  backgroundId: SignInBackgroundId
  onBackgroundChange: (id: SignInBackgroundId) => void
}

function BackgroundSwatch({
  id,
  layout,
  left,
  isSelected,
  onSelect
}: {
  id: SignInBackgroundId
  layout: BackgroundPickerLayout
  left: number
  isSelected: boolean
  onSelect: (id: SignInBackgroundId) => void
}) {
  const { label, swatchClassName } = SIGN_IN_BACKGROUNDS[id]

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={label}
      className={`${getSwatchClassName(isSelected)} ${swatchClassName}`}
      style={{
        top: px(layout.top),
        left: px(left),
        width: px(layout.swatchSize),
        height: px(layout.swatchSize)
      }}
      onClick={() => onSelect(id)}
    />
  )
}

export function SignInBackgroundPicker({
  backgroundId,
  onBackgroundChange
}: SignInBackgroundPickerProps) {
  const { width: viewportWidth } = useViewportSize()
  const layout = getBackgroundPickerLayout(viewportWidth)

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      role="radiogroup"
      aria-label="Login page background"
    >
      <BackgroundSwatch
        id="gray"
        layout={layout}
        left={layout.grayLeft}
        isSelected={backgroundId === "gray"}
        onSelect={onBackgroundChange}
      />
      <BackgroundSwatch
        id="black"
        layout={layout}
        left={layout.blackLeft}
        isSelected={backgroundId === "black"}
        onSelect={onBackgroundChange}
      />
    </div>
  )
}
