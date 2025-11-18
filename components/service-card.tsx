import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  icon: LucideIcon
  description: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  elevated?: boolean
  accentColor?: string
}

export function ServiceCard({
  title,
  icon: Icon,
  description,
  primaryCta,
  secondaryCta,
  elevated = false,
  accentColor,
}: ServiceCardProps) {
  return (
    <Card
      className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        elevated ? "shadow-lg border-accent/50" : "shadow-sm"
      } bg-card border-border`}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-3 rounded-full bg-secondary/20 w-fit">
          <Icon className={`h-8 w-8 ${accentColor ? `text-[${accentColor}]` : "text-accent"}`} />
        </div>
        <CardTitle className="text-xl font-semibold text-card-foreground text-balance">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <CardDescription className="text-muted-foreground text-center leading-relaxed text-pretty">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-0">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </Button>
        {secondaryCta && (
          <Button
            asChild
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
