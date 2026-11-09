import { useCallback, useEffect, useRef, useState } from 'react'

export type Op = '+' | '-' | '×' | '÷'
export type CalcKey =
  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | ',' | 'AC' | '±' | '%' | '=' | Op

type State = {
  /** Texto exibido no display, com ponto decimal interno. */
  entry: string
  acc: number | null
  op: Op | null
  /** Próximo dígito começa um número novo. */
  fresh: boolean
  /** Dígitos digitados desde o último operador/AC (para checar o código). */
  typed: string
}

const INITIAL: State = { entry: '0', acc: null, op: null, fresh: true, typed: '' }
const MAX_DIGITS = 9

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b === 0 ? NaN : a / b
  }
}

/** Número → texto curto (até 9 dígitos significativos), sem notação estranha para contas simples. */
function toEntry(n: number): string {
  if (!Number.isFinite(n)) return 'Erro'
  const rounded = Number.parseFloat(n.toPrecision(MAX_DIGITS))
  const s = String(rounded)
  return s.includes('e') ? rounded.toExponential(3) : s
}

/**
 * Calculadora funcional do Modo Disfarce: soma, subtração, multiplicação e divisão.
 * Digitar o código e tocar em "=" (sem operação pendente) chama `onUnlock`.
 */
export function useCalculator(code: string, onUnlock?: () => void) {
  const [state, setState] = useState<State>(INITIAL)
  // Ref espelhando o estado: `press` pode ser chamado várias vezes no mesmo tick (timeline do GSAP).
  const ref = useRef<State>(INITIAL)
  const unlockRef = useRef(onUnlock)
  useEffect(() => {
    unlockRef.current = onUnlock
  }, [onUnlock])

  const commit = useCallback((next: State) => {
    ref.current = next
    setState(next)
  }, [])

  const press = useCallback(
    (key: CalcKey) => {
      const s = ref.current
      const error = s.entry === 'Erro'

      if (key === 'AC') return commit(INITIAL)

      if (/^\d$/.test(key)) {
        if (error || s.fresh)
          return commit({ ...s, entry: key, fresh: false, typed: s.typed + key })
        const digits = s.entry.replace(/[-.]/g, '')
        if (digits.length >= MAX_DIGITS) return
        const entry = s.entry === '0' ? key : s.entry + key
        return commit({ ...s, entry, typed: s.typed + key })
      }

      if (key === ',') {
        if (error || s.fresh) return commit({ ...s, entry: '0.', fresh: false })
        if (s.entry.includes('.')) return
        return commit({ ...s, entry: s.entry + '.' })
      }

      if (error) return

      if (key === '±') {
        if (s.entry === '0') return
        const entry = s.entry.startsWith('-') ? s.entry.slice(1) : '-' + s.entry
        return commit({ ...s, entry })
      }

      if (key === '%') {
        return commit({ ...s, entry: toEntry(Number.parseFloat(s.entry) / 100), fresh: true })
      }

      const current = Number.parseFloat(s.entry)

      if (key === '=') {
        // Código secreto: só os dígitos digitados, sem conta pendente.
        if (s.op === null && s.typed === code) {
          commit(INITIAL)
          unlockRef.current?.()
          return
        }
        if (s.op === null || s.acc === null) return commit({ ...s, fresh: true, typed: '' })
        const result = compute(s.acc, current, s.op)
        return commit({ entry: toEntry(result), acc: null, op: null, fresh: true, typed: '' })
      }

      // Operador
      const op = key as Op
      if (s.op !== null && s.acc !== null && !s.fresh) {
        const result = compute(s.acc, current, s.op)
        const entry = toEntry(result)
        return commit({
          entry,
          acc: Number.isFinite(result) ? result : null,
          op,
          fresh: true,
          typed: '',
        })
      }
      return commit({ ...s, acc: current, op, fresh: true, typed: '' })
    },
    [code, commit],
  )

  const reset = useCallback(() => commit(INITIAL), [commit])

  return { entry: state.entry, op: state.fresh ? state.op : null, press, reset }
}
