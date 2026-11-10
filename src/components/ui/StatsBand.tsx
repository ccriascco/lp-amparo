import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { Stat } from '../../content/copy'
import { formatNumber } from '../../lib/format'

type StatsBandProps = {
  id: string
  title: string
  stats: Stat[]
  /** Um ícone lucide por número, na mesma ordem. */
  icons: LucideIcon[]
  /** Índice do cartão em destaque (fundo `--grad-vinho`, textos brancos). */
  highlight: number
}

/**
 * Faixa de números em cartões (ajuste do cliente 10/11/2026, refs. Finexa/Curely; substitui as
 * colunas com divisória do §6.24): 4 cartões lado a lado (2×2 até 1024px), fundo branco, borda
 * `borda`, raio 20px, mesma altura; ícone num círculo vinho no topo, número em Quicksand
 * `tabular-nums` com contador (§7.3) e rótulo embaixo. Um cartão em destaque. Hover: sobe 4px
 * com `shadow-float`. Entrada com `appear` em stagger (§7.11).
 */
export function StatsBand({ id, title, stats, icons, highlight }: StatsBandProps) {
  return (
    <>
      <h2 id={id} data-appear className="font-display text-xl font-semibold tracking-[-0.01em]">
        {title}
      </h2>

      <ul
        data-appear-stagger
        className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-4 lg:grid-cols-4"
      >
        {stats.map((s, i) => {
          const hi = i === highlight
          const Icon = icons[i]
          const value = formatNumber(s.value, s.decimals ?? 0)
          return (
            <li key={s.label} className="min-w-0">
              <article
                className={clsx(
                  'flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-card-lg p-5 sm:p-7 md:min-h-[240px] lg:p-8',
                  'transition-[translate,box-shadow] duration-300 ease-amparo hover:-translate-y-1 hover:shadow-float',
                  hi ? 'text-white' : 'border border-borda bg-white',
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
                      'font-display text-[clamp(1.5rem,7.4vw,2.25rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap tabular-nums lg:text-[clamp(2.25rem,3.6vw,3.5rem)]',
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
                      'mt-3 max-w-[26ch] text-small text-pretty',
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
    </>
  )
}
