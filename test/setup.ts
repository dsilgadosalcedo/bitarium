import "@testing-library/jest-dom"
import { beforeAll, afterEach, vi } from "vitest"

beforeAll(() => {
  global.mockConvexQuery = vi.fn(() => undefined)
  global.mockConvexMutation = vi.fn(() => Promise.resolve(null))
  global.mockConvexAction = vi.fn(() => Promise.resolve(null))
})

afterEach(() => {
  vi.clearAllMocks()
})

declare global {
  var mockConvexQuery: ReturnType<typeof vi.fn>
  var mockConvexMutation: ReturnType<typeof vi.fn>
  var mockConvexAction: ReturnType<typeof vi.fn>
}

export function createMockQuery<T>(data: T) {
  return vi.fn(() => data)
}

export function createMockMutation() {
  return vi.fn(() => Promise.resolve(null))
}

export function createMockAction() {
  return vi.fn(() => Promise.resolve(null))
}
