import { v } from "convex/values"
import { internalMutation, mutation } from "./_generated/server"
import { normalizeEmail } from "./lib/email"
import { requireUserId } from "./lib/auth"
import {
  deleteLegacyUserIfExists,
  reassignUserOwnership,
  userHasOwnedData
} from "./lib/userOwnership"

const LEGACY_ACCOUNT_LINKS = [
  {
    legacyUserId: "k171dcas8bgftb8bd1ay2tkk857x0e21",
    email: "dsilgadosalcedo@gmail.com"
  },
  {
    legacyUserId: "k170rchxpd38xj57qx93n21ghd83mvvz",
    email: "davidsilgado@gmail.com"
  },
  {
    legacyUserId: "k175r5mxjdwqy8ch05r7nhsvcx7x39q0",
    email: "lindamarcela1804@gmail.com"
  }
] as const

const LINDA_DUPLICATE_LEGACY_USER_ID = "k17ea4psnz7fx9jcjy1dhes1kx7x1bm3"
const LINDA_PRIMARY_LEGACY_USER_ID = "k175r5mxjdwqy8ch05r7nhsvcx7x39q0"

export const linkLegacyAccount = mutation({
  args: {},
  returns: v.object({
    linked: v.boolean(),
    mergedLegacyUserIds: v.array(v.string())
  }),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity?.email) {
      return { linked: false, mergedLegacyUserIds: [] }
    }

    const clerkUserId = await requireUserId(ctx)
    const email = normalizeEmail(identity.email)

    const links = await ctx.db
      .query("accountLinks")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect()

    const mergedLegacyUserIds: string[] = []

    for (const link of links) {
      if (link.legacyUserId === clerkUserId) {
        if (!link.clerkUserId) {
          await ctx.db.patch(link._id, {
            clerkUserId,
            linkedAt: Date.now()
          })
        }
        continue
      }

      const hasData = await userHasOwnedData(ctx, link.legacyUserId)
      if (!hasData) {
        await deleteLegacyUserIfExists(ctx, link.legacyUserId)
        await ctx.db.patch(link._id, {
          clerkUserId,
          linkedAt: Date.now()
        })
        continue
      }

      await reassignUserOwnership(ctx, link.legacyUserId, clerkUserId)
      await deleteLegacyUserIfExists(ctx, link.legacyUserId)
      await ctx.db.patch(link._id, {
        clerkUserId,
        linkedAt: Date.now()
      })
      mergedLegacyUserIds.push(link.legacyUserId)
    }

    return {
      linked: mergedLegacyUserIds.length > 0,
      mergedLegacyUserIds
    }
  }
})

export const seedAccountLinks = internalMutation({
  args: {},
  returns: v.object({
    inserted: v.number(),
    skipped: v.number()
  }),
  handler: async (ctx) => {
    let inserted = 0
    let skipped = 0

    for (const link of LEGACY_ACCOUNT_LINKS) {
      const existing = await ctx.db
        .query("accountLinks")
        .withIndex("by_legacyUserId", (q) =>
          q.eq("legacyUserId", link.legacyUserId)
        )
        .first()

      if (existing) {
        skipped += 1
        continue
      }

      await ctx.db.insert("accountLinks", {
        legacyUserId: link.legacyUserId,
        email: link.email
      })
      inserted += 1
    }

    return { inserted, skipped }
  }
})

export const mergeLindaDuplicateAccount = internalMutation({
  args: {},
  returns: v.object({
    merged: v.boolean(),
    removedLegacyUser: v.boolean()
  }),
  handler: async (ctx) => {
    const hasData = await userHasOwnedData(ctx, LINDA_DUPLICATE_LEGACY_USER_ID)

    if (!hasData) {
      const removedLegacyUser = await deleteLegacyUserIfExists(
        ctx,
        LINDA_DUPLICATE_LEGACY_USER_ID
      )
      return { merged: false, removedLegacyUser }
    }

    await reassignUserOwnership(
      ctx,
      LINDA_DUPLICATE_LEGACY_USER_ID,
      LINDA_PRIMARY_LEGACY_USER_ID
    )

    const removedLegacyUser = await deleteLegacyUserIfExists(
      ctx,
      LINDA_DUPLICATE_LEGACY_USER_ID
    )

    return { merged: true, removedLegacyUser }
  }
})

export const migrateLegacyUserToClerkId = internalMutation({
  args: {
    legacyUserId: v.string(),
    clerkUserId: v.string(),
    email: v.string()
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const hasData = await userHasOwnedData(ctx, args.legacyUserId)
    if (!hasData) {
      await deleteLegacyUserIfExists(ctx, args.legacyUserId)
      return false
    }

    await reassignUserOwnership(ctx, args.legacyUserId, args.clerkUserId)
    await deleteLegacyUserIfExists(ctx, args.legacyUserId)

    const link = await ctx.db
      .query("accountLinks")
      .withIndex("by_legacyUserId", (q) =>
        q.eq("legacyUserId", args.legacyUserId)
      )
      .first()

    if (link) {
      await ctx.db.patch(link._id, {
        clerkUserId: args.clerkUserId,
        linkedAt: Date.now(),
        email: args.email
      })
    } else {
      await ctx.db.insert("accountLinks", {
        legacyUserId: args.legacyUserId,
        email: args.email,
        clerkUserId: args.clerkUserId,
        linkedAt: Date.now()
      })
    }

    return true
  }
})
