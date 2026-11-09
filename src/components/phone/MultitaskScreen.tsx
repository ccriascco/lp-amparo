import { app } from '../../content/copy'
import { CalculatorIcon } from './AppGridScreen'
import { CalculatorScreen } from './CalculatorScreen'

/** Vista de apps abertos (multitarefa): só a calculadora aparece (Modo Disfarce, passo 4). */
export function MultitaskScreen() {
  return (
    <div
      className="relative h-full w-full overflow-hidden font-sans"
      style={{ background: 'linear-gradient(170deg, #4B2A3F 0%, rgb(75 42 63 / 0.55) 100%), #000' }}
    >
      {/* Cartão de trás (outro app, sem conteúdo) */}
      <div className="absolute top-[150px] left-[-150px] h-[540px] w-[250px] rounded-[30px] bg-white/10" />
      {/* Calculadora em destaque */}
      <div className="absolute top-[110px] left-[78px]">
        <div className="mb-[12px] flex items-center gap-[8px]">
          <CalculatorIcon size={30} />
          <span className="text-[14px] font-semibold text-white">{app.calculadora}</span>
        </div>
        <div className="h-[590px] w-[272px] overflow-hidden rounded-[30px] bg-black shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]">
          <div
            className="origin-top-left"
            style={{ width: 390, height: 845, transform: 'scale(0.6975)' }}
          >
            <CalculatorScreen mode="auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
