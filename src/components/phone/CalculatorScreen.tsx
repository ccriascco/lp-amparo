import clsx from 'clsx'
import { useImperativeHandle, type KeyboardEvent, type Ref } from 'react'
import { DEMO_CODE } from '../../lib/config'
import { formatCalc } from '../../lib/format'
import { useCalculator, type CalcKey } from './useCalculator'

export type CalculatorHandle = {
  /** Pressiona uma tecla (usado pela timeline do hero no modo `auto`). */
  press: (key: CalcKey) => void
  reset: () => void
}

type CalculatorScreenProps = {
  /**
   * `auto`: decorativa, controlada pela timeline (teclas sem foco).
   * `interactive`: funciona de verdade; digitar o código + "=" chama `onUnlock`.
   */
  mode?: 'auto' | 'interactive'
  /**
   * Visor logo abaixo da ilha e teclado em seguida (sem o espaço preto do visor).
   * Usado no hero, onde só a parte de cima do celular aparece acima da dobra.
   */
  compact?: boolean
  onUnlock?: () => void
  ref?: Ref<CalculatorHandle>
}

type KeyDef = {
  key: CalcKey
  label: string
  aria: string
  tone: 'fn' | 'num' | 'op'
  wide?: boolean
}

// Layout e cores da tela modo-disfarce-calculadora.png.
const KEYS: KeyDef[] = [
  { key: 'AC', label: 'AC', aria: 'Limpar', tone: 'fn' },
  { key: '±', label: '+/−', aria: 'Inverter sinal', tone: 'fn' },
  { key: '%', label: '%', aria: 'Porcentagem', tone: 'fn' },
  { key: '÷', label: '÷', aria: 'Dividir', tone: 'op' },
  { key: '7', label: '7', aria: '7', tone: 'num' },
  { key: '8', label: '8', aria: '8', tone: 'num' },
  { key: '9', label: '9', aria: '9', tone: 'num' },
  { key: '×', label: '×', aria: 'Multiplicar', tone: 'op' },
  { key: '4', label: '4', aria: '4', tone: 'num' },
  { key: '5', label: '5', aria: '5', tone: 'num' },
  { key: '6', label: '6', aria: '6', tone: 'num' },
  { key: '-', label: '−', aria: 'Subtrair', tone: 'op' },
  { key: '1', label: '1', aria: '1', tone: 'num' },
  { key: '2', label: '2', aria: '2', tone: 'num' },
  { key: '3', label: '3', aria: '3', tone: 'num' },
  { key: '+', label: '+', aria: 'Somar', tone: 'op' },
  { key: '0', label: '0', aria: '0', tone: 'num', wide: true },
  { key: ',', label: ',', aria: 'Vírgula', tone: 'num' },
  { key: '=', label: '=', aria: 'Igual', tone: 'op' },
]

const TONES = {
  fn: 'bg-calc-claro text-black',
  num: 'bg-calc-cinza text-white',
  op: 'bg-calc-laranja text-white',
}

const KEYBOARD: Record<string, CalcKey> = {
  '+': '+',
  '-': '-',
  '*': '×',
  x: '×',
  '/': '÷',
  '=': '=',
  Enter: '=',
  ',': ',',
  '.': ',',
  Escape: 'AC',
  Delete: 'AC',
  '%': '%',
}

/**
 * Réplica da calculadora do Modo Disfarce (DESIGN.md §6.4), desenhada em 390×845.
 * Use dentro de `PhoneFrame` (com `screenClassName="bg-black"`).
 */
export function CalculatorScreen({
  mode = 'interactive',
  compact,
  onUnlock,
  ref,
}: CalculatorScreenProps) {
  const { entry, op, press, reset } = useCalculator(DEMO_CODE, onUnlock)
  useImperativeHandle(ref, () => ({ press, reset }), [press, reset])

  const interactive = mode === 'interactive'
  const shown = formatCalc(entry)
  // Encolhe a fonte quando o número cresce (como no app).
  const len = shown.replace(/[-,]/g, '').length
  const fontSize = len <= 6 ? 84 : len <= 7 ? 74 : len <= 8 ? 66 : 58

  const onKeyDown = (e: KeyboardEvent) => {
    if (!interactive || e.metaKey || e.ctrlKey || e.altKey) return
    const k = /^\d$/.test(e.key) ? (e.key as CalcKey) : KEYBOARD[e.key]
    if (!k) return
    e.preventDefault()
    press(k)
  }

  return (
    <div
      className="relative flex h-full w-full flex-col bg-calc-preto font-sans text-white select-none"
      onKeyDown={onKeyDown}
    >
      {/* Display */}
      <div
        className={clsx(
          'flex items-end justify-end px-[34px] pb-[10px]',
          compact ? 'h-[150px] flex-none' : 'flex-1',
        )}
      >
        <output
          data-calc-display
          aria-live={interactive ? 'polite' : undefined}
          aria-label={interactive ? `Visor: ${shown}` : undefined}
          className="block leading-none font-normal tracking-[-0.02em] tabular-nums"
          style={{ fontSize }}
        >
          {shown}
        </output>
      </div>

      {/* Teclado: 4 colunas, teclas em pílula como na tela do app */}
      <div
        className="grid grid-cols-4 gap-x-3 gap-y-[11.5px] px-[15.5px] pb-[36px]"
        role={interactive ? 'group' : undefined}
        aria-label={interactive ? 'Teclado da calculadora' : undefined}
      >
        {KEYS.map((k) => {
          const activeOp = k.tone === 'op' && k.key !== '=' && op === k.key
          return (
            <button
              key={k.key}
              type="button"
              data-key={k.key}
              tabIndex={interactive ? 0 : -1}
              aria-hidden={interactive ? undefined : true}
              aria-label={k.aria}
              aria-pressed={k.tone === 'op' && k.key !== '=' && interactive ? activeOp : undefined}
              onClick={interactive ? () => press(k.key) : undefined}
              className={clsx(
                'flex h-[72.5px] items-center rounded-full text-[30px] leading-none transition-[filter,background-color,color] duration-150',
                k.wide ? 'col-span-2 justify-start pl-[30px]' : 'justify-center',
                activeOp ? 'bg-white text-calc-laranja' : TONES[k.tone],
                interactive && 'cursor-pointer hover:brightness-125 active:brightness-150',
                interactive &&
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
              )}
            >
              {k.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
