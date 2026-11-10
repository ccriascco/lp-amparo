import clsx from 'clsx'
import {
  Activity,
  ClipboardList,
  Eye,
  FolderLock,
  HeartHandshake,
  History,
  LockKeyhole,
  MapPin,
  MessageSquareWarning,
  Phone,
  ShieldCheck,
  Siren,
  Tags,
  type LucideIcon,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Chip } from '../components/ui/Chip'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { app, leituraRisco } from '../content/copy'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

const AiSphere = lazy(() => import('../components/three/AiSphere'))

const L = leituraRisco
const FONTE_ICONS: LucideIcon[] = [
  FolderLock,
  Siren,
  ClipboardList,
  Activity,
  MessageSquareWarning,
  Tags,
  History,
]
const PRINCIPIO_ICONS: LucideIcon[] = [HeartHandshake, Eye, LockKeyhole]
/** Pílula do nível no topo de cada cartão — só tons de vinho (nunca semáforo). */
const LEVEL_PILL = [
  'bg-superficie text-vinho',
  'bg-vinho text-white',
  'bg-vinho-profundo text-white',
]
const DESKTOP = '(min-width: 1024px)'
const DEG = Math.PI / 180

/** Órbitas das pílulas (px). `tilt`: inclinação do plano; `roll`: giro na tela; `dir`: sentido. */
type Orbit = { r: number; tilt: number; roll: number; period: number; dir: 1 | -1 }
const ORBITS_DESKTOP: Orbit[] = [
  { r: 400, tilt: 13, roll: -6, period: 28, dir: 1 },
  { r: 262, tilt: 44, roll: 16, period: 40, dir: -1 },
]
/** Pílula i → órbita (desktop: 4 na primeira, 3 na segunda). */
const ORBIT_OF = [0, 1, 0, 1, 0, 1, 0]

/** Partículas soltas: raio, inclinação, giro, período, tamanho, fase, opacidade (fixos, sem sorteio). */
const DOTS = [
  [210, 30, 10, 46, 4, 0.1, 0.7],
  [250, 62, -20, 58, 3, 0.35, 0.5],
  [285, 15, 25, 39, 5, 0.6, 0.6],
  [320, 48, -8, 64, 3, 0.85, 0.45],
  [230, 75, 40, 52, 6, 0.2, 0.55],
  [300, 25, -35, 70, 4, 0.5, 0.65],
  [265, 55, 18, 44, 3, 0.75, 0.5],
  [340, 38, -15, 61, 5, 0.05, 0.4],
  [195, 68, -42, 49, 4, 0.45, 0.6],
  [310, 10, 30, 55, 3, 0.9, 0.55],
  [240, 42, 5, 67, 6, 0.3, 0.45],
  [355, 58, -28, 42, 4, 0.65, 0.5],
] as const

/** Posição na tela de um ponto da órbita + profundidade (0 = atrás, 1 = na frente). */
function project(o: Orbit, theta: number, scale = 1) {
  const r = o.r * scale
  const x = Math.cos(theta) * r
  const z = Math.sin(theta) * r
  const y = z * Math.sin(o.tilt * DEG)
  const c = Math.cos(o.roll * DEG)
  const s = Math.sin(o.roll * DEG)
  return { x: x * c - y * s, y: x * s + y * c, front: (Math.sin(theta) + 1) / 2 }
}

/** WebGL disponível? (sem ele, a esfera vira a imagem estática). */
function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * `#leitura-risco` (COPY 3.7 + ajustes do cliente): esfera da IA em partículas 3D (three + R3F,
 * carregada só perto da tela), cercada por pílulas de vidro em duas órbitas com profundidade e por
 * partículas soltas, tudo passando continuamente. Abaixo, "Como o app se adapta ao seu risco",
 * princípios e a nota do protótipo. Sem WebGL ou com movimento reduzido: imagem estática da esfera
 * e pílulas paradas.
 */
export function LeituraRisco() {
  const stage = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [webgl] = useState(() => typeof window !== 'undefined' && hasWebGL())
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Perto da tela (carrega o 3D) e visível (anima).
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ioNear = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), {
      rootMargin: '800px 0px',
    })
    const ioVis = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    ioNear.observe(el)
    ioVis.observe(el)
    return () => {
      ioNear.disconnect()
      ioVis.disconnect()
    }
  }, [])

  // Pílulas e partículas em órbita (só com a seção visível; paradas com movimento reduzido).
  const fontes = desktop ? L.fontes : L.fontes.slice(0, 5)
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const pills = Array.from(el.querySelectorAll<HTMLElement>('[data-lr-pill]'))
    const dots = Array.from(el.querySelectorAll<HTMLElement>('[data-lr-dot]'))
    const k = desktop ? 1 : 0.5
    // A órbita de fora encolhe em telas estreitas para as pílulas não saírem do palco.
    const fit = Math.min(1, (el.offsetWidth / 2 - 125) / ORBITS_DESKTOP[0].r)
    const orbits: Orbit[] = desktop
      ? ORBITS_DESKTOP.map((o, i) => (i === 0 ? { ...o, r: o.r * fit } : o))
      : [{ r: Math.min(el.offsetWidth / 2 - 70, 150), tilt: 64, roll: -10, period: 28, dir: 1 }]
    const slot = pills.map((_, i) => {
      const oi = desktop ? ORBIT_OF[i] : 0
      const same = desktop ? ORBIT_OF.filter((v) => v === oi).length : pills.length
      const idx = desktop ? ORBIT_OF.slice(0, i).filter((v) => v === oi).length : i
      return { o: orbits[oi], base: (idx / same) * Math.PI * 2 + oi * 0.6 }
    })

    const place = (t: number) => {
      pills.forEach((p, i) => {
        const { o, base } = slot[i]
        const theta = base + o.dir * ((t / o.period) * Math.PI * 2)
        const { x, y, front } = project(o, theta)
        const f = reduced ? 1 : front
        p.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(0.85 + 0.15 * f).toFixed(3)})`
        p.style.opacity = (0.35 + 0.65 * f).toFixed(3)
        p.style.filter = f < 0.5 ? `blur(${((0.5 - f) * 2).toFixed(2)}px)` : 'none'
        p.style.zIndex = f >= 0.5 ? '30' : '5'
      })
      dots.forEach((d, i) => {
        const [r, tilt, roll, period, , phase, alpha] = DOTS[i]
        const o: Orbit = { r, tilt, roll, period, dir: i % 2 ? -1 : 1 }
        const theta = phase * Math.PI * 2 + o.dir * ((t / period) * Math.PI * 2)
        const { x, y, front } = project(o, theta, k)
        d.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        d.style.opacity = (alpha * (0.4 + 0.6 * front)).toFixed(3)
        d.style.zIndex = front >= 0.5 ? '30' : '5'
      })
    }

    if (reduced) {
      // Movimento reduzido: pílulas paradas em volta da esfera, todas nítidas. Desktop: numa elipse
      // larga; celular: empilhadas no centro, duas acima e três abaixo da esfera.
      const rx = Math.min(400, el.offsetWidth / 2 - 125)
      const MOBILE_Y = [-200, -160, 125, 165, 205]
      pills.forEach((p, i) => {
        const a = -Math.PI / 2 + (i / pills.length) * Math.PI * 2
        const x = desktop ? Math.cos(a) * rx : 0
        const y = desktop ? Math.sin(a) * 255 : MOBILE_Y[i]
        p.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        p.style.opacity = '1'
        p.style.filter = 'none'
        p.style.zIndex = '30'
      })
      dots.forEach((d) => (d.style.opacity = '0'))
      return
    }
    if (!visible) {
      place(0)
      return
    }
    const start = performance.now() / 1000
    const tick = () => place(performance.now() / 1000 - start)
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [desktop, reduced, visible, fontes.length])

  const sphereImg = (
    <img
      src="/images/ai-sphere.png"
      alt=""
      width={780}
      height={780}
      loading="lazy"
      decoding="async"
      className="size-full object-contain"
    />
  )

  return (
    <section
      id="leitura-risco"
      aria-labelledby="leitura-risco-title"
      className={clsx('relative overflow-x-clip bg-branco', SECTION_Y)}
    >
      {/* Grade de pontos sutil que some nas bordas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(rgb(149_75_110/0.06)_1.5px,transparent_1.5px)] mask-[radial-gradient(ellipse_55%_50%_at_50%_50%,#000_30%,transparent_100%)] bg-size-[24px_24px]"
      />

      <Container className="relative">
        {/* Cabeçalho */}
        <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <div data-appear>
            <Chip>{L.chip}</Chip>
          </div>
          <SectionHeading id="leitura-risco-title" className="mt-5">
            {L.h2}
          </SectionHeading>
          <p data-appear className="mt-6 max-w-[640px] lead text-pretty text-texto-secundario">
            {L.sub}
          </p>
        </div>

        {/* Palco: esfera + pílulas e partículas em órbita */}
        <div
          ref={stage}
          data-lr-stage
          className="relative mx-auto mt-6 grid h-[440px] place-items-center lg:mt-2 lg:h-[620px]"
        >
          {/* Halo que pulsa atrás da esfera */}
          <div
            aria-hidden
            className="lr-halo pointer-events-none absolute top-1/2 left-1/2 size-[380px] rounded-full lg:size-[680px]"
          />
          <div aria-hidden className="relative z-10 size-[300px] lg:size-[520px]">
            {/* Sem WebGL ou com movimento reduzido: imagem estática (gerada do próprio canvas).
                Com WebGL, o 3D só carrega perto da tela; até lá, o lugar fica vazio. */}
            {reduced || !webgl ? (
              sphereImg
            ) : near ? (
              <Suspense fallback={null}>
                <AiSphere active={visible} count={desktop ? 7000 : 3000} />
              </Suspense>
            ) : null}
          </div>

          <ul aria-label="O que a IA considera" className="absolute inset-0">
            {fontes.map((f, i) => {
              const Icon = FONTE_ICONS[i]
              return (
                <li
                  key={f}
                  data-lr-pill
                  className="shadow-card absolute top-1/2 left-1/2 flex items-center gap-2 rounded-full py-1 pr-3 pl-1 whitespace-nowrap glass-light lg:gap-2.5 lg:py-1.5 lg:pr-4 lg:pl-1.5"
                  style={{ transform: 'translate(-50%, -50%)', opacity: 0 }}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-vinho text-white lg:size-8">
                    <Icon className="size-3.5 lg:size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-[0.8125rem] font-bold text-texto lg:text-[0.9375rem]">
                    {f}
                  </span>
                </li>
              )
            })}
          </ul>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {DOTS.map((d, i) => (
              <span
                key={i}
                data-lr-dot
                className="absolute top-1/2 left-1/2 rounded-full bg-vinho"
                style={{ width: d[4], height: d[4], opacity: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Como o app se adapta ao seu risco */}
        <div className="mt-10 md:mt-14">
          <h3
            data-appear
            className="text-center font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.01em] text-texto md:text-[1.625rem]"
          >
            {L.adapta.title}
          </h3>
          <ul data-appear-stagger className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-3">
            {L.adapta.levels.map((a, i) => (
              <li key={a.label} className="flex">
                <article className="flex w-full flex-col rounded-card-lg border-[1.5px] border-borda bg-white p-6 transition-[transform,border-color,box-shadow] duration-300 ease-amparo focus-within:-translate-y-1 focus-within:border-vinho hover:-translate-y-1 hover:border-vinho hover:shadow-float motion-reduce:transition-none">
                  <span
                    className={clsx(
                      'w-max rounded-full px-3.5 py-1.5 text-[0.9375rem] leading-none font-bold',
                      LEVEL_PILL[i],
                    )}
                  >
                    {a.label}
                  </span>
                  <p className="mt-4 text-[0.9375rem] text-pretty text-texto-secundario">
                    {a.text}
                  </p>
                  <div aria-hidden className="mt-5 flex-1 rounded-card bg-superficie p-3">
                    <AdaptaTela i={i} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/* Princípios */}
        <ul data-appear-stagger className="mt-20 grid gap-8 sm:grid-cols-3 md:mt-24">
          {L.principios.map((p, i) => {
            const Icon = PRINCIPIO_ICONS[i]
            return (
              <li key={p.title} className="flex flex-col items-center text-center">
                <span className="grid size-12 place-items-center rounded-full bg-superficie text-vinho">
                  <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="mt-4 font-display text-xl font-semibold text-texto">{p.title}</p>
                <p className="mt-1.5 max-w-[30ch] text-[0.9375rem] text-pretty text-texto-secundario">
                  {p.text}
                </p>
              </li>
            )
          })}
        </ul>

        <p className="mx-auto mt-14 max-w-[60ch] text-center caption font-normal text-texto-secundario">
          {L.nota}
        </p>
      </Container>
    </section>
  )
}

/** Pedaço da interface do app em cada nível (decorativo; o texto do cartão descreve o que é). */
function AdaptaTela({ i }: { i: number }) {
  const T = L.telas
  if (i === 0)
    return (
      <div className="shadow-card flex h-full items-center gap-3 rounded-xl bg-white p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-confirma/12 text-confirma">
          <ShieldCheck className="size-5" strokeWidth={2} />
        </span>
        <p className="font-display text-[1.0625rem] leading-snug font-semibold text-texto">
          {T.tranquilo}
        </p>
      </div>
    )
  if (i === 1)
    return (
      <div className="shadow-card flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-4">
        <div className="flex -space-x-2">
          {app.rede.map((g) => (
            <span
              key={g.initials}
              className="grid size-9 place-items-center rounded-full border-2 border-white bg-superficie text-xs font-bold text-vinho"
            >
              {g.initials}
            </span>
          ))}
        </div>
        <span className="flex h-11 items-center justify-center rounded-full bg-vinho px-4 text-[0.9375rem] font-bold text-white">
          {T.enviarAviso}
        </span>
      </div>
    )
  const icons = [Phone, Phone, MapPin]
  return (
    <div className="flex h-full flex-col gap-2">
      {T.acoes.map((a, j) => {
        const Icon = icons[j]
        return (
          <span
            key={a}
            className={clsx(
              'flex h-11 items-center gap-2.5 rounded-full px-4 text-[0.9375rem] font-bold',
              j < 2
                ? 'bg-vinho-profundo text-white'
                : 'border-[1.5px] border-vinho-profundo/30 bg-white text-vinho-profundo',
            )}
          >
            <Icon className="size-4" strokeWidth={2} />
            {a}
          </span>
        )
      })}
    </div>
  )
}
