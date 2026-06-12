"use node"

import { createClerkClient } from "@clerk/backend"
import { v } from "convex/values"
import { action } from "./_generated/server"
import { internal } from "./_generated/api"
import { requireUserId } from "./lib/auth"

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export const addCollaboratorByEmail = action({
  args: {
    drawingId: v.string(),
    email: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const ownerUserId = await requireUserId(ctx)
    const normalizedEmail = normalizeEmail(args.email)

    const secretKey = process.env.CLERK_SECRET_KEY
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is not configured")
    }

    const clerk = createClerkClient({ secretKey })
    const users = await clerk.users.getUserList({
      emailAddress: [normalizedEmail],
      limit: 1
    })
    const targetUser = users.data[0]

    if (!targetUser) {
      throw new Error("User not found")
    }

    await ctx.runMutation(internal.drawings.insertCollaborator, {
      drawingId: args.drawingId,
      ownerUserId,
      collaboratorUserId: targetUser.id,
      collaboratorEmail: normalizedEmail
    })

    return null
  }
})
