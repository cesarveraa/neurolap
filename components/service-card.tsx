import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  icon: LucideIcon
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  elevated?: boolean
  accentColor?: string
}

export function ServiceCard({ title, icon: Icon, description, primaryCta, secondaryCta }: ServiceCardProps) {
  return (
    <article className="grid gap-3 border-b border-border py-6 first:pt-0 sm:grid-cols-[3rem_1fr] sm:gap-5">
      <Icon aria-hidden="true" className="h-7 w-7 text-primary sm:mt-1" strokeWidth={1.7} />
      <div>
        <h3 className="mb-2 text-[22px] font-semibold text-foreground">{title}</h3>
        <p className="mb-3 max-w-[62ch] text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="min-h-11 border-primary bg-transparent text-primary hover:bg-primary/10">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {secondaryCta && (
            <Button asChild className="min-h-11 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
