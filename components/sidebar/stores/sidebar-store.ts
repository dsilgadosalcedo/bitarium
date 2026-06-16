import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const SIDEBAR_STORAGE_KEY = "bitarium:sidebar:v1"

type SidebarStore = {
  isOpen: boolean
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: false,
      setIsOpen: (value) =>
        set((state) => ({
          isOpen: typeof value === "function" ? value(state.isOpen) : value
        }))
    }),
    {
      name: SIDEBAR_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isOpen: state.isOpen })
    }
  )
)
