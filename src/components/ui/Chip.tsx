import clsx from 'clsx'
import type { ReactNode } from 'react'

type Variant = 'soft' | 'glass' | 'outline'

type ChipProps = {
  variant?: Variant
  /** Ponto de 6px `vinho` à esquerda — usado nos rótulos dos pilares. */
  dot?: boolean
  icon?: ReactNode
  children: ReactNode
  className?: string
  as?: 'span' | 'li'
}

const variants: Record<Variant, string> = {
  soft: 'bg-superficie text-vinho-profundo',
  // Sobre foto ou gradiente (DESIGN.md §6.7).
  glass: 'border border-white/60 bg-white/50 text-vinho-profundo backdrop-blur-md',
  outline: 'border border-borda text-vinho-profundo',
}

/** Chip / pílula (DESIGN.md §6.7). */
export function Chip({ variant = 'soft', dot, icon, children, className, as = 'span' }: ChipProps) {
  const Tag = as
  return (
    <Tag
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 caption',
        variants[variant],
        className,
      )}
    >
      {dot && <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-vinho" />}
      {icon && <span className="flex shrink-0 text-vinho [&>svg]:size-4">{icon}</span>}
      {children}
    </Tag>
  )
}
