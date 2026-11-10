import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'
import { useRef, type CSSProperties, type FocusEvent } from 'react'
import { getLenis, gsap, MQ, ScrollTrigger } from '../../lib/gsap'
import { Button } from './Button'

export type Pain = {
  title: string
  text: string
  href: string
  icon: LucideIcon
}

type Slot = { pos: CSSProperties; speed: number }

/** Posições no palco (desktop): 2 em cima, 1 de cada lado, o 5º embaixo à direita. Em cada lado a velocidade cai de cima para baixo, para um cartão nunca alcançar o outro (§6.32). */
const SLOTS: Slot[] = [
  { pos: { left: '6%', top: '8%' }, speed: 1.2 },
  { pos: { right: '8%', top: '4%' }, speed: 1.3 },
  { pos: { left: '2.5%', top: '47%' }, speed: 0.95 },
  { pos: { right: '3%', top: '38%' }, speed: 1.1 },
  { pos: { right: '15%', bottom: '4%' }, speed: 0.85 },
]

/** Cartões "eco" (só ícone + título de uma dor real), menores, desfocados e ao fundo. */
const ECHOES: (Slot & { of: number })[] = [
  { of: 3, pos: { left: '31%', top: '3%' }, speed: 0.5 },
  { of: 0, pos: { right: '27%', top: '17%' }, speed: 0.6 },
  { of: 1, pos: { left: '21%', top: '76%' }, speed: 0.45 },
]

/** Amplitude do parallax (§6.32): de +40vh a −60vh, multiplicado pela velocidade. */
const FROM = 0.4
const TO = -0.6

type QuestionStageProps = {
  id: string
  question: string
  intro: string
  pains: Pain[]
  linkLabel: string
  fecho: string
  fechoButton: { label: string; href: string }
}

/**
 * Pergunta fixa com cartões flutuando (DESIGN.md §6.32 + §7.12, padrão Gardance).
 * Desktop: `250vh` com palco sticky; os cartões sobem em velocidades diferentes; no fim a pergunta
 * dá lugar ao fecho. < 1024px: sem sticky, lista com `appear`. Movimento reduzido: tudo parado,
 * pergunta e fecho visíveis.
 */
export function QuestionStage({
  id,
  question,
  intro,
  pains,
  linkLabel,
  fecho,
  fechoButton,
}: QuestionStageProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.desktop, () => {
        const el = root.current!
        const vh = () => window.innerHeight
        const range = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }

        gsap.utils.toArray<HTMLElement>('[data-q-speed]', el).forEach((card) => {
          const s = Number(card.dataset.qSpeed)
          gsap.fromTo(
            card,
            { y: () => vh() * FROM * s },
            { y: () => vh() * TO * s, ease: 'none', scrollTrigger: range },
          )
        })

        // Fim do palco: a pergunta sai, o fecho entra (últimos ~60vh do sticky).
        const end = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'bottom 170%', end: 'bottom 105%', scrub: true },
        })
        end
          .to('[data-q-question]', { autoAlpha: 0, y: -48, ease: 'power1.in' }, 0)
          .from('[data-q-fecho]', { autoAlpha: 0, y: 40, ease: 'power2.out' }, 0.35)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  /**
   * Teclado: o link focado pode estar fora da tela (o cartão foi deslocado pelo parallax).
   * Rola até o ponto em que aquele cartão passa pelo meio da tela, dentro do trecho fixo.
   */
  const onFocus = (e: FocusEvent<HTMLElement>) => {
    const el = root.current
    const card = (e.target as HTMLElement).closest<HTMLElement>('[data-q-speed]')
    if (!el || !card || !window.matchMedia(MQ.desktop).matches) return
    const s = Number(card.dataset.qSpeed)
    const h = window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight + h // de "top bottom" a "bottom top"
    const want = h / 2 - card.offsetHeight / 2 - card.offsetTop // y desejado
    const p = (FROM * s * h - want) / ((FROM - TO) * s * h)
    const y = gsap.utils.clamp(top, top + el.offsetHeight - h, top - h + p * span)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
    else window.scrollTo(0, y)
    ScrollTrigger.update()
  }

  return (
    <div ref={root} className="relative lg:h-[250vh]">
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-svh">
        {/* Brilho radial no centro (§6.32) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(48% 46% at 50% 50%, rgb(149 75 110 / 0.25) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 py-20 md:px-8 md:py-28 lg:block lg:h-full lg:p-0">
          {/* Pergunta + intro, fixas no centro */}
          <div
            data-q-question
            className="relative z-10 mx-auto max-w-[760px] text-center lg:absolute lg:inset-x-0 lg:top-1/2 lg:-translate-y-1/2"
          >
            <h2
              id={id}
              data-words
              className="mx-auto max-w-[16ch] display-l text-balance text-white"
            >
              {question}
            </h2>
            <p data-appear className="mx-auto mt-6 max-w-[40ch] lead text-white/70">
              {intro}
            </p>
          </div>

          {/* Cartões "eco" (decorativos) */}
          {ECHOES.map((e) => {
            const P = pains[e.of]
            return (
              <div
                key={`eco-${e.of}`}
                aria-hidden
                data-q-speed={e.speed}
                className="absolute hidden w-[220px] opacity-45 blur-[2px] lg:block"
                style={e.pos}
              >
                <div className="flex items-center gap-3 rounded-card border border-white/10 bg-vinho-profundo p-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-vinho text-white">
                    <P.icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 truncate font-display text-[0.95rem] font-semibold text-white">
                    {P.title}
                  </span>
                </div>
              </div>
            )
          })}

          {/* As 5 dores */}
          <ul onFocus={onFocus} className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-0 lg:block">
            {pains.map((p, i) => (
              <li
                key={p.title}
                data-q-speed={SLOTS[i].speed}
                className="lg:absolute lg:w-[300px]"
                style={SLOTS[i].pos}
              >
                <PainCard pain={p} linkLabel={linkLabel} />
              </li>
            ))}
          </ul>

          {/* Fecho (COPY 3.3) */}
          <div
            data-q-fecho
            className="relative z-10 mt-12 flex flex-col items-center gap-5 text-center lg:absolute lg:inset-x-0 lg:bottom-[9%] lg:mt-0"
          >
            <p data-appear className="max-w-[34ch] lead font-semibold text-balance text-white">
              {fecho}
            </p>
            <Button variant="on-dark" href={fechoButton.href}>
              {fechoButton.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PainCard({ pain, linkLabel }: { pain: Pain; linkLabel: string }) {
  const Icon = pain.icon
  return (
    <article
      data-appear
      className={clsx(
        'flex h-full flex-col rounded-card border border-white/10 bg-vinho-profundo p-5',
        'shadow-[0_0_0_1px_rgb(149_75_110/0.12),0_24px_60px_-20px_rgb(149_75_110/0.45)]',
        'bg-[radial-gradient(120%_80%_at_0%_0%,rgb(149_75_110/0.2)_0%,transparent_60%)]',
      )}
    >
      <span className="grid size-10 place-items-center rounded-sm bg-vinho text-white">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-[1.25rem] leading-tight font-semibold tracking-[-0.015em] text-white">
        {pain.title}
      </h3>
      <p className="mt-2 text-small text-white/70">{pain.text}</p>
      <Button
        variant="ghost"
        href={pain.href}
        className="mt-3 self-start text-[0.9375rem] text-white"
      >
        {linkLabel}
      </Button>
    </article>
  )
}
