"use client"

import { useRouter } from "next/navigation"

import { SIGN_IN_PATH } from "@/lib/auth-routes"

export default function SignInButton() {
  const router = useRouter()

  return (
    <button
      className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      onClick={() => router.push(SIGN_IN_PATH)}
    >
      Sign In to Start Drawing
    </button>
  )
}
