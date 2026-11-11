import clsx from 'clsx'

/**
 * Anéis concêntricos do hero (§6.19, variante `hero`): 12 anéis a cada 90px. Usados no hero e no CTA
 * final. `className` posiciona o SVG (2600×2600px, centrado no ponto que o chamador escolher).
 * `data-ring` marca cada anel (pulsação do CTA); `data-rings`, o conjunto (expansão com o scroll).
 */
export function HeroRings({ className }: { className?: string }) {
  const rings = Array.from({ length: 12 }, (_, i) => 150 + i * 90)
  const max = rings[rings.length - 1]
  return (
    <svg
      data-rings
      aria-hidden
      viewBox={`${-max - 2} ${-max - 2} ${max * 2 + 4} ${max * 2 + 4}`}
      className={clsx('pointer-events-none absolute h-[2600px] w-[2600px] -translate-x-1/2 -translate-y-1/2', className)}
      fill="none"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          data-ring
          r={r}
          stroke={`rgb(149 75 110 / ${(0.18 - (i * 0.1) / 11).toFixed(3)})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
