"use node"

import { createClerkClient } from "@clerk/backend"
import { v } from "convex/values"
import { internalAction } from "./_generated/server"
import { internal } from "./_generated/api"
import { normalizeEmail } from "./lib/email"

const CLERK_EMAIL_TARGETS = [
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

export const migrateLegacyAccountsToClerk = internalAction({
  args: {},
  returns: v.object({
    seed: v.object({
      inserted: v.number(),
      skipped: v.number()
    }),
    lindaMerge: v.object({
      merged: v.boolean(),
      removedLegacyUser: v.boolean()
    }),
    clerkMigrations: v.array(
      v.object({
        email: v.string(),
        legacyUserId: v.string(),
        clerkUserId: v.union(v.string(), v.null()),
        migrated: v.boolean()
      })
    )
  }),
  handler: async (
    ctx
  ): Promise<{
    seed: { inserted: number; skipped: number }
    lindaMerge: { merged: boolean; removedLegacyUser: boolean }
    clerkMigrations: Array<{
      email: string
      legacyUserId: string
      clerkUserId: string | null
      migrated: boolean
    }>
  }> => {
    const seed: { inserted: number; skipped: number } = await ctx.runMutation(
      internal.accountLinks.seedAccountLinks,
      {}
    )
    const lindaMerge: { merged: boolean; removedLegacyUser: boolean } =
      await ctx.runMutation(
        internal.accountLinks.mergeLindaDuplicateAccount,
        {}
      )

    const secretKey = process.env.CLERK_SECRET_KEY
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is not configured")
    }

    const clerk = createClerkClient({ secretKey })
    const clerkMigrations = []

    for (const target of CLERK_EMAIL_TARGETS) {
      const normalizedEmail = normalizeEmail(target.email)
      const users = await clerk.users.getUserList({
        emailAddress: [normalizedEmail],
        limit: 1
      })
      const clerkUser = users.data[0] ?? null

      if (!clerkUser) {
        clerkMigrations.push({
          email: normalizedEmail,
          legacyUserId: target.legacyUserId,
          clerkUserId: null,
          migrated: false
        })
        continue
      }

      const migrated: boolean = await ctx.runMutation(
        internal.accountLinks.migrateLegacyUserToClerkId,
        {
          legacyUserId: target.legacyUserId,
          clerkUserId: clerkUser.id,
          email: normalizedEmail
        }
      )

      clerkMigrations.push({
        email: normalizedEmail,
        legacyUserId: target.legacyUserId,
        clerkUserId: clerkUser.id,
        migrated
      })
    }

    return { seed, lindaMerge, clerkMigrations }
  }
})
