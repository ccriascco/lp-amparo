import clsx from 'clsx'
import { RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { a11y, disfarce, ui } from '../../content/copy'
import { CalculatorScreen } from '../phone/CalculatorScreen'
import { HomeScreen } from '../phone/HomeScreen'
import { PhoneFrame } from '../ui/PhoneFrame'

/**
 * Calculadora que funciona de verdade (DESIGN.md §7.2). Digitar 1907 e "=" faz uma versão
 * mini do desbloqueio: a tela inicial se abre em círculo a partir da tecla "=".
 */
export function InteractiveCalculator({ className }: { className?: string }) {
  const [unlocked, setUnlocked] = useState(false)
  const [open, setOpen] = useState(false)
  const [round, setRound] = useState(0)

  // Abre o círculo no quadro seguinte para a transição de `clip-path` acontecer.
  useEffect(() => {
    if (!unlocked) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
    return () => cancelAnimationFrame(id)
  }, [unlocked])

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <PhoneFrame className="w-[240px] md:w-[260px]" screenClassName="bg-black">
        <div className="relative h-full w-full">
          {!unlocked && (
            <CalculatorScreen key={round} mode="interactive" onUnlock={() => setUnlocked(true)} />
          )}
          {unlocked && (
            <div
              role="img"
              aria-label={a11y.altHome}
              className="absolute inset-0 transition-[clip-path] duration-900 ease-[cubic-bezier(0.87,0,0.13,1)] motion-reduce:transition-none"
              style={{ clipPath: open ? 'circle(150% at 86% 91%)' : 'circle(0% at 86% 91%)' }}
            >
              <HomeScreen />
            </div>
          )}
        </div>
      </PhoneFrame>
      <div className="mt-6 flex min-h-12 items-center text-center" aria-live="polite">
        {unlocked ? (
          <button
            type="button"
            onClick={() => {
              setUnlocked(false)
              setOpen(false)
              setRound((r) => r + 1)
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-5 font-bold text-white hover:bg-white/15"
          >
            <RotateCcw className="size-4" />
            {ui.voltarCalculadora}
          </button>
        ) : (
          <p className="text-white/80">{disfarce.hint}</p>
        )}
      </div>
    </div>
  )
}
