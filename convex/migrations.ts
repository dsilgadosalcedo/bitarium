import { v } from "convex/values"
import { internalMutation } from "./_generated/server"

/** One-off: backfill isActive on legacy prod rows before strict schema deploy. */
export const backfillIsActiveFlags = internalMutation({
  args: {},
  returns: v.object({
    drawingsPatched: v.number(),
    foldersPatched: v.number()
  }),
  handler: async (ctx) => {
    let drawingsPatched = 0
    let foldersPatched = 0

    for (const drawing of await ctx.db.query("drawings").collect()) {
      if (drawing.isActive === undefined) {
        await ctx.db.patch("drawings", drawing._id, { isActive: true })
        drawingsPatched++
      }
    }

    for (const folder of await ctx.db.query("folders").collect()) {
      if (folder.isActive === undefined) {
        await ctx.db.patch("folders", folder._id, { isActive: true })
        foldersPatched++
      }
    }

    return { drawingsPatched, foldersPatched }
  }
})
