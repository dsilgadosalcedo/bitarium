import type { MutationCtx, QueryCtx } from "../_generated/server"
import type { Id } from "../_generated/dataModel"

export async function userHasOwnedData(
  ctx: QueryCtx | MutationCtx,
  userId: string
): Promise<boolean> {
  const drawing = await ctx.db
    .query("drawings")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first()

  if (drawing) {
    return true
  }

  const folder = await ctx.db
    .query("folders")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first()

  if (folder) {
    return true
  }

  const storage = await ctx.db
    .query("userStorage")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first()

  return storage !== null && storage.totalBytes > 0
}

export async function reassignUserOwnership(
  ctx: MutationCtx,
  fromUserId: string,
  toUserId: string
): Promise<void> {
  if (fromUserId === toUserId) {
    return
  }

  const drawings = await ctx.db
    .query("drawings")
    .withIndex("by_userId", (q) => q.eq("userId", fromUserId))
    .collect()

  for (const drawing of drawings) {
    await ctx.db.patch(drawing._id, { userId: toUserId })
  }

  const folders = await ctx.db
    .query("folders")
    .withIndex("by_userId", (q) => q.eq("userId", fromUserId))
    .collect()

  for (const folder of folders) {
    await ctx.db.patch(folder._id, { userId: toUserId })
  }

  const fromStorage = await ctx.db
    .query("userStorage")
    .withIndex("by_userId", (q) => q.eq("userId", fromUserId))
    .first()

  if (fromStorage) {
    const toStorage = await ctx.db
      .query("userStorage")
      .withIndex("by_userId", (q) => q.eq("userId", toUserId))
      .first()

    if (toStorage) {
      await ctx.db.patch(toStorage._id, {
        totalBytes: toStorage.totalBytes + fromStorage.totalBytes
      })
      await ctx.db.delete(fromStorage._id)
    } else {
      await ctx.db.patch(fromStorage._id, { userId: toUserId })
    }
  }

  const collaboratorRows = await ctx.db
    .query("drawingCollaborators")
    .withIndex("by_collaboratorUserId", (q) =>
      q.eq("collaboratorUserId", fromUserId)
    )
    .collect()

  for (const row of collaboratorRows) {
    await ctx.db.patch(row._id, { collaboratorUserId: toUserId })
  }

  const addedByRows = await ctx.db.query("drawingCollaborators").collect()

  for (const row of addedByRows) {
    if (row.addedByUserId === fromUserId) {
      await ctx.db.patch(row._id, { addedByUserId: toUserId })
    }
  }
}

export async function deleteLegacyUserIfExists(
  ctx: MutationCtx,
  legacyUserId: string
): Promise<boolean> {
  const legacyUser = await ctx.db.get("users", legacyUserId as Id<"users">)
  if (!legacyUser) {
    return false
  }

  await ctx.db.delete(legacyUser._id)
  return true
}
