import clsx from 'clsx'
import { Phone } from 'lucide-react'
import { emergencia } from '../../content/copy'

/**
 * Faixa de emergência (DESIGN.md §6.15, COPY.md 3.17): 190 e 180 sempre como links `tel:`.
 * `compact`: versão do topo do FAQ.
 */
export function EmergencyBar({
  compact,
  subtle,
  className,
}: {
  compact?: boolean
  /** Dentro do rodapé (já vinho profundo): fundo branco a 6% com borda. */
  subtle?: boolean
  className?: string
}) {
  const items = [emergencia.perigo, emergencia.orientacao]
  return (
    <aside
      aria-label="Telefones de emergência"
      className={clsx(
        'on-dark text-white/80',
        subtle ? 'border border-white/10 bg-white/[0.06]' : 'bg-vinho-profundo',
        compact ? 'rounded-card px-5 py-4 md:px-6' : 'rounded-card-lg px-6 py-6 md:px-8',
        className,
      )}
    >
      <ul
        className={clsx(
          'flex flex-col gap-3',
          compact ? 'text-small lg:flex-row lg:gap-8' : 'md:flex-row md:items-center md:gap-10',
        )}
      >
        {items.map((it) => (
          <li key={it.number} className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white"
            >
              <Phone className="size-4" strokeWidth={2} />
            </span>
            <span>
              {it.before}
              <a
                href={`tel:${it.number}`}
                className={clsx(
                  'font-display font-bold text-white underline-offset-4 hover:underline',
                  compact ? 'text-[1.125rem]' : 'text-[1.375rem]',
                )}
              >
                {it.number}
              </a>
              {it.after}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
