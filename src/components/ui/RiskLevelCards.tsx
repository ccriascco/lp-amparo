import clsx from 'clsx'
import { Bell, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { app, leituraRisco } from '../../content/copy'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const A = leituraRisco.adapta

/** Pílula do nível: o tom de vinho escurece do Baixo para o Alto. */
const LEVEL_PILL = [
  'bg-superficie text-vinho',
  'bg-vinho text-white',
  'bg-vinho-profundo text-white',
]
/** Mancha radial atrás da ilustração: mais forte a cada nível (10%, 16%, 22%). */
const BLOB = [0.1, 0.16, 0.22]

/**
 * "Como o app se adapta ao seu risco" (ajustes 5 da seção 7): 3 cartões de recurso com ilustração
 * montada com peças do app em camadas (padrão Gaia/NextPay/Eduzz). Desktop: grid de 3 com 460px;
 * celular: carrossel com snap (85vw). Movimento contínuo só com a lista visível; com movimento
 * reduzido tudo fica parado, com os medidores já preenchidos (estado final está no markup).
 */
export function RiskLevelCards() {
  const root = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const loops: gsap.core.Tween[] = []
        const loop = (t: gsap.core.Tween) => loops.push(t.pause())

        // Baixo: a linha ondula devagar e o escudo "respira".
        q('[data-rl-wave]').forEach((el) =>
          loop(gsap.to(el, { x: -WAVE_PERIOD, duration: 6, ease: 'none', repeat: -1 })),
        )
        q('[data-rl-breathe]').forEach((el) =>
          loop(gsap.to(el, { scale: 1.03, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })),
        )
        // Médio e Alto: anéis pulsando em sequência (2,4s no sino, 1,6s no pin).
        q('[data-rl-pulse]').forEach((el) => {
          const d = Number(el.dataset.rlPulse)
          const i = Number(el.dataset.rlI)
          loop(
            gsap.fromTo(
              el,
              { scale: 1, opacity: 0.5 },
              { scale: 1.6, opacity: 0, duration: d, ease: 'sine.out', repeat: -1, delay: (i * d) / 2 },
            ),
          )
        })
        // Médio: os traços das linhas tracejadas andam até o sino.
        q('[data-rl-dash]').forEach((el) =>
          loop(gsap.to(el, { strokeDashoffset: -18, duration: 1.4, ease: 'none', repeat: -1 })),
        )
        // Alto: os botões flutuam (y ±4px), cada um num ritmo.
        q('[data-rl-float]').forEach((el, i) =>
          loop(
            gsap.fromTo(
              el,
              { y: -4 },
              { y: 4, duration: 2.2 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 },
            ),
          ),
        )

        // Entrada: camadas em stagger por cartão e medidores preenchendo o arco.
        const cards = q('[data-rl-card]')
        const gauges = q('[data-rl-gauge]')
        cards.forEach((c) =>
          gsap.set(c.querySelectorAll('[data-rl-layer]'), { y: 24, scale: 0.96, autoAlpha: 0 }),
        )
        gsap.set(gauges, { drawSVG: '0% 0%' })
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            cards.forEach((c, ci) =>
              gsap.to(c.querySelectorAll('[data-rl-layer]'), {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'expo.out',
                stagger: 0.1,
                delay: 0.15 + ci * 0.12,
              }),
            )
            gauges.forEach((g, i) =>
              gsap.to(g, {
                drawSVG: `0% ${Number(g.dataset.fill) * 100}%`,
                duration: 1.2,
                ease: 'power2.out',
                delay: 0.4 + i * 0.15,
              }),
            )
          },
        })

        // Movimento contínuo só enquanto a lista estiver na tela.
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => loops.forEach((t) => (self.isActive ? t.play() : t.pause())),
        })
      })
      // Movimento reduzido: o markup já traz o estado final (camadas no lugar, medidores cheios).
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <ul ref={root} data-appear-stagger className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-3">
      {A.levels.map((l, i) => (
        <li key={l.label} className="flex">
          <article
            data-rl-card
            className="group flex w-full flex-col rounded-card-lg border-[1.5px] border-borda bg-white p-6 transition-[translate,border-color,box-shadow] duration-300 ease-amparo hover:-translate-y-1 hover:border-vinho hover:shadow-float motion-reduce:transition-none"
          >
            <span
              className={clsx(
                'w-max rounded-full px-3.5 py-1.5 text-[0.9375rem] leading-none font-bold',
                LEVEL_PILL[i],
              )}
            >
              {l.label}
            </span>
            <p className="mt-4 text-[0.9375rem] text-pretty text-texto-secundario">{l.text}</p>
            <div
              aria-hidden
              className="relative mt-5 h-[236px] shrink-0 overflow-hidden rounded-card bg-superficie lg:h-[256px]"
            >
              {/* Grade de pontos sutil + mancha vinho que cresce com o nível */}
              <div className="absolute inset-0 bg-[radial-gradient(rgb(149_75_110/0.06)_1.5px,transparent_1.5px)] bg-size-[16px_16px]" />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 58%, rgb(149 75 110 / ${BLOB[i]}) 0%, transparent 62%)`,
                }}
              />
              <div className="absolute top-1/2 left-1/2 h-[232px] w-[300px] -translate-x-1/2 -translate-y-1/2 max-[419px]:scale-[0.78]">
                {i === 0 ? <Baixo /> : i === 1 ? <Medio /> : <Alto />}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------------------------------------
 * Peças das ilustrações
 * ---------------------------------------------------------------------------------------------- */

type LayerProps = {
  /** Posição no palco de 300×232 (px). */
  x: number
  y: number
  /** Deslocamento no hover/foco (parallax de 4 a 8px). */
  hx?: number
  hy?: number
  rot?: number
  className?: string
  children: ReactNode
}

/**
 * Camada da ilustração. Duas caixas porque o GSAP zera `translate`/`rotate` inline nos elementos que
 * anima: a de fora recebe a entrada em stagger (GSAP); a de dentro, a rotação e o afastamento no
 * hover (`translate` em CSS).
 */
function Layer({ x, y, hx = 0, hy = 0, rot = 0, className, children }: LayerProps) {
  return (
    <div data-rl-layer className={clsx('absolute', className)} style={{ left: x, top: y }}>
      <div
        className="size-full transition-[translate] duration-500 ease-amparo group-hover:[translate:var(--hx)_var(--hy)] motion-reduce:transition-none motion-reduce:group-hover:[translate:0_0]"
        style={{ rotate: `${rot}deg`, '--hx': `${hx}px`, '--hy': `${hy}px` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}

const ARC = 'M6 32 A26 26 0 0 1 58 32'
const ARC_LEN = Math.PI * 26

/** Medidor semicircular num cartãozinho branco. `fill` de 0 a 1. */
function Gauge({ fill, color }: { fill: number; color: string }) {
  return (
    <div className="rounded-sm bg-white px-2.5 pt-2.5 pb-1.5 shadow-card">
      <svg width="64" height="38" viewBox="0 0 64 38" fill="none">
        <path d={ARC} stroke="var(--color-borda)" strokeWidth={6} strokeLinecap="round" />
        <path
          data-rl-gauge
          data-fill={fill}
          d={ARC}
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${ARC_LEN * fill} ${ARC_LEN}`}
        />
      </svg>
    </div>
  )
}

/** Barra "esqueleto" de texto, como nos cartões do app. */
function Bar({ w, className }: { w: number; className?: string }) {
  return <span className={clsx('block h-2 rounded-full bg-superficie', className)} style={{ width: w }} />
}

const WAVE_PERIOD = 80
/** Linha calma: senoide de amplitude baixa, com dois períodos a mais para o laço sem emenda. */
const WAVE = (() => {
  let d = ''
  for (let x = 0; x <= 260 + WAVE_PERIOD * 2; x += 4) {
    const y = 20 + 1.8 * Math.sin((x / WAVE_PERIOD) * Math.PI * 2)
    d += `${x ? 'L' : 'M'}${x} ${y.toFixed(2)} `
  }
  return d.trim()
})()

/** BAIXO (calma): cartões com o escudo, linha quase reta e medidor de 1/3 em rosé. */
function Baixo() {
  return (
    <>
      <Layer x={54} y={26} rot={-4} hx={-6} hy={-4}>
        <div className="flex h-[132px] w-[172px] flex-col gap-2 rounded-card border border-borda bg-white/70 p-4">
          <Bar w={64} />
          <Bar w={96} />
        </div>
      </Layer>
      <Layer x={84} y={52} rot={2} hx={2} hy={2}>
        <div className="flex h-[128px] w-[156px] flex-col items-center rounded-card bg-white pt-4 shadow-float">
          <span
            data-rl-breathe
            className="grid size-16 place-items-center rounded-full bg-confirma text-white"
          >
            <ShieldCheck className="size-8" strokeWidth={1.75} />
          </span>
          <Bar w={72} className="mt-3.5" />
        </div>
      </Layer>
      <Layer x={20} y={186} hx={0} hy={6}>
        <div className="h-10 w-[260px] overflow-hidden mask-[linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
          <svg width={260 + WAVE_PERIOD * 2} height="40" fill="none">
            <path
              data-rl-wave
              d={WAVE}
              stroke="rgb(149 75 110 / 0.45)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Layer>
      <Layer x={212} y={10} rot={4} hx={8} hy={-6}>
        <Gauge fill={1 / 3} color="rgb(149 75 110 / 0.45)" />
      </Layer>
    </>
  )
}

/** Anéis que pulsam em volta de um círculo (sino ou pin). */
function PulseRings({ duration, className }: { duration: number; className: string }) {
  return (
    <>
      {[0, 1].map((i) => (
        <span
          key={i}
          data-rl-pulse={duration}
          data-rl-i={i}
          className={clsx('absolute inset-0 rounded-full opacity-0', className)}
        />
      ))}
    </>
  )
}

/** MÉDIO (atenção e conexão): sino com anéis, rede ligada por tracejado, pílula e medidor 2/3. */
function Medio() {
  const xs = [88, 154, 220]
  return (
    <>
      {/* Rede: avatares + linhas tracejadas até o sino (uma camada só, para não se separarem) */}
      <Layer x={0} y={0} hx={0} hy={-6} className="h-[232px] w-[300px]">
        <svg className="absolute inset-0" width="300" height="232" fill="none">
          {xs.map((x) => (
            <path
              key={x}
              data-rl-dash
              d={`M${x} 54 Q${(x + 154) / 2} 84 154 104`}
              stroke="rgb(149 75 110 / 0.45)"
              strokeWidth={1.5}
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          ))}
        </svg>
        {app.rede.slice(0, 3).map((g, i) => (
          <span
            key={g.initials}
            className="absolute grid size-10 place-items-center rounded-full border-2 border-white bg-white text-[0.8125rem] font-bold text-vinho shadow-card"
            style={{ left: xs[i] - 20, top: 14, rotate: `${(i - 1) * 3}deg` }}
          >
            <span className="grid size-full place-items-center rounded-full bg-superficie">
              {g.initials}
            </span>
          </span>
        ))}
      </Layer>
      <Layer x={122} y={98}>
        <div className="relative size-16">
          <PulseRings duration={2.4} className="border-2 border-vinho" />
          <span className="relative grid size-16 place-items-center rounded-full bg-vinho text-white shadow-float">
            <Bell className="size-7" strokeWidth={1.75} />
          </span>
        </div>
      </Layer>
      <Layer x={14} y={164} rot={-4} hx={-8} hy={4}>
        <Gauge fill={2 / 3} color="var(--color-vinho)" />
      </Layer>
      <Layer x={132} y={182} rot={3} hx={6} hy={6}>
        <span className="flex items-center gap-2 rounded-full bg-white py-2 pr-3.5 pl-3 text-[0.8125rem] font-bold whitespace-nowrap text-vinho-profundo shadow-float">
          <span className="size-2 rounded-full bg-vinho" />
          {A.ilustracao.pronta}
        </span>
      </Layer>
    </>
  )
}

/** ALTO (ajuda em primeiro lugar): botões 180/190, pin com anéis fortes e medidor cheio. */
function Alto() {
  return (
    <>
      {A.ilustracao.numeros.map((n, i) => (
        <Layer key={n} x={26 + i * 22} y={32 + i * 66} rot={i ? 2 : -4} hx={i ? -4 : -8} hy={i ? -2 : -6}>
          <div
            data-rl-float
            className="flex h-14 w-[172px] items-center gap-3 rounded-full bg-vinho-profundo pr-5 pl-2.5 text-white shadow-float"
          >
            <span className="grid size-9 place-items-center rounded-full bg-white/15">
              <Phone className="size-[18px]" strokeWidth={2} />
            </span>
            <span className="font-display text-[1.625rem] leading-none font-bold tabular-nums">
              {n}
            </span>
          </div>
        </Layer>
      ))}
      <Layer x={156} y={106} hx={6} hy={6}>
        <div className="relative grid size-[124px] place-items-center">
          <span className="absolute inset-0 rounded-full border-2 border-vinho-profundo/15" />
          <span className="absolute inset-[18px] rounded-full border-2 border-vinho-profundo/30" />
          <span className="absolute inset-[34px]">
            <PulseRings duration={1.6} className="border-2 border-vinho-profundo" />
          </span>
          <span className="relative grid size-14 place-items-center rounded-full bg-white text-vinho-profundo shadow-float">
            <MapPin className="size-6" strokeWidth={2} />
          </span>
        </div>
      </Layer>
      <Layer x={214} y={8} rot={4} hx={8} hy={-6}>
        <Gauge fill={1} color="var(--color-vinho-profundo)" />
      </Layer>
    </>
  )
}
