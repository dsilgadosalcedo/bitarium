import type { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server"

export async function getUserId(
  ctx: QueryCtx | MutationCtx | ActionCtx
): Promise<string | null> {
  const identity = await ctx.auth.getUserIdentity()
  return identity?.subject ?? null
}

export async function requireUserId(
  ctx: QueryCtx | MutationCtx | ActionCtx
): Promise<string> {
  const userId = await getUserId(ctx)
  if (!userId) {
    throw new Error("Unauthorized")
  }

  return userId
}
