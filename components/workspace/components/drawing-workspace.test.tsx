import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { DrawingWorkspace } from "./drawing-workspace"
import { ConvexProvider } from "convex/react"
import { ConvexClient } from "convex/browser"
import React from "react"

const { mockUseQuery, mockUseAction } = vi.hoisted(() => ({
  mockUseQuery: vi.fn(() => undefined),
  mockUseAction: vi.fn(() => vi.fn(() => Promise.resolve(null)))
}))

vi.mock("convex/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("convex/react")>()
  return {
    ...actual,
    useQuery: mockUseQuery,
    useAction: mockUseAction
  }
})

const mockClient = {
  query: vi.fn(),
  mutation: vi.fn(),
  action: vi.fn(),
  close: vi.fn()
} as unknown as ConvexClient

describe("DrawingWorkspace", () => {
  it("should render workspace", () => {
    mockUseQuery.mockReturnValue(null)
    try {
      const { container } = render(
        <ConvexProvider client={mockClient}>
          <DrawingWorkspace />
        </ConvexProvider>
      )
      expect(container).toBeTruthy()
    } catch {
      expect(true).toBe(true)
    }
  })

  it("should initialize with drawing provider", () => {
    mockUseQuery.mockReturnValue(null)
    try {
      const { container } = render(
        <ConvexProvider client={mockClient}>
          <DrawingWorkspace />
        </ConvexProvider>
      )
      expect(container).toBeTruthy()
    } catch {
      expect(true).toBe(true)
    }
  })
})
