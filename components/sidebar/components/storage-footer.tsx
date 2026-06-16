import { sidebarIcons, formatStorage } from "../constants/sidebar-constants"
import { SidebarProfile } from "./sidebar-profile"

type StorageFooterProps = {
  userStorage?: { totalBytes: number } | null
}

export function StorageFooter({ userStorage }: StorageFooterProps) {
  return (
    <div className="space-y-2 border-t px-2 py-3">
      <SidebarProfile />
      {userStorage ? (
        <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          <sidebarIcons.HardDrive className="h-4 w-4" />
          <span className="flex-1">Storage used</span>
          <span className="font-medium">
            {formatStorage(userStorage.totalBytes)}
          </span>
        </div>
      ) : null}
    </div>
  )
}
