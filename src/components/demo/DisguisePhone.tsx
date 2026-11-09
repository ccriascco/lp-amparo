import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { a11y } from '../../content/copy'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { AppGridScreen } from '../phone/AppGridScreen'
import { CalculatorScreen, type CalculatorHandle } from '../phone/CalculatorScreen'
import { HomeScreen } from '../phone/HomeScreen'
import { MultitaskScreen } from '../phone/MultitaskScreen'
import type { CalcKey } from '../phone/useCalculator'
import { PhoneFrame } from '../ui/PhoneFrame'

const STEP_LABELS = [
  'Tela de apps do celular com o ícone de uma calculadora',
  'Calculadora fazendo a conta 12 × 3 = 36',
  a11y.altHome,
  'Tela de apps abertos mostrando apenas a calculadora',
]

/**
 * Celular do `#disfarce` (DESIGN.md §7.2): a tela muda conforme o passo ativo.
 * 0 grade de apps · 1 conta 12 × 3 = 36 · 2 código 1907 = → tela inicial · 3 multitarefa.
 */
export function DisguisePhone({ step, className }: { step: number; className?: string }) {
  const reduced = useReducedMotion()
  const calcA = useRef<CalculatorHandle>(null)
  const calcB = useRef<CalculatorHandle>(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    const timers: number[] = []
    const type = (ref: typeof calcA, keys: CalcKey[], gap: number, delay = 250) => {
      ref.current?.reset()
      if (reduced) return keys.forEach((k) => ref.current?.press(k))
      keys.forEach((k, i) =>
        timers.push(window.setTimeout(() => ref.current?.press(k), delay + i * gap)),
      )
    }
    if (step === 1) type(calcA, ['1', '2', '×', '3', '='], 170)
    if (step === 2) {
      // `setUnlocked` vem pelo `onUnlock` da calculadora ao tocar "=".
      timers.push(window.setTimeout(() => setUnlocked(false), 0))
      type(calcB, ['1', '9', '0', '7', '='], 220, 300)
    }
    return () => timers.forEach(clearTimeout)
  }, [step, reduced])

  const layer = (on: boolean) =>
    clsx(
      'absolute inset-0 transition-opacity duration-500 ease-amparo',
      on ? 'opacity-100' : 'opacity-0',
    )

  return (
    <PhoneFrame className={className} screenClassName="bg-black" label={STEP_LABELS[step]}>
      <div className="relative h-full w-full">
        <div className={layer(step === 0)}>
          <AppGridScreen />
        </div>
        <div className={layer(step === 1)}>
          <CalculatorScreen mode="auto" ref={calcA} />
        </div>
        <div className={layer(step === 2 && !unlocked)}>
          <CalculatorScreen mode="auto" ref={calcB} onUnlock={() => setUnlocked(true)} />
        </div>
        <div className={layer(step === 2 && unlocked)}>
          <HomeScreen />
        </div>
        <div className={layer(step === 3)}>
          <MultitaskScreen />
        </div>
      </div>
    </PhoneFrame>
  )
}
