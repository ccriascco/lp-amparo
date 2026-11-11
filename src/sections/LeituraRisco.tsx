import clsx from 'clsx'
import {
  Activity,
  ClipboardList,
  FolderLock,
  History,
  MessageSquareWarning,
  Siren,
  Tags,
  type LucideIcon,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Chip } from '../components/ui/Chip'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { RiskLevelCards } from '../components/ui/RiskLevelCards'
import { leituraRisco } from '../content/copy'
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
 * e os cartões com ilustração (`RiskLevelCards`). Sem WebGL ou com movimento reduzido: imagem estática da esfera
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

    // Tamanho de cada pílula (medido uma vez; a escala nunca passa de 1).
    const size = pills.map((p) => ({ w: p.offsetWidth, h: p.offsetHeight }))

    const place = (t: number) => {
      const pos = pills.map((_, i) => {
        const { o, base } = slot[i]
        return project(o, base + o.dir * ((t / o.period) * Math.PI * 2))
      })
      // Oclusão: quando duas pílulas se cruzam, a que está mais atrás esmaece e desfoca, como se
      // passasse por trás da outra (as órbitas se cruzam na tela e o texto não pode se sobrepor).
      const hide = pos.map(() => 0)
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const ox = (size[i].w + size[j].w) / 2 + 12 - Math.abs(pos[i].x - pos[j].x)
          const oy = (size[i].h + size[j].h) / 2 + 8 - Math.abs(pos[i].y - pos[j].y)
          if (ox <= 0 || oy <= 0) continue
          const amount = Math.min(1, ox / 48) * Math.min(1, oy / 16)
          const back = pos[i].front < pos[j].front ? i : j
          hide[back] = Math.max(hide[back], amount)
        }
      }
      pills.forEach((p, i) => {
        const { x, y, front: f } = pos[i]
        const h = hide[i]
        p.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(0.85 + 0.15 * f).toFixed(3)})`
        p.style.opacity = ((0.35 + 0.65 * f) * (1 - 0.9 * h)).toFixed(3)
        const blur = Math.max(0, 0.5 - f) * 2 + h * 3
        p.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none'
        // Ordem de empilhamento pela profundidade real (a esfera fica em z-10).
        p.style.zIndex = String(f >= 0.5 ? 20 + Math.round(f * 20) : 1 + Math.round(f * 16))
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
          {/* Anéis concêntricos atrás da esfera, iguais aos do hero, dissolvendo nas bordas */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[1400px] w-[2400px] -translate-x-1/2 -translate-y-1/2 scale-[0.55] mask-[radial-gradient(ellipse_closest-side,#000_45%,transparent_100%)] lg:scale-100"
          >
            <StageRings />
          </div>
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
          <RiskLevelCards />
        </div>
      </Container>
    </section>
  )
}

/** Anéis da esfera: mesmo desenho do hero (§6.19, 12 anéis a cada 90px), começando fora da esfera.
 *  `data-rings` faz o `useSiteMotion` expandi-los devagar com o scroll. */
function StageRings() {
  const rings = Array.from({ length: 12 }, (_, i) => 300 + i * 90)
  const max = rings[rings.length - 1]
  return (
    <svg
      data-rings
      aria-hidden
      viewBox={`${-max - 2} ${-max - 2} ${max * 2 + 4} ${max * 2 + 4}`}
      className="absolute top-1/2 left-1/2 size-[2804px] -translate-x-1/2 -translate-y-1/2"
      fill="none"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          r={r}
          stroke={`rgb(149 75 110 / ${(0.18 - (i * 0.1) / 11).toFixed(3)})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
