const APP_SCREENSHOT_WIDTH = 3164
const APP_SCREENSHOT_HEIGHT = 2070

const APP_SCREENSHOT_ALT =
  "Bitarium workspace showing the infinite canvas, folder sidebar, and Excalidraw-style drawing tools"

export function LandingAppPreview() {
  return (
    <figure className="mx-auto mt-12 max-w-5xl">
      <picture>
        <source srcSet="/landing/app-screenshot.avif" type="image/avif" />
        <source srcSet="/landing/app-screenshot.webp" type="image/webp" />
        <img
          src="/landing/app-screenshot.png"
          alt={APP_SCREENSHOT_ALT}
          width={APP_SCREENSHOT_WIDTH}
          height={APP_SCREENSHOT_HEIGHT}
          className="h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption className="mx-auto mt-1 max-w-md text-pretty text-center text-sm text-muted-foreground">
        Sketch on an infinite canvas, organize drawings in folders, and
        collaborate in real time.
      </figcaption>
    </figure>
  )
}
