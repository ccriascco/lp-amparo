import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Chip } from './Chip'

/** Container padrão (DESIGN.md §5): 1280px, gutter 20/32px. Bordas iguais em todas as seções. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={clsx('mx-auto w-full max-w-[1280px] px-5 md:px-8', className)}>{children}</div>
  )
}

/** Ritmo vertical entre seções (DESIGN.md §3.3). */
export const SECTION_Y = 'py-20 md:py-28'

type HeadingProps = {
  id: string
  children: ReactNode
  /** Rótulo do pilar acima do H2 (Proteger, Documentar...). */
  pillar?: string
  className?: string
  /** Para fundo escuro. */
  light?: boolean
}

/**
 * H2 de seção. `data-words` marca o título para a revelação por linhas (Fase 4, §7.9).
 */
export function SectionHeading({ id, children, pillar, className, light }: HeadingProps) {
  return (
    <>
      {pillar && (
        <Chip dot className="mb-5">
          {pillar}
        </Chip>
      )}
      <h2
        id={id}
        data-words
        className={clsx('display-l text-balance', light ? 'text-white' : 'text-texto', className)}
      >
        {children}
      </h2>
    </>
  )
}
