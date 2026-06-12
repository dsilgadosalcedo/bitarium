import { ImageResponse } from "next/og"

import { PUBLISHER_NAME, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "linear-gradient(145deg, #191919 0%, #242424 45%, #2f2f2f 100%)",
        color: "#f5f5f5",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "#6a65db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 700
          }}
        >
          B
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.03em"
          }}
        >
          {SITE_NAME}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 52,
            lineHeight: 1.15,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            maxWidth: 900
          }}
        >
          An infinite canvas for thinking, designing, and organizing ideas.
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.45,
            color: "#a3a3a3",
            maxWidth: 920
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>

      <div style={{ fontSize: 22, color: "#737373" }}>{PUBLISHER_NAME}</div>
    </div>,
    { ...size }
  )
}
