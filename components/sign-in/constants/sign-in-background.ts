export const SIGN_IN_BACKGROUND_STORAGE_KEY = "bitarium:sign-in-background:v1"

export type SignInBackgroundId = "gray" | "black"

export const SIGN_IN_BACKGROUND_GRAY = "#191919"
export const SIGN_IN_BACKGROUND_BLACK = "#000000"

export const SIGN_IN_BACKGROUNDS: Record<
  SignInBackgroundId,
  { label: string; color: string; swatchClassName: string }
> = {
  gray: {
    label: "Dark gray background",
    color: SIGN_IN_BACKGROUND_GRAY,
    swatchClassName: "bg-[#191919]"
  },
  black: {
    label: "Black background",
    color: SIGN_IN_BACKGROUND_BLACK,
    swatchClassName: "bg-black"
  }
}

export function getSignInBackgroundColor(id: SignInBackgroundId): string {
  return SIGN_IN_BACKGROUNDS[id].color
}

export function isSignInBackgroundId(
  value: string
): value is SignInBackgroundId {
  return value === "gray" || value === "black"
}
