"use client"

interface ErrorMessageProps {
  error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <p className="w-full text-center text-balance leading-snug wrap-break-word">
      {error}
    </p>
  )
}
