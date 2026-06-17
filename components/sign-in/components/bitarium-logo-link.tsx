"use client"

import Link from "next/link"

import {
  BITARIUM_LOGO_URL,
  getBitariumLogoLinkLayout
} from "../constants/grid-pixel-text"
import { px } from "../utils/px"

export function BitariumLogoLink() {
  const layout = getBitariumLogoLinkLayout()

  return (
    <Link
      href={BITARIUM_LOGO_URL}
      aria-label="Bitarium home"
      className="absolute z-20 block cursor-pointer rounded-none opacity-0"
      style={{
        left: px(layout.left),
        top: px(layout.top),
        width: px(layout.width),
        height: px(layout.height)
      }}
    />
  )
}
