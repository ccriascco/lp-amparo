import { Fragment } from 'react'
import type { Lead, Rich } from '../../content/copy'

/** Renderiza um trecho do COPY.md com ênfases (`**negrito**`, `*itálico*`). */
export function RichText({ parts, strongClassName }: { parts: Rich; strongClassName?: string }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <Fragment key={i}>{p}</Fragment>
        ) : 'strong' in p ? (
          <strong key={i} className={strongClassName ?? 'font-bold'}>
            {p.strong}
          </strong>
        ) : (
          <em key={i}>{p.em}</em>
        ),
      )}
    </>
  )
}

/** "**Início em negrito** e o resto do texto." */
export function LeadText({ item, strongClassName }: { item: Lead; strongClassName?: string }) {
  return (
    <>
      <strong className={strongClassName ?? 'font-bold text-texto'}>{item.strong}</strong>
      {item.rest}
    </>
  )
}
