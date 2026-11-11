import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import {
  Bell,
  BellRing,
  ChevronRight,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { app, leituraRisco } from '../../content/copy'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const A = leituraRisco.adapta

const ICONS: LucideIcon[] = [ShieldCheck, BellRing, PhoneCall]
/** Pílula do nível: o tom escurece do Baixo para o Alto. */
const LEVEL_PILL = [
  'bg-superficie text-vinho',
  'bg-vinho text-white',
  'bg-vinho-profundo text-white',
]
/** Fundo do marco aceso ("rosé" = vinho a 55% sobre o branco do marco; nenhuma cor nova). */
const MARK_BG = ['bg-vinho/55', 'bg-vinho', 'bg-vinho-profundo']
const MARK_RING = ['border-vinho/55', 'border-vinho', 'border-vinho-profundo']
const GAUGE_COLOR = ['rgb(149 75 110 / 0.55)', 'var(--color-vinho)', 'var(--color-vinho-profundo)']
/** Mancha radial atrás da mini ilustração: mais forte a cada nível. */
const BLOB = [0.1, 0.16, 0.22]

/** Desktop com movimento: linha horizontal e bloco fixo. Abaixo de 1024px: linha vertical. */
const DESK = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const MOB = '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'

/**
 * "Como o app se adapta ao seu risco" (ajustes 7 da seção 7): linha do tempo Baixo → Médio → Alto.
 * A linha se preenche com o scroll (desktop: bloco fixo por ~150vh; celular: sem sticky, de cima
 * para baixo) e cada marco acende quando ela chega nele: cor do nível + anéis, medidor (DrawSVG) e
 * o cartão do nível sobe e fica nítido. Não apaga ao voltar, só ao sair pelo início da seção.
 * O markup já traz o estado final (tudo aceso e nítido): é o que fica com movimento reduzido.
 */
export function RiskTimeline() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desk: DESK, mob: MOB }, (ctx) => {
        const desk = Boolean((ctx.conditions as { desk?: boolean }).desk)
        const el = root.current!
        const q = gsap.utils.selector(el)
        const items = q('[data-tl-item]')
        const cards = items.map((it) => it.querySelector<HTMLElement>('[data-tl-card]')!)
        const gauges = items.map((it) => it.querySelector<SVGPathElement>('[data-tl-gauge]')!)
        const line = q('[data-tl-line]')[0]
        const fill = q('[data-tl-fill]')[0]

        // Laços de cada nível (anéis do marco + microanimação da ilustração), criados pausados.
        const loops = items.map((it) => {
          const ls: gsap.core.Tween[] = []
          const add = (t: gsap.core.Tween) => ls.push(t.pause())
          it.querySelectorAll<HTMLElement>('[data-tl-pulse]').forEach((r) => {
            const d = Number(r.dataset.tlPulse)
            const k = Number(r.dataset.tlI)
            add(
              gsap.fromTo(
                r,
                { scale: 1, opacity: 0.5 },
                { scale: 1.6, opacity: 0, duration: d, ease: 'sine.out', repeat: -1, delay: (k * d) / 2 },
              ),
            )
          })
          it.querySelectorAll('[data-tl-wave]').forEach((w) =>
            add(gsap.to(w, { x: -WAVE_PERIOD, duration: 6, ease: 'none', repeat: -1 })),
          )
          it.querySelectorAll('[data-tl-breathe]').forEach((b) =>
            add(gsap.to(b, { scale: 1.03, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })),
          )
          it.querySelectorAll('[data-tl-dash]').forEach((d) =>
            add(gsap.to(d, { strokeDashoffset: -18, duration: 1.4, ease: 'none', repeat: -1 })),
          )
          it.querySelectorAll('[data-tl-float]').forEach((f, k) =>
            add(
              gsap.fromTo(
                f,
                { y: -4 },
                { y: 4, duration: 2.2 + k * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 },
              ),
            ),
          )
          return ls
        })

        // Estado inicial: nada aceso, linha vazia, cartões apagados.
        const on = items.map(() => false)
        let visible = false
        let max = 0
        // Revela por recorte (o degradê fica fixo na linha inteira; com escala ele se comprimiria).
        const setFill = (f: number) => {
          const rest = `${((1 - f) * 100).toFixed(2)}%`
          gsap.set(fill, { clipPath: desk ? `inset(0 ${rest} 0 0)` : `inset(0 0 ${rest} 0)` })
        }
        const sync = () =>
          loops.forEach((ls, i) => ls.forEach((t) => (visible && on[i] ? t.play() : t.pause())))
        items.forEach((it) => delete it.dataset.on)
        setFill(0)
        gsap.set(cards, { opacity: 0.4, y: 24, filter: 'blur(6px)' })
        gsap.set(gauges, { drawSVG: '0% 0%' })

        const activate = (i: number) => {
          if (on[i]) return
          on[i] = true
          items[i].dataset.on = ''
          gsap.to(cards[i], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' })
          gsap.to(gauges[i], {
            drawSVG: `0% ${Number(gauges[i].dataset.fill) * 100}%`,
            duration: 1.2,
            ease: 'power2.out',
          })
          sync()
        }
        const reset = () => {
          max = 0
          setFill(0)
          items.forEach((it, i) => {
            on[i] = false
            delete it.dataset.on
          })
          gsap.to(cards, { opacity: 0.4, y: 24, filter: 'blur(6px)', duration: 0.4, overwrite: true })
          gsap.set(gauges, { drawSVG: '0% 0%', overwrite: true })
          sync()
        }

        // Posição de cada marco ao longo da linha (0–1).
        let pos: number[] = []
        const measure = () => {
          const r = line.getBoundingClientRect()
          pos = items.map((it) => {
            const m = it.querySelector('[data-tl-marker]')!.getBoundingClientRect()
            return desk
              ? (m.left + m.width / 2 - r.left) / r.width
              : (m.top + m.height / 2 - r.top) / r.height
          })
        }
        measure()

        ScrollTrigger.create({
          trigger: desk ? q('[data-tl-pin]')[0] : q('ol')[0],
          start: desk ? 'top top' : 'top 70%',
          end: desk ? 'bottom bottom' : 'bottom 70%',
          onRefresh: measure,
          onUpdate: (self) => {
            // Desktop: a linha enche nos primeiros 85% do bloco fixo; o resto é respiro no fim.
            const f = desk ? Math.min(1, self.progress / 0.85) : self.progress
            if (f <= max) return
            max = f
            setFill(max)
            pos.forEach((p, i) => max >= p - 0.01 && activate(i))
          },
          onLeaveBack: reset,
        })
        // Microanimações só com a linha do tempo na tela.
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            visible = self.isActive
            sync()
          },
        })

        // Ao sair deste modo (ex.: movimento reduzido), o markup volta ao estado final.
        return () => items.forEach((it) => (it.dataset.on = ''))
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="mt-10 md:mt-14">
      {/* Desktop: bloco fixo por ~150vh enquanto a linha se preenche (sem sticky com movimento reduzido) */}
      <div data-tl-pin className="relative lg:h-[250vh] lg:motion-reduce:h-auto">
        <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pt-16 lg:motion-reduce:static lg:motion-reduce:min-h-0 lg:motion-reduce:pt-0">
          <h3
            data-appear
            className="text-center font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.01em] text-texto md:text-[1.625rem]"
          >
            {A.title}
          </h3>

          <ol
            aria-label={A.ariaLabel}
            className="relative mt-10 grid gap-y-10 lg:mt-12 lg:grid-cols-3 lg:gap-x-6"
          >
            {/* Linha: vertical à esquerda no celular, horizontal de ponta a ponta no desktop */}
            <span
              aria-hidden
              data-tl-line
              className="absolute top-7 bottom-0 left-[27px] w-[2px] bg-borda lg:top-[107px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[2px] lg:w-auto"
            >
              <span
                data-tl-fill
                className="absolute inset-y-0 -inset-x-px rounded-full bg-linear-to-b from-borda via-vinho to-vinho-profundo lg:inset-x-0 lg:-inset-y-px lg:bg-linear-to-r"
              />
            </span>
            {/* Chevrons entre os marcos (o risco subindo) */}
            {[1, 2].map((k) => (
              <span
                key={k}
                aria-hidden
                className="absolute top-[108px] hidden size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-borda bg-white text-vinho/70 lg:grid"
                style={{ left: `${(k / 3) * 100}%` }}
              >
                <ChevronRight className="size-3.5" strokeWidth={2.25} />
              </span>
            ))}

            {A.levels.map((l, i) => {
              const Icon = ICONS[i]
              return (
                <li
                  key={l.label}
                  data-tl-item
                  data-on=""
                  className="group/tl relative grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 lg:grid-cols-1 lg:justify-items-center"
                >
                  {/* Pílula do nível + medidor */}
                  <div className="col-start-2 row-start-1 flex h-14 items-center gap-3 lg:col-start-1 lg:h-20 lg:items-end lg:pb-4">
                    <span
                      className={clsx(
                        'rounded-full px-3 py-1.5 text-[0.8125rem] leading-none font-bold',
                        LEVEL_PILL[i],
                      )}
                    >
                      {l.label}
                    </span>
                    <MiniGauge fill={(i + 1) / 3} color={GAUGE_COLOR[i]} />
                  </div>

                  {/* Marco sobre a linha */}
                  <span
                    aria-hidden
                    data-tl-marker
                    className="relative col-start-1 row-start-1 grid size-14 place-items-center rounded-full border-2 border-borda bg-white text-vinho/50 transition-[border-color,color] duration-500 group-data-on/tl:border-transparent group-data-on/tl:text-white lg:row-start-2"
                  >
                    <span
                      className={clsx(
                        'absolute -inset-0.5 rounded-full opacity-0 transition-opacity duration-500 group-data-on/tl:opacity-100',
                        MARK_BG[i],
                      )}
                    />
                    {[0, 1].map((k) => (
                      <span
                        key={k}
                        data-tl-pulse={2.4}
                        data-tl-i={k}
                        className={clsx('absolute -inset-0.5 rounded-full border-2 opacity-0', MARK_RING[i])}
                      />
                    ))}
                    <Icon className="relative size-6" strokeWidth={1.75} />
                  </span>

                  {/* Cartão do nível */}
                  <div
                    data-tl-card
                    className="col-start-2 row-start-2 mt-3 w-full lg:col-start-1 lg:row-start-3 lg:mt-6 lg:max-w-[360px]"
                  >
                    <article className="group h-full rounded-card-lg bg-white p-2.5 shadow-card">
                      <div
                        aria-hidden
                        className="relative h-40 overflow-hidden rounded-card bg-superficie"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(rgb(149_75_110/0.06)_1.5px,transparent_1.5px)] bg-size-[16px_16px]" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at 50% 55%, rgb(149 75 110 / ${BLOB[i]}) 0%, transparent 65%)`,
                          }}
                        />
                        <div className="absolute top-1/2 left-1/2 h-[232px] w-[300px] -translate-x-1/2 -translate-y-1/2 scale-[0.66] max-[399px]:scale-[0.56]">
                          {i === 0 ? <Baixo /> : i === 1 ? <Medio /> : <Alto />}
                        </div>
                      </div>
                      <div className="px-3 pt-4 pb-3">
                        <h4 className="font-display text-xl leading-tight font-semibold tracking-[-0.01em] text-texto">
                          {l.title}
                        </h4>
                        <p className="mt-1.5 text-[0.9375rem] text-pretty text-texto-secundario">
                          {l.text}
                        </p>
                      </div>
                    </article>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------------------------------
 * Peças
 * ---------------------------------------------------------------------------------------------- */

const ARC = 'M6 32 A26 26 0 0 1 58 32'
const ARC_LEN = Math.PI * 26

/** Medidor semicircular de 40px. `fill` de 0 a 1 (o markup já vem preenchido). */
function MiniGauge({ fill, color }: { fill: number; color: string }) {
  return (
    <svg aria-hidden width="40" height="24" viewBox="0 0 64 38" fill="none" className="shrink-0">
      <path d={ARC} stroke="var(--color-borda)" strokeWidth={7} strokeLinecap="round" />
      <path
        data-tl-gauge
        data-fill={fill}
        d={ARC}
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${ARC_LEN * fill} ${ARC_LEN}`}
      />
    </svg>
  )
}

type LayerProps = {
  /** Posição no palco de 300×232 (px). */
  x: number
  y: number
  /** Afastamento no hover (parallax de 4 a 8px). */
  hx?: number
  hy?: number
  rot?: number
  className?: string
  children: ReactNode
}

/** Camada da ilustração: posição + rotação, e afastamento no hover do cartão (`translate`). */
function Layer({ x, y, hx = 0, hy = 0, rot = 0, className, children }: LayerProps) {
  return (
    <div
      className={clsx(
        'absolute transition-[translate] duration-500 ease-amparo group-hover:[translate:var(--hx)_var(--hy)] motion-reduce:transition-none motion-reduce:group-hover:[translate:0_0]',
        className,
      )}
      style={{ left: x, top: y, rotate: `${rot}deg`, '--hx': `${hx}px`, '--hy': `${hy}px` } as CSSProperties}
    >
      {children}
    </div>
  )
}

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

/** BAIXO: escudo verde num cartão branco, cartão de trás inclinado e linha calma. */
function Baixo() {
  return (
    <>
      <Layer x={50} y={20} rot={-4} hx={-6} hy={-4}>
        <div className="flex h-[140px] w-[180px] flex-col gap-2 rounded-card border border-borda bg-white/70 p-4">
          <Bar w={64} />
          <Bar w={96} />
        </div>
      </Layer>
      <Layer x={78} y={44} rot={2} hx={4} hy={2}>
        <div className="flex h-[136px] w-[164px] flex-col items-center rounded-card bg-white pt-5 shadow-float">
          <span
            data-tl-breathe
            className="grid size-16 place-items-center rounded-full bg-confirma text-white"
          >
            <ShieldCheck className="size-8" strokeWidth={1.75} />
          </span>
          <Bar w={76} className="mt-4" />
        </div>
      </Layer>
      <Layer x={20} y={184} hy={6}>
        <div className="h-10 w-[260px] overflow-hidden mask-[linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
          <svg width={260 + WAVE_PERIOD * 2} height="40" fill="none">
            <path
              data-tl-wave
              d={WAVE}
              stroke="rgb(149 75 110 / 0.45)"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Layer>
    </>
  )
}

/** Anéis que pulsam em volta de um círculo (sino ou pin). */
function PulseRings({ duration, className }: { duration: number; className: string }) {
  return (
    <>
      {[0, 1].map((k) => (
        <span
          key={k}
          data-tl-pulse={duration}
          data-tl-i={k}
          className={clsx('absolute inset-0 rounded-full opacity-0', className)}
        />
      ))}
    </>
  )
}

/** MÉDIO: sino com anéis, rede ligada por tracejado e a pílula "Pronta para avisar". */
function Medio() {
  const xs = [88, 154, 220]
  return (
    <>
      <Layer x={0} y={0} hy={-6} className="h-[232px] w-[300px]">
        <svg className="absolute inset-0" width="300" height="232" fill="none">
          {xs.map((x) => (
            <path
              key={x}
              data-tl-dash
              d={`M${x} 58 Q${(x + 154) / 2} 88 154 110`}
              stroke="rgb(149 75 110 / 0.45)"
              strokeWidth={2}
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          ))}
        </svg>
        {app.rede.slice(0, 3).map((g, k) => (
          <span
            key={g.initials}
            className="absolute grid size-11 place-items-center rounded-full border-2 border-white bg-white text-sm font-bold text-vinho shadow-card"
            style={{ left: xs[k] - 22, top: 14, rotate: `${(k - 1) * 3}deg` }}
          >
            <span className="grid size-full place-items-center rounded-full bg-superficie">
              {g.initials}
            </span>
          </span>
        ))}
      </Layer>
      <Layer x={118} y={104}>
        <div className="relative size-[72px]">
          <PulseRings duration={2.4} className="border-2 border-vinho" />
          <span className="relative grid size-[72px] place-items-center rounded-full bg-vinho text-white shadow-float">
            <Bell className="size-8" strokeWidth={1.75} />
          </span>
        </div>
      </Layer>
      <Layer x={92} y={190} rot={3} hx={6} hy={6}>
        <span className="flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3.5 text-[0.9375rem] font-bold whitespace-nowrap text-vinho-profundo shadow-float">
          <span className="size-2.5 rounded-full bg-vinho" />
          {A.ilustracao.pronta}
        </span>
      </Layer>
    </>
  )
}

/** ALTO: botões 180/190 empilhados e pin com anéis fortes. */
function Alto() {
  return (
    <>
      {A.ilustracao.numeros.map((n, k) => (
        <Layer key={n} x={14 + k * 26} y={34 + k * 74} rot={k ? 2 : -4} hx={k ? -4 : -8} hy={k ? -2 : -6}>
          <div
            data-tl-float
            className="flex h-16 w-[184px] items-center gap-3 rounded-full bg-vinho-profundo pr-5 pl-3 text-white shadow-float"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white/15">
              <Phone className="size-5" strokeWidth={2} />
            </span>
            <span className="font-display text-[1.875rem] leading-none font-bold tabular-nums">
              {n}
            </span>
          </div>
        </Layer>
      ))}
      <Layer x={164} y={64} hx={6} hy={6}>
        <div className="relative grid size-[136px] place-items-center">
          <span className="absolute inset-0 rounded-full border-2 border-vinho-profundo/15" />
          <span className="absolute inset-[20px] rounded-full border-2 border-vinho-profundo/30" />
          <span className="absolute inset-[38px]">
            <PulseRings duration={1.6} className="border-2 border-vinho-profundo" />
          </span>
          <span className="relative grid size-[60px] place-items-center rounded-full bg-white text-vinho-profundo shadow-float">
            <MapPin className="size-7" strokeWidth={2} />
          </span>
        </div>
      </Layer>
    </>
  )
}
