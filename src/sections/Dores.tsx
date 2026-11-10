import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { BookOpen, Calculator, FolderLock, Gauge, UsersRound, type LucideIcon } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import {
  DireitosScreen,
  HomeRiscoScreen,
  ProvaScreen,
  RedeScreen,
} from '../components/phone/AppScreens'
import { CalculatorScreen } from '../components/phone/CalculatorScreen'
import { Button } from '../components/ui/Button'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { Container } from '../components/ui/Section'
import { dores } from '../content/copy'
import { gsap, MQ, ScrollTrigger } from '../lib/gsap'

/** Ícone e tela do app de cada dor, na ordem do `copy.dores.items`. */
const ICONS: LucideIcon[] = [Calculator, FolderLock, UsersRound, Gauge, BookOpen]
const SCREENS: (() => ReactNode)[] = [
  () => <CalculatorScreen mode="auto" />,
  () => <ProvaScreen />,
  () => <RedeScreen />,
  () => <HomeRiscoScreen />,
  () => <DireitosScreen />,
]

/** Linhas diagonais finas (white/6) num canto do painel, como na NextPay. */
const LINES = {
  background:
    'repeating-linear-gradient(-45deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 12px)',
  maskImage: 'radial-gradient(70% 70% at 100% 0%, #000 0%, transparent 70%)',
  WebkitMaskImage: 'radial-gradient(70% 70% at 100% 0%, #000 0%, transparent 70%)',
} as const

/**
 * `#dores` (refação pedida pelo cliente em 10/11/2026, padrão NextPay "Vantagens do App"; substitui
 * o `QuestionStage` do §6.32). Desktop: as 5 dores à esquerda rolam normalmente; à direita, um
 * painel fixo com o celular mostra a tela do recurso do item mais próximo do centro da tela (crossfade
 * com deslize vertical) e o chip do recurso flutua ao lado. Celular: sem sticky, cada item com a sua
 * tela num celular menor. Movimento reduzido: tudo estático, mostrando a primeira tela.
 */
export function Dores() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.desktop, () => {
        const q = gsap.utils.selector(root)
        const items = q('[data-dor-item]')
        const cards = q('[data-dor-card]')
        const screens = q('[data-dor-screen]')
        const chips = q('[data-dor-chip]')
        let current = 0

        gsap.set(cards, { opacity: (i: number) => (i === 0 ? 1 : 0.4) })

        const activate = (i: number) => {
          if (i === current) return
          const prev = current
          current = i
          cards.forEach((c, j) => c.setAttribute('data-active', String(j === i)))
          gsap.to(cards, {
            opacity: (j: number) => (j === i ? 1 : 0.4),
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          // Tela antiga sai para cima, a nova entra de baixo (crossfade de 0,5s).
          gsap.to(screens[prev], {
            autoAlpha: 0,
            yPercent: -6,
            duration: 0.5,
            ease: 'power2.inOut',
            overwrite: 'auto',
          })
          gsap.fromTo(
            screens[i],
            { autoAlpha: 0, yPercent: 6 },
            { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' },
          )
          // Chip do recurso no cartão flutuante ao lado do celular.
          gsap.to(chips[prev], {
            autoAlpha: 0,
            y: -10,
            scale: 0.96,
            duration: 0.3,
            ease: 'power2.in',
            overwrite: 'auto',
          })
          gsap.fromTo(
            chips[i],
            { autoAlpha: 0, y: 14, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              delay: 0.15,
              ease: 'back.out(1.6)',
              overwrite: 'auto',
            },
          )
        }

        // Ativo = o item cujo bloco cruza o centro da tela.
        items.forEach((it, i) => {
          ScrollTrigger.create({
            trigger: it,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => self.isActive && activate(i),
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="dores"
      aria-labelledby="dores-title"
      data-header-dark
      className="on-dark relative bg-vinho-profundo"
    >
      <Container className="pt-24 pb-24 md:pt-28 lg:pb-28">
        {/* Topo à esquerda */}
        <div className="max-w-[760px]">
          <h2
            id="dores-title"
            data-words
            className="max-w-[20ch] display-l text-balance text-white"
          >
            {dores.h2}
          </h2>
          <p data-appear className="mt-5 max-w-[44ch] lead text-pretty text-white/70">
            {dores.intro}
          </p>
        </div>

        <div className="mt-12 lg:mt-4 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Esquerda: as 5 dores, rolando normalmente */}
          <ul className="flex flex-col gap-14 lg:col-span-5 lg:gap-0">
            {dores.items.map((d, i) => {
              const Icon = ICONS[i]
              return (
                <li
                  key={d.title}
                  data-dor-item
                  data-appear
                  className="lg:flex lg:min-h-[72vh] lg:items-center"
                >
                  <article
                    data-dor-card
                    data-active={i === 0}
                    className="rounded-card-lg border border-white/10 bg-white/5 p-6 transition-[border-color] duration-300 focus-within:opacity-100! data-[active=true]:border-white/20 sm:p-8"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 caption text-white">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                      {d.chip}
                    </span>
                    <h3 className="mt-5 font-display text-[1.625rem] leading-tight font-semibold tracking-[-0.02em] text-balance text-white">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-pretty text-white/70">{d.answer}</p>
                    <Button variant="ghost" href={d.href} className="mt-4 text-white">
                      {dores.link}
                    </Button>
                  </article>

                  {/* Celular: a tela do item logo abaixo, num celular menor */}
                  <div
                    aria-hidden
                    className="relative mt-4 h-[380px] overflow-hidden rounded-card-lg lg:hidden"
                    style={{ background: 'var(--grad-vinho)' }}
                  >
                    <div className="absolute inset-0" style={LINES} />
                    <PhoneFrame
                      decorative
                      className="absolute top-8 left-1/2 w-[240px] -translate-x-1/2"
                    >
                      {SCREENS[i]()}
                    </PhoneFrame>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Direita: painel fixo com o celular (desktop) */}
          <div aria-hidden className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-[15vh] h-[70vh]">
              {/* Brilho vinho a 25% atrás do painel */}
              <div
                className="pointer-events-none absolute -inset-24"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, rgb(149 75 110 / 0.25) 0%, transparent 70%)',
                }}
              />
              <div
                className="relative h-full overflow-hidden rounded-card-lg"
                style={{ background: 'var(--grad-vinho)' }}
              >
                <div className="absolute inset-0" style={LINES} />
                <PhoneFrame
                  decorative
                  className="absolute top-[12%] left-1/2 w-[min(300px,44%)] -translate-x-1/2"
                >
                  <div className="relative h-full w-full">
                    {dores.items.map((d, i) => (
                      <div
                        key={d.chip}
                        data-dor-screen
                        className={clsx('absolute inset-0', i > 0 && 'invisible opacity-0')}
                      >
                        {SCREENS[i]()}
                      </div>
                    ))}
                  </div>
                </PhoneFrame>

                {/* Chip do recurso num cartão flutuante ao lado do celular */}
                <div className="absolute top-[42%] left-[calc(50%-min(150px,22%)-170px)] z-10">
                  {dores.items.map((d, i) => {
                    const Icon = ICONS[i]
                    return (
                      <div
                        key={d.chip}
                        data-dor-chip
                        className={clsx(
                          'absolute top-0 left-0 flex w-max items-center gap-3 rounded-card bg-white py-3 pr-5 pl-3 shadow-float',
                          i > 0 && 'invisible opacity-0',
                        )}
                      >
                        <span className="grid size-9 place-items-center rounded-full bg-vinho text-white">
                          <Icon className="size-[18px]" strokeWidth={1.75} />
                        </span>
                        <span className="font-display text-base font-bold text-texto">
                          {d.chip}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-8">
          <Button variant="secondary-dark" href={dores.button.href}>
            {dores.button.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
