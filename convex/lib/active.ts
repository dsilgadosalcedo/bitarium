/** Treat missing isActive as active for legacy rows during migration. */
export function isActiveRecord(
  isActive: boolean | undefined
): isActive is true {
  return isActive !== false
}

export function activeFlag(isActive: boolean | undefined): boolean {
  return isActive !== false
}
