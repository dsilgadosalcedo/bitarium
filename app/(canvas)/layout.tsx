import { CanvasRouteLayout } from "@/components/sign-in/components/canvas-route-layout"

export default function CanvasLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CanvasRouteLayout>{children}</CanvasRouteLayout>
}
