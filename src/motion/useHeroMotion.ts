import type { RefObject } from 'react'
import type { CalculatorHandle } from '../components/phone/CalculatorScreen'

/** Timeline do desbloqueio do hero (§7.1) — implementada na Fase 4. */
export function useHeroMotion(
  _root: RefObject<HTMLDivElement | null>,
  _calc: RefObject<CalculatorHandle | null>,
) {
  return { replay: () => {} }
}
