import clsx from 'clsx'
import type { Stat } from '../../content/copy'
import { formatNumber } from '../../lib/format'
import { TintedPhoto, type ImageSlot } from './TintedPhoto'

type StatCardProps = {
  stat: Stat
  /** `destaque`: gradiente vinho (uma por grupo). `foto`: foto tingida de fundo. */
  variant?: 'default' | 'destaque' | 'foto'
  photo?: ImageSlot
  /** Número em texto, quando não é contador (ex.: "Random Forest"). */
  valueText?: string
  className?: string
}

/**
 * Cartão de número (DESIGN.md §6.8, ref. Finexa). Número no topo, rótulo na base.
 * `data-count` + `data-decimals` alimentam o contador da Fase 4 (§7.3).
 */
export function StatCard({
  stat,
  variant = 'default',
  photo,
  valueText,
  className,
}: StatCardProps) {
  const dark = variant !== 'default'
  const content = (
    <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between gap-8 p-6 md:p-8">
      <p
        className={clsx(
          'font-display leading-none font-medium tracking-[-0.04em] tabular-nums',
          valueText
            ? 'text-[clamp(1.6rem,6vw,2.25rem)] lg:text-[clamp(2rem,2.6vw,2.6rem)]'
            : 'text-[clamp(1.6rem,7.2vw,2.6rem)] lg:text-[clamp(2.8rem,4.2vw,4.25rem)]',
          dark ? 'text-white' : 'text-texto',
        )}
      >
        {valueText ?? (
          <>
            <span data-count={stat.value} data-decimals={stat.decimals ?? 0}>
              {formatNumber(stat.value, stat.decimals ?? 0)}
            </span>
            {stat.suffix}
          </>
        )}
      </p>
      <p
        className={clsx(
          'max-w-[24ch] text-small',
          dark ? 'text-white/85' : 'text-texto-secundario',
        )}
      >
        {stat.label}
      </p>
    </div>
  )

  if (variant === 'foto' && photo) {
    return (
      <TintedPhoto
        slot={photo}
        sizes="(min-width: 1024px) 25vw, 50vw"
        className={clsx('rounded-card-lg', className)}
      >
        {content}
      </TintedPhoto>
    )
  }

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-card-lg',
        variant === 'destaque' ? 'text-white' : 'border border-borda bg-white',
        className,
      )}
      style={variant === 'destaque' ? { background: 'var(--grad-vinho)' } : undefined}
    >
      {content}
    </div>
  )
}
