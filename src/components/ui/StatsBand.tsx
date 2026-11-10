import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { Stat } from '../../content/copy'
import { formatNumber } from '../../lib/format'

type StatsBandProps = {
  stats: Stat[]
  /** Um ícone lucide por número, na mesma ordem. */
  icons: LucideIcon[]
  /** Índice do cartão em destaque (fundo `--grad-vinho`, textos brancos). */
  highlight: number
  className?: string
}

/**
 * Cartões de número em 2×2 (ajustes 2 e 3 do cliente, 10/11/2026; refs. Finexa/Curely; substitui
 * as colunas com divisória do §6.24). Cartões brancos com sombra suave sobre o shell rosado, ícone
 * num círculo vinho no topo, número Quicksand `tabular-nums` com contador (§7.3) e rótulo de até
 * 2 linhas embaixo. Um cartão em destaque. Hover: sobe 4px com `shadow-float`. Entrada com
 * `appear` em stagger (§7.11).
 */
export function StatsBand({ stats, icons, highlight, className }: StatsBandProps) {
  return (
    <ul data-appear-stagger className={clsx('grid grid-cols-2 gap-3 md:gap-4', className)}>
      {stats.map((s, i) => {
        const hi = i === highlight
        const Icon = icons[i]
        const value = formatNumber(s.value, s.decimals ?? 0)
        return (
          <li key={s.label} className="min-w-0">
            <article
              className={clsx(
                'flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-card-lg p-5 sm:p-8 md:min-h-[230px]',
                'transition-[translate,box-shadow] duration-300 ease-amparo hover:-translate-y-1 hover:shadow-float',
                hi ? 'text-white' : 'border border-borda bg-white shadow-[var(--shadow-card)]',
              )}
              style={hi ? { background: 'var(--grad-vinho)' } : undefined}
            >
              <span
                className={clsx(
                  'grid size-10 place-items-center rounded-full text-white',
                  hi ? 'bg-white/15' : 'bg-vinho',
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p
                  className={clsx(
                    'font-display text-[clamp(1.5rem,7.4vw,2.5rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap tabular-nums lg:text-[clamp(2.75rem,4.4vw,4rem)]',
                    hi ? 'text-white' : 'text-texto',
                  )}
                >
                  {/* Leitores de tela leem só o valor final, nunca a contagem. */}
                  <span className="sr-only">
                    {value}
                    {s.suffix}
                  </span>
                  <span aria-hidden>
                    <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                      {value}
                    </span>
                    {s.suffix}
                  </span>
                </p>
                <p
                  className={clsx(
                    'mt-3 text-small text-pretty',
                    hi ? 'text-white/85' : 'text-texto-secundario',
                  )}
                >
                  {/* hífen que não quebra ("ex‑companheiros"); o texto do COPY não muda */}
                  {s.label.replaceAll('-', '‑')}
                </p>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
