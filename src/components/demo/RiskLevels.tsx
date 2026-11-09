import clsx from 'clsx'
import { TriangleAlert } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { app, risco } from '../../content/copy'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { RichText } from '../ui/RichText'

// Níveis só em tons de vinho — nunca semáforo (DESIGN.md §6.13).
const LEVEL_BG = ['bg-vinho/25', 'bg-vinho', 'bg-vinho-profundo']

/**
 * Leitura de risco (DESIGN.md §6.13): controle segmentado + cartão do app.
 * Avança sozinho a cada 4s até a primeira interação (e nunca com movimento reduzido).
 */
export function RiskLevels() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduced = useReducedMotion()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const root = useRef<HTMLDivElement>(null)
  const visible = useRef(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || reduced) return
    const t = window.setInterval(() => {
      if (visible.current) setActive((a) => (a + 1) % risco.levels.length)
    }, 4000)
    return () => window.clearInterval(t)
  }, [auto, reduced])

  const select = (i: number, focus = false) => {
    setAuto(false)
    setActive(i)
    if (focus) tabs.current[i]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const n = risco.levels.length
    if (e.key === 'ArrowRight') select((active + 1) % n, true)
    else if (e.key === 'ArrowLeft') select((active - 1 + n) % n, true)
    else if (e.key === 'Home') select(0, true)
    else if (e.key === 'End') select(n - 1, true)
    else return
    e.preventDefault()
  }

  const level = risco.levels[active]

  return (
    <div ref={root} className="w-full max-w-[520px]" onPointerEnter={() => setAuto(false)}>
      <div
        role="tablist"
        aria-label="Níveis de risco"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-1 rounded-full border border-borda bg-white p-1.5"
      >
        {risco.levels.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              tabs.current[i] = el
            }}
            role="tab"
            type="button"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-p`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className={clsx(
              'h-11 rounded-full text-[0.9375rem] font-bold transition-colors duration-250',
              i === active ? 'bg-vinho text-white' : 'text-texto-secundario hover:text-vinho',
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Cartão no estilo do app */}
      <div
        id={`${id}-p`}
        role="tabpanel"
        aria-labelledby={`${id}-t${active}`}
        className="mt-5 rounded-card-lg border border-borda bg-white p-6 shadow-float md:p-7"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-superficie text-vinho">
            <TriangleAlert className="size-[18px]" strokeWidth={2} />
          </span>
          <p className="font-display text-[1.375rem] font-semibold tracking-[-0.01em]">
            {app.home.risco.title}
          </p>
          <span className="rounded-full bg-superficie px-2.5 py-1 text-xs leading-none font-bold text-vinho">
            {app.home.risco.badge}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden>
          {risco.levels.map((l, i) => (
            <div key={l.id} className="flex flex-col items-center gap-2.5">
              <span
                className={clsx(
                  'text-[0.9375rem] transition-colors duration-250',
                  i === active ? 'font-bold text-vinho-profundo' : 'text-texto-secundario',
                )}
              >
                {l.label}
              </span>
              <span
                className={clsx(
                  'w-full rounded-full transition-all duration-250',
                  i === active ? `h-2 ${LEVEL_BG[i]}` : 'h-1 bg-superficie',
                )}
              />
            </div>
          ))}
        </div>

        <p key={level.id} className="mt-6 min-h-[4.8em] animate-fade-in text-texto-secundario">
          <RichText parts={level.text} />
        </p>
      </div>
    </div>
  )
}
