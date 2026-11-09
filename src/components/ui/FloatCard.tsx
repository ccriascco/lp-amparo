import clsx from 'clsx'
import type { ReactNode } from 'react'

type FloatCardProps = {
  icon: ReactNode
  title: ReactNode
  text?: ReactNode
  /** `confirma`: círculo do ícone em verde a 12% (confirmações). */
  tone?: 'default' | 'confirma'
  className?: string
}

/**
 * Cartão flutuante ao redor do celular (DESIGN.md §6.6): branco, `r-card`, `shadow-float`.
 * `data-float` marca a flutuação lenta da Fase 4.
 */
export function FloatCard({ icon, title, text, tone = 'default', className }: FloatCardProps) {
  return (
    <div
      data-float
      className={clsx(
        'flex items-center gap-3 rounded-card border border-borda/60 bg-white p-4 shadow-float',
        className,
      )}
    >
      <span
        className={clsx(
          'grid size-9 shrink-0 place-items-center rounded-full [&>svg]:size-[18px]',
          tone === 'confirma' ? 'bg-confirma/12 text-confirma' : 'bg-superficie text-vinho',
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[0.9375rem] leading-tight font-bold text-texto">{title}</span>
        {text && (
          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-texto-secundario">
            {text}
          </span>
        )}
      </span>
    </div>
  )
}

/** Avatar com iniciais (as guardiãs do app). */
export function Initials({
  children,
  className,
  ring,
}: {
  children: ReactNode
  className?: string
  ring?: boolean
}) {
  return (
    <span
      className={clsx(
        'grid shrink-0 place-items-center rounded-full bg-superficie font-bold text-vinho-profundo',
        ring && 'ring-2 ring-vinho ring-offset-2 ring-offset-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
