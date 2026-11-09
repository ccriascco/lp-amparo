import clsx from 'clsx'
import { Check, RotateCcw, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { sos, ui } from '../../content/copy'

const HOLD_MS = 2500
const RELEASE_MS = 450
const R = 92
const C = 2 * Math.PI * R

/**
 * Botão SOS demonstrativo (DESIGN.md §6.11): segurar por 2,5s enche o anel.
 * Soltar antes faz o anel voltar. Nada é enviado.
 */
export function SOSDemo({ onComplete }: { onComplete?: () => void }) {
  const [state, setState] = useState<'idle' | 'holding' | 'done'>('idle')
  const ring = useRef<SVGCircleElement>(null)
  const progress = useRef(0)
  const holding = useRef(false)
  const raf = useRef(0)
  const last = useRef(0)
  const completeRef = useRef(onComplete)
  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  const paint = () => {
    if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - progress.current))
  }

  const tick = (t: number) => {
    const dt = last.current ? t - last.current : 16
    last.current = t
    if (holding.current) {
      progress.current = Math.min(1, progress.current + dt / HOLD_MS)
      paint()
      if (progress.current >= 1) {
        holding.current = false
        setState('done')
        navigator.vibrate?.(30)
        completeRef.current?.()
        return
      }
    } else {
      progress.current = Math.max(0, progress.current - dt / RELEASE_MS)
      paint()
      if (progress.current <= 0) return
    }
    raf.current = requestAnimationFrame(tick)
  }

  const loop = () => {
    cancelAnimationFrame(raf.current)
    last.current = 0
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const start = () => {
    if (state === 'done') return
    holding.current = true
    setState('holding')
    loop()
  }
  const stop = () => {
    if (!holding.current) return
    holding.current = false
    setState('idle')
    loop()
  }
  const reset = () => {
    progress.current = 0
    paint()
    setState('idle')
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== ' ' && e.key !== 'Enter') return
    e.preventDefault()
    if (!e.repeat) start()
  }
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key !== ' ' && e.key !== 'Enter') return
    e.preventDefault()
    stop()
  }

  const done = state === 'done'

  return (
    <div className="flex flex-col items-center">
      <div className="relative grid size-[200px] place-items-center">
        <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            strokeWidth="6"
            stroke="rgb(198 40 40 / 0.14)"
          />
          <circle
            ref={ring}
            cx="100"
            cy="100"
            r={R}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            stroke={done ? 'var(--color-confirma)' : 'var(--color-sos)'}
            strokeDasharray={C}
            strokeDashoffset={C}
            className="transition-[stroke] duration-300"
          />
        </svg>
        <button
          type="button"
          data-sos-button
          aria-label={sos.demoAria}
          aria-describedby="sos-demo-status"
          disabled={done}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            start()
          }}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={stop}
          className={clsx(
            'relative grid size-40 touch-manipulation place-items-center rounded-full bg-sos text-white transition-transform duration-200 ease-amparo select-none',
            state === 'holding' && 'scale-[0.97]',
            'disabled:cursor-default',
          )}
          style={{ boxShadow: 'var(--shadow-sos)', WebkitTouchCallout: 'none' }}
        >
          <span className="flex flex-col items-center">
            {done ? (
              <Check className="size-10" strokeWidth={2.5} />
            ) : (
              <TriangleAlert className="size-9" strokeWidth={2.25} />
            )}
            <span className="mt-1 font-display text-[2.25rem] leading-none font-bold">SOS</span>
          </span>
        </button>
      </div>
      <p
        id="sos-demo-status"
        aria-live="polite"
        className={clsx(
          'mt-5 min-h-6 text-center font-semibold',
          done ? 'text-confirma' : 'text-texto-secundario',
        )}
      >
        {done ? sos.demoDone : sos.demoLabel}
      </p>
      {done && (
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-bold text-vinho hover:bg-superficie"
        >
          <RotateCcw className="size-4" />
          {ui.testarDeNovo}
        </button>
      )}
    </div>
  )
}
