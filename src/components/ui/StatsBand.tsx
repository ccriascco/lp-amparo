import clsx from 'clsx'
import type { Stat } from '../../content/copy'
import { formatNumber } from '../../lib/format'

type StatsBandProps = {
  id: string
  title: string
  stats: Stat[]
  source: string
}

/**
 * Faixa de números (DESIGN.md §6.24, padrão FitPay/Eduzz): 4 colunas separadas por fios verticais
 * `borda` (2×2 no celular), título curto à esquerda acima e a fonte à direita abaixo.
 * `data-count` alimenta o contador (§7.3, em `useSiteMotion`); o texto inicial já é o valor final,
 * que é o que fica com movimento reduzido.
 */
export function StatsBand({ id, title, stats, source }: StatsBandProps) {
  return (
    <>
      <h2 id={id} data-appear className="font-display text-xl font-semibold tracking-[-0.01em]">
        {title}
      </h2>

      <ul data-appear-stagger className="mt-8 grid grid-cols-2 md:mt-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <li
            key={s.label}
            className={clsx(
              'flex min-w-0 flex-col gap-3 md:gap-4',
              // celular (2×2): fio vertical na 2ª coluna e horizontal na 2ª linha
              i % 2 === 1 && 'border-l border-borda pl-5',
              i % 2 === 0 && 'pr-5',
              i >= 2 && 'mt-7 border-t border-borda pt-7',
              // a partir de 768px: uma linha, fio vertical entre todas as colunas
              'md:mt-0 md:border-t-0 md:pt-0 md:pr-6 lg:pr-8',
              i > 0 ? 'md:border-l md:pl-6 lg:pl-8' : 'md:border-l-0 md:pl-0',
            )}
          >
            <p className="font-display text-[clamp(2rem,10vw,2.75rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap text-vinho tabular-nums md:text-[clamp(2.25rem,5vw,4rem)]">
              {/* Leitores de tela leem só o valor final, nunca a contagem. */}
              <span className="sr-only">
                {formatNumber(s.value, s.decimals ?? 0)}
                {s.suffix}
              </span>
              <span aria-hidden>
                <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                  {formatNumber(s.value, s.decimals ?? 0)}
                </span>
                {s.suffix}
              </span>
            </p>
            <p className="max-w-[24ch] text-small text-pretty text-texto-secundario lg:max-w-[28ch]">
              {/* hífen que não quebra ("ex‑companheiros"); o texto do COPY não muda */}
              {s.label.replaceAll('-', '‑')}
            </p>
          </li>
        ))}
      </ul>

      <p data-appear className="mt-8 caption font-normal text-texto-secundario md:text-right">
        {source}
      </p>
    </>
  )
}
