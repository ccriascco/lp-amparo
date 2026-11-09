import clsx from 'clsx'
import { Check, Clock, Plus } from 'lucide-react'
import simbolo from '../../assets/brand/amparo-simbolo.svg'
import { app } from '../../content/copy'

const SIZE = 360
const C = SIZE / 2
const RADIUS = 128
const ANGLES = [-90, -18, 54, 126, 198]

const nodes = ANGLES.map((deg, i) => {
  const a = (deg * Math.PI) / 180
  return { x: C + RADIUS * Math.cos(a), y: C + RADIUS * Math.sin(a), person: app.rede[i] }
})

/**
 * Rede de apoio (DESIGN.md §7.4): símbolo no centro e até 5 guardiãs em órbita.
 * As 3 primeiras são as da tela do app; as outras 2 são vagas livres ("até 5").
 * `data-net-line` e `data-net-node` são animados na Fase 4.
 */
export function NetworkGraph({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Rede de apoio: Ana Beatriz (guardiã principal) e Rafaela confirmaram, Lúcia recebeu o convite e há mais duas vagas."
      className={clsx('relative aspect-square w-full max-w-[360px]', className)}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden>
        <circle
          cx={C}
          cy={C}
          r={RADIUS}
          fill="none"
          stroke="rgb(149 75 110 / 0.14)"
          strokeDasharray="2 6"
        />
        {nodes.map((n, i) => (
          <line
            key={i}
            data-net-line
            x1={C}
            y1={C}
            x2={n.x}
            y2={n.y}
            stroke={n.person ? 'var(--color-vinho)' : 'rgb(149 75 110 / 0.3)'}
            strokeWidth={n.person ? 1.75 : 1.25}
            strokeDasharray={n.person ? undefined : '4 5'}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Centro: símbolo do Amparo */}
      <span className="absolute top-1/2 left-1/2 grid size-[23%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-borda bg-white shadow-float">
        <img src={simbolo} alt="" className="h-[46%] w-auto" />
      </span>

      {nodes.map((n, i) => {
        const p = n.person
        return (
          <span
            key={i}
            data-net-node
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${(n.x / SIZE) * 100}%`, top: `${(n.y / SIZE) * 100}%` }}
          >
            {p ? (
              <span
                className={clsx(
                  'relative grid size-[52px] place-items-center rounded-full border border-borda bg-white font-bold text-vinho-profundo shadow-[0_8px_20px_-10px_rgb(75_42_63/0.35)]',
                  p.principal && 'ring-2 ring-vinho ring-offset-2 ring-offset-white',
                )}
              >
                {p.initials}
                <span
                  data-net-check={p.confirmed ? '' : undefined}
                  className={clsx(
                    'absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full border-2 border-white',
                    p.confirmed ? 'bg-confirma text-white' : 'bg-superficie text-texto-secundario',
                  )}
                >
                  {p.confirmed ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <Clock className="size-3" strokeWidth={2.5} />
                  )}
                </span>
              </span>
            ) : (
              <span className="grid size-[46px] place-items-center rounded-full border-[1.5px] border-dashed border-vinho/40 bg-white/70 text-vinho/70">
                <Plus className="size-4" strokeWidth={2.25} />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
