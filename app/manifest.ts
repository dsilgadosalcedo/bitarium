import type { MetadataRoute } from "next"

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#191919",
    theme_color: "#191919",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  }
}
