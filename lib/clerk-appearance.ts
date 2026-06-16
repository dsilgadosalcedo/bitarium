import { dark } from "@clerk/ui/themes"

/** Bitarium is dark-only — use Clerk's explicit dark theme (not shadcn/CSS-variable based). */
export const clerkAppearance = {
  theme: dark
} as const

export const clerkUserButtonAppearance = {
  ...clerkAppearance,
  elements: {
    userButtonAvatarBox: "h-9 w-9",
    userButtonTrigger:
      "rounded-full focus:shadow-none focus:ring-2 focus:ring-sidebar-ring"
  }
} as const
