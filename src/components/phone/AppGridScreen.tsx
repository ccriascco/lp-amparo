import { app } from '../../content/copy'

/** Ícone da calculadora (como aparece com o Modo Disfarce ligado). */
export function CalculatorIcon({ size = 62 }: { size?: number }) {
  return (
    <span
      className="grid grid-cols-3 gap-[3px] rounded-[22%] bg-calc-preto p-[18%]"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className={
            i % 3 === 2
              ? 'rounded-full bg-calc-laranja'
              : i < 3
                ? 'rounded-full bg-calc-claro'
                : 'rounded-full bg-calc-cinza'
          }
        />
      ))}
    </span>
  )
}

/**
 * Tela inicial genérica de um celular, com o "Amparo" disfarçado de calculadora
 * (Modo Disfarce, passo 1). Os outros apps são formas neutras, sem marcas.
 */
export function AppGridScreen() {
  const slots = Array.from({ length: 16 }, (_, i) => i)
  const CALC = 6
  return (
    <div
      className="relative h-full w-full px-[30px] pt-[90px] font-sans"
      style={{ background: 'linear-gradient(170deg, #4B2A3F 0%, rgb(75 42 63 / 0.55) 100%), #000' }}
    >
      <div className="grid grid-cols-4 gap-x-[22px] gap-y-[26px]">
        {slots.map((i) =>
          i === CALC ? (
            <div key={i} data-calc-icon className="flex flex-col items-center gap-[7px]">
              <CalculatorIcon />
              <span className="text-[11.5px] leading-none text-white">{app.calculadora}</span>
            </div>
          ) : (
            <div key={i} className="flex flex-col items-center gap-[9px]">
              <span className="size-[62px] rounded-[14px] bg-white/12" />
              <span className="h-[5px] w-[38px] rounded-full bg-white/18" />
            </div>
          ),
        )}
      </div>
      <div className="absolute right-[20px] bottom-[26px] left-[20px] flex h-[90px] items-center justify-around rounded-[30px] bg-white/10">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="size-[62px] rounded-[14px] bg-white/14" />
        ))}
      </div>
    </div>
  )
}
