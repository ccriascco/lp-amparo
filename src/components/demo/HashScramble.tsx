import clsx from 'clsx'

/**
 * Hash de integridade (DESIGN.md §6.12) em Nunito Sans com `tabular-nums` (nunca monospace).
 * O embaralhamento ao entrar na tela é feito na Fase 4 (`data-hash`).
 */
export function HashScramble({ text, className }: { text: string; className?: string }) {
  return (
    <span data-hash={text} className={clsx('tracking-wide tabular-nums', className)}>
      {text}
    </span>
  )
}
