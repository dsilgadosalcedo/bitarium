"use client"

import {
  FOOTER_MARK_URL,
  getFooterMarkLinkLayout
} from "../constants/grid-pixel-text"
import { useViewportSize } from "../hooks/use-viewport-size"
import { px } from "../utils/px"

interface FooterMarkLinkProps {
  onHoverChange: (hovered: boolean) => void
}

export function FooterMarkLink({ onHoverChange }: FooterMarkLinkProps) {
  const { width, height } = useViewportSize()
  const layout = getFooterMarkLinkLayout(width, height)

  return (
    <a
      href={FOOTER_MARK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="7 Lineas"
      className="absolute z-20 block cursor-pointer rounded-none opacity-0"
      style={{
        left: px(layout.left),
        top: px(layout.top),
        width: px(layout.width),
        height: px(layout.height)
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
    />
  )
}
