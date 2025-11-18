import type React from "react"
interface QuoteProps {
  children: React.ReactNode
  className?: string
}

export function Quote({ children, className = "" }: QuoteProps) {
  return <blockquote className={`quote-callout ${className}`}>{children}</blockquote>
}
