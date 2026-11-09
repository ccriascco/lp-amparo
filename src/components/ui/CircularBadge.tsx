import clsx from 'clsx'
import { useId } from 'react'
import simbolo from '../../assets/brand/amparo-simbolo.svg'
import simboloBranco from '../../assets/brand/amparo-simbolo-branco.svg'

const TEXT = 'Você não está sozinha • Você não está sozinha • '

/**
 * Selo circular com o lema girando em volta do símbolo (DESIGN.md §6.20).
 * `data-badge-spin` é o anel de texto que gira na Fase 4.
 */
export function CircularBadge({
  onPhoto,
  className,
}: {
  /** Sobre foto: `.glass` e texto branco. */
  onPhoto?: boolean
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  return (
    <div
      aria-hidden
      data-badge
      className={clsx(
        'relative grid size-24 place-items-center rounded-full md:size-32',
        onPhoto ? 'text-white glass' : 'border border-borda bg-white text-vinho-profundo',
        className,
      )}
    >
      <svg data-badge-spin viewBox="0 0 128 128" className="absolute inset-0 size-full">
        <defs>
          <path id={id} d="M64,64 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0" />
        </defs>
        <text
          fill="currentColor"
          className="font-sans"
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em' }}
        >
          <textPath href={`#${id}`} textLength={306} lengthAdjust="spacing">
            {TEXT}
          </textPath>
        </text>
      </svg>
      <img src={onPhoto ? simboloBranco : simbolo} alt="" className="h-[34%] w-auto" />
    </div>
  )
}
