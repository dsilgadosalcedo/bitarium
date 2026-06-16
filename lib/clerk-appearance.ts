import { shadcn } from "@clerk/ui/themes"

/** Shared Clerk appearance — matches shadcn dark tokens from globals.css. */
export const clerkAppearance = {
  theme: shadcn
} as const

export const clerkUserButtonAppearance = {
  ...clerkAppearance,
  elements: {
    userButtonAvatarBox: "h-9 w-9",
    userButtonTrigger:
      "rounded-full focus:shadow-none focus:ring-2 focus:ring-sidebar-ring"
  }
} as const
