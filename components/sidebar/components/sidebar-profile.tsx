"use client"

import { UserButton, useUser } from "@clerk/nextjs"

export function SidebarProfile() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
          <div className="h-3 w-32 animate-pulse rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName =
    user.fullName?.trim() ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    "Account"

  const email = user.primaryEmailAddress?.emailAddress

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "h-9 w-9",
            userButtonTrigger:
              "rounded-full focus:shadow-none focus:ring-2 focus:ring-sidebar-ring"
          }
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-sidebar-foreground">
          {displayName}
        </p>
        {email ? (
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        ) : null}
      </div>
    </div>
  )
}
