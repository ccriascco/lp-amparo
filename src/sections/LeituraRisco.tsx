import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import {
  ChevronDown,
  ClipboardList,
  Eye,
  FolderLock,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  Siren,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { AiOrb } from '../components/ui/AiOrb'
import { Chip } from '../components/ui/Chip'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { app, leituraRisco } from '../content/copy'
import { gsap, MQ } from '../lib/gsap'

const L = leituraRisco
const R = L.resultado
const FONTE_ICONS: LucideIcon[] = [FolderLock, Siren, ClipboardList]
const PRINCIPIO_ICONS: LucideIcon[] = [HeartHandshake, Eye, LockKeyhole]
/** Barras dos níveis, só em tons de vinho (nunca semáforo, DESIGN.md §6.13). */
const LEVEL_BAR = ['bg-vinho/30', 'bg-vinho', 'bg-vinho-profundo']

/** Órbita elíptica das pílulas (desktop). */
const RX = 330
const RY = 215
/** Ângulos de partida (graus): uma pílula em cima à esquerda, uma à direita, uma embaixo. */
const START = [-150, -20, 100]
const polar = (deg: number, rx: number, ry: number) => {
  const a = (deg * Math.PI) / 180
  return { x: Math.cos(a) * rx, y: Math.sin(a) * ry, s: 0.94 + 0.06 * Math.sin(a) }
}

/**
 * `#leitura-risco` (COPY 3.7). O orbe da IA no centro; as 3 fontes orbitam, são "absorvidas" ao
 * rolar (scrub), o orbe pulsa e uma linha de luz entrega o cartão de resultado. O nível escolhido
 * acende o cartão de adaptação correspondente e muda o tom do orbe.
 * Movimento reduzido: orbe parado, pílulas paradas em volta, tudo visível.
 */
export function LeituraRisco() {
  const root = useRef<HTMLElement>(null)
  const [level, setLevel] = useState<number>(R.initial)
  const [open, setOpen] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  // Manchas do orbe e órbita só rodam com a seção visível (CSS lê `data-visible`).
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      el.dataset.visible = String(e.isIntersecting)
      el.dispatchEvent(new CustomEvent('lr-visible', { detail: e.isIntersecting }))
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useGSAP(
    () => {
      const el = root.current!
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      const orb = q('[data-lr-orb]')[0]
      const core = q('[data-orb-core]')[0]
      const flash = q('[data-orb-flash]')[0]
      const line = q('[data-lr-line]')[0]
      const card = q('[data-lr-card]')[0]
      const pills = q('[data-lr-pill]')

      // Pulso do orbe, linha de luz e cartão: iguais no desktop e no celular.
      const finale = (tl: gsap.core.Timeline) =>
        tl
          .to(core, { scale: 1.08, duration: 0.8, ease: 'power2.out' }, '-=0.5')
          .to(flash, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '<')
          .to(core, { scale: 1, duration: 1, ease: 'power2.inOut' })
          .to(flash, { opacity: 0, duration: 1, ease: 'power2.inOut' }, '<')
          .fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'none' }, '<0.1')
          .fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
            '-=0.5',
          )

      mm.add(MQ.desktop, () => {
        const st = { angle: 0, absorb: 0 }
        const render = () =>
          pills.forEach((p, i) => {
            const { x, y, s } = polar(START[i] + st.angle, RX, RY)
            const k = 1 - st.absorb
            gsap.set(p, {
              xPercent: -50,
              yPercent: -50,
              x: x * k,
              y: y * k,
              scale: s * (1 - 0.75 * st.absorb),
              opacity: Math.max(0, 1 - st.absorb * 1.15),
            })
          })
        render()

        // Órbita: uma volta em 30s, em loop, só com a seção visível.
        const orbit = gsap.to(st, {
          angle: 360,
          duration: 30,
          ease: 'none',
          repeat: -1,
          paused: el.dataset.visible !== 'true',
          onUpdate: render,
        })
        const onVis = (e: Event) =>
          (e as CustomEvent<boolean>).detail ? orbit.play() : orbit.pause()
        el.addEventListener('lr-visible', onVis)

        const tl = gsap.timeline({
          defaults: { overwrite: 'auto' },
          scrollTrigger: { trigger: orb, start: 'center 80%', end: 'center 20%', scrub: 0.6 },
        })
        tl.to(st, { absorb: 1, duration: 3, ease: 'power2.in', onUpdate: render })
        finale(tl)
        // Depois da leitura, as fontes voltam a orbitar.
        tl.to(st, { absorb: 0, duration: 2, ease: 'power2.out', onUpdate: render }, '+=0.3')

        return () => {
          el.removeEventListener('lr-visible', onVis)
          orbit.kill()
        }
      })

      mm.add(MQ.mobile, () => {
        // Pílulas paradas acima do orbe; na absorção descem até o centro dele.
        const delta = (p: Element, axis: 'x' | 'y') => {
          const a = p.getBoundingClientRect()
          const b = orb.getBoundingClientRect()
          const cur = Number(gsap.getProperty(p, axis))
          return axis === 'x'
            ? b.left + b.width / 2 - (a.left + a.width / 2 - cur)
            : b.top + b.height / 2 - (a.top + a.height / 2 - cur)
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: orb,
            start: 'center 85%',
            end: 'center 25%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        tl.to(pills, {
          x: (_i, p) => delta(p, 'x'),
          y: (_i, p) => delta(p, 'y'),
          scale: 0.25,
          opacity: 0,
          duration: 3,
          ease: 'power2.in',
          stagger: 0.15,
        })
        finale(tl)
        tl.to(pills, { x: 0, y: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, '+=0.3')
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  const select = (i: number, focus = false) => {
    setLevel(i)
    if (focus) tabs.current[i]?.focus()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    const n = R.levels.length
    if (e.key === 'ArrowRight') select((level + 1) % n, true)
    else if (e.key === 'ArrowLeft') select((level - 1 + n) % n, true)
    else if (e.key === 'Home') select(0, true)
    else if (e.key === 'End') select(n - 1, true)
    else return
    e.preventDefault()
  }

  const active = L.adapta.levels[level]

  return (
    <section
      ref={root}
      id="leitura-risco"
      aria-labelledby="leitura-risco-title"
      className={clsx('relative overflow-x-clip bg-branco', SECTION_Y)}
    >
      {/* Grade de pontos sutil que some nas bordas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1300px] bg-[radial-gradient(rgb(149_75_110/0.06)_1.5px,transparent_1.5px)] mask-[radial-gradient(ellipse_55%_50%_at_50%_45%,#000_30%,transparent_100%)] bg-size-[24px_24px]"
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

        {/* Palco: orbe + fontes em órbita */}
        <div data-lr-stage className="relative mt-12 lg:mt-6">
          {/* Brilho radial grande atrás do orbe */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[calc(50%+24px)] left-1/2 size-[640px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(149_75_110/0.18),rgb(149_75_110/0))] lg:top-1/2 lg:size-[980px]"
          />
          <div className="relative flex flex-col items-center gap-10 lg:h-[500px] lg:justify-center">
            <ul
              aria-label="O que a IA considera"
              className="relative z-10 flex flex-wrap justify-center gap-2 lg:absolute lg:inset-0 lg:block"
            >
              {L.fontes.map((f, i) => {
                const Icon = FONTE_ICONS[i]
                const p = polar(START[i], RX, RY)
                return (
                  <li
                    key={f}
                    data-lr-pill
                    style={{ ['--px' as string]: `${p.x}px`, ['--py' as string]: `${p.y}px` }}
                    className="shadow-card flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 whitespace-nowrap glass-light lg:absolute lg:top-1/2 lg:left-1/2 lg:transform-[translate(calc(-50%+var(--px)),calc(-50%+var(--py)))]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-vinho text-white">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="text-[0.9375rem] font-bold text-texto">{f}</span>
                  </li>
                )
              })}
            </ul>
            <div data-lr-orb className="relative">
              <AiOrb level={level} className="w-[240px] lg:w-[360px]" />
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-[46ch] text-center caption font-normal text-texto-secundario lg:mt-4">
            {L.fonar}
          </p>

          {/* Linha de luz que sai do orbe */}
          <div
            aria-hidden
            data-lr-line
            className="mx-auto mt-6 h-20 w-0.5 origin-top rounded-full bg-[linear-gradient(to_bottom,rgb(149_75_110/0),#954b6e_40%,rgb(149_75_110/0.15))] shadow-[0_0_12px_rgb(149_75_110/0.6)] md:h-24"
          />

          {/* Cartão de resultado */}
          <div
            data-lr-card
            className="relative mx-auto mt-4 max-w-[520px] rounded-[20px] border border-borda/70 bg-white p-6 shadow-float md:p-7"
          >
            <div className="flex items-center gap-3">
              <h3 className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.01em] text-texto">
                {R.title}
              </h3>
              <span className="rounded-full bg-superficie px-2.5 py-1 text-xs leading-none font-bold text-vinho">
                {R.badge}
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Nível de risco"
              onKeyDown={onKeyDown}
              className="mt-5 grid grid-cols-3 gap-1 rounded-full border border-borda bg-white p-1"
            >
              {R.levels.map((l, i) => (
                <button
                  key={l}
                  ref={(b) => {
                    tabs.current[i] = b
                  }}
                  role="tab"
                  type="button"
                  id={`${id}-t${i}`}
                  aria-selected={i === level}
                  aria-controls={`${id}-p`}
                  tabIndex={i === level ? 0 : -1}
                  onClick={() => select(i)}
                  className={clsx(
                    'h-11 rounded-full text-[0.9375rem] font-bold transition-[background-color,color] duration-300',
                    i === level ? 'bg-vinho text-white' : 'text-texto-secundario hover:text-vinho',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2" aria-hidden>
              {R.levels.map((l, i) => (
                <span
                  key={l}
                  className={clsx(
                    'h-1.5 rounded-full transition-colors duration-500',
                    i <= level ? LEVEL_BAR[level] : 'bg-superficie',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-como`}
              onClick={() => setOpen((o) => !o)}
              className="group mt-4 -mb-2 inline-flex min-h-11 items-center gap-1.5 rounded-md text-[0.9375rem] font-bold text-vinho"
            >
              {R.comoChegamos}
              <ChevronDown
                aria-hidden
                className={clsx(
                  'size-4 transition-transform duration-300 ease-amparo motion-reduce:transition-none',
                  open && 'rotate-180',
                )}
              />
            </button>
            <div
              id={`${id}-como`}
              className={clsx(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-amparo motion-reduce:transition-none',
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
              inert={!open}
            >
              <div className="overflow-hidden">
                <div className="mt-3 rounded-card bg-superficie p-4">
                  <span className="inline-block rounded-full border border-borda bg-white px-2.5 py-1 text-xs leading-none font-bold text-texto-secundario">
                    {R.exemplo}
                  </span>
                  <ul className="mt-3 flex flex-col gap-2">
                    {R.sinais.map((s) => (
                      <li key={s} className="flex gap-2.5 text-[0.9375rem] text-texto">
                        <span
                          aria-hidden
                          className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-vinho"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex items-center gap-2 text-small font-semibold text-vinho-profundo">
                    <LockKeyhole className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                    {R.privacidade}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Como o app se adapta */}
        <div className="mt-20 md:mt-24">
          <h3
            data-appear
            className="text-center font-display text-[1.625rem] leading-tight font-semibold tracking-[-0.015em] text-texto md:text-[2rem]"
          >
            {L.adapta.title}
          </h3>
          <p aria-live="polite" className="sr-only">
            {`${active.label}: ${active.text}`}
          </p>
          <div
            id={`${id}-p`}
            role="tabpanel"
            aria-labelledby={`${id}-t${level}`}
            data-appear-stagger
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {L.adapta.levels.map((a, i) => (
              <div key={a.label} className="flex">
                <article
                  data-on={i === level}
                  onClick={() => select(i)}
                  className="flex w-full cursor-pointer flex-col rounded-card-lg border-[1.5px] border-borda bg-white p-6 opacity-45 transition-[opacity,transform,border-color,box-shadow] duration-500 ease-amparo data-[on=true]:scale-[1.02] data-[on=true]:border-vinho data-[on=true]:opacity-100 data-[on=true]:shadow-float motion-reduce:transition-none"
                >
                  <p className="flex items-center gap-2.5 font-display text-xl font-semibold text-texto">
                    <span aria-hidden className={clsx('size-2.5 rounded-full', LEVEL_BAR[i])} />
                    {a.label}
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-pretty text-texto-secundario">
                    {a.text}
                  </p>
                  <div aria-hidden className="mt-5 flex-1 rounded-card bg-superficie p-3">
                    <AdaptaTela i={i} />
                  </div>
                </article>
              </div>
            ))}
          </div>
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
