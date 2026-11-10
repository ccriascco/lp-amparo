import clsx from 'clsx'
import simbolo from '../../assets/brand/amparo-simbolo-branco.svg'

/**
 * Orbe da IA (seção 7), só em CSS. Quatro manchas desfocadas (vinho, rosé, vinho-profundo e brilho
 * branco) giram em velocidades e sentidos diferentes dentro de um círculo com máscara; reflexo no
 * topo, borda fina e glow que respira por fora. O tom muda com o nível (`level`): camadas que só
 * mudam de opacidade (0.8s). Estilos em `index.css` (`.ai-orb*`).
 *
 * `data-orb-core` (escala do pulso) e `data-orb-flash` (glow intenso) são animados pela seção.
 * As manchas só giram com `[data-visible=true]` num ancestral e nunca com movimento reduzido.
 */
export function AiOrb({ level, className }: { level: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx('ai-orb relative aspect-square', className)}
      data-level={level}
    >
      <div className="ai-orb__glow" />
      <div className="ai-orb__glow ai-orb__glow--alto" />
      <div data-orb-flash className="ai-orb__glow ai-orb__glow--flash" />
      <div data-orb-core className="absolute inset-0">
        <div className="ai-orb__body">
          <span className="ai-orb__blob ai-orb__blob--1" />
          <span className="ai-orb__blob ai-orb__blob--2" />
          <span className="ai-orb__blob ai-orb__blob--3" />
          <span className="ai-orb__blob ai-orb__blob--4" />
          <span className="ai-orb__tone ai-orb__tone--baixo" />
          <span className="ai-orb__tone ai-orb__tone--alto" />
          <span className="ai-orb__shine" />
        </div>
        <img
          src={simbolo}
          alt=""
          width={60}
          height={60}
          draggable={false}
          className="absolute top-1/2 left-1/2 w-[15%] -translate-x-1/2 -translate-y-1/2 opacity-90"
        />
      </div>
    </div>
  )
}
