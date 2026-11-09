import clsx from 'clsx'

const SCALES = [1, 1.35, 1.75, 2.2, 2.7]

type RingsProps = {
  /** Raio do anel interno, em px. */
  r: number
  tone?: 'vinho' | 'white'
  className?: string
}

/**
 * 5 círculos concêntricos de linha fina (DESIGN.md §6.19). Centralizado no próprio box.
 * `data-ring` marca cada anel para o desenho e a pulsação da Fase 4.
 */
export function ConcentricRings({ r, tone = 'vinho', className }: RingsProps) {
  const max = r * SCALES[SCALES.length - 1]
  const size = max * 2 + 2
  return (
    <svg
      aria-hidden
      data-rings
      width={size}
      height={size}
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      className={clsx('pointer-events-none', className)}
      fill="none"
    >
      {SCALES.map((s) => (
        <circle
          key={s}
          data-ring
          r={r * s}
          stroke={tone === 'white' ? 'rgb(255 255 255 / 0.12)' : 'rgb(149 75 110 / 0.25)'}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
