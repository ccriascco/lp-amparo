import {
  ArrowDown,
  Calculator,
  Check,
  MapPin,
  MousePointer2,
  ShieldCheck,
  Siren,
  Smartphone,
} from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { CalculatorScreen, type CalculatorHandle } from '../components/phone/CalculatorScreen'
import { AlertScreen } from '../components/phone/AlertScreen'
import { HomeScreen } from '../components/phone/HomeScreen'
import { ProofScreen } from '../components/phone/ProofScreen'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { CircularBadge } from '../components/ui/CircularBadge'
import { ConcentricRings } from '../components/ui/ConcentricRings'
import { FloatCard, Initials } from '../components/ui/FloatCard'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { Container } from '../components/ui/Section'
import { a11y, cta, hero, recursos, ui } from '../content/copy'
import { APP_URL } from '../lib/config'
import { useHeroMotion } from '../motion/useHeroMotion'

/** Hero "Desbloqueio" (DESIGN.md §9 Hero, §7.1). */
export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const calc = useRef<CalculatorHandle>(null)
  const { replay } = useHeroMotion(root, calc)

  return (
    <section id="inicio" aria-labelledby="hero-title" className="px-3 pt-3 md:px-4 md:pt-4">
      <div
        ref={root}
        data-hero
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden rounded-[28px] border border-borda/60 bg-white md:min-h-[880px] md:rounded-shell"
      >
        {/* Véu vinho que se espalha a partir do "=" no desbloqueio */}
        <div
          data-hero-veil
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: 'var(--grad-suave)' }}
        />

        <Container className="relative z-10 pt-28 text-center md:pt-36">
          <div data-hero-chip>
            <Chip icon={<ShieldCheck />}>{hero.chip}</Chip>
          </div>
          <h1
            id="hero-title"
            data-hero-title
            className="mt-6 display-xl text-texto max-md:text-[clamp(2.5rem,12.4vw,3rem)]"
          >
            <span className="block lg:inline">{hero.h1Lines[0]}</span>{' '}
            <span className="block lg:inline">{hero.h1Lines[1]}</span>
          </h1>
          <div data-hero-rest className="mx-auto max-w-[820px]">
            <p className="mx-auto mt-6 max-w-[52ch] lead text-texto-secundario">{hero.sub}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />}>
                {cta.acessar}
              </Button>
              <Button variant="secondary" href="#disfarce" icon={<ArrowDown />}>
                {hero.ctaSecondary}
              </Button>
            </div>
            <ul className="mt-6 flex flex-col items-center justify-center gap-x-6 gap-y-2 text-small text-texto-secundario sm:flex-row sm:flex-wrap">
              {hero.checks.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <Check className="size-4 text-vinho" strokeWidth={2.5} aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 caption text-texto-secundario">{hero.caption}</p>
          </div>
        </Container>

        {/* Palco dos celulares, cortado pela base do shell */}
        <div
          data-hero-stage
          className="relative mt-12 h-[400px] shrink-0 grow md:mt-14 md:h-[460px] lg:h-[500px]"
        >
          <ConcentricRings
            r={150}
            className="absolute top-[230px] left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          {/* Celulares laterais (só ≥ 768px) */}
          <div
            data-hero-side="left"
            className="absolute top-[90px] left-[calc(50%-400px)] hidden w-[255px] md:block lg:left-[calc(50%-430px)] lg:w-[272px]"
            style={{ transform: 'rotate(-12deg)' }}
          >
            <IconBubble icon={<MapPin />} className="-top-7 left-[58%]" />
            <PhoneFrame decorative>
              <AlertScreen />
            </PhoneFrame>
          </div>
          <div
            data-hero-side="right"
            className="absolute top-[90px] right-[calc(50%-400px)] hidden w-[255px] md:block lg:right-[calc(50%-430px)] lg:w-[272px]"
            style={{ transform: 'rotate(12deg)' }}
          >
            <IconBubble icon={<ShieldCheck />} className="-top-7 left-[22%]" flip />
            <PhoneFrame decorative>
              <ProofScreen />
            </PhoneFrame>
          </div>

          {/* Celular central: calculadora → tela inicial */}
          <div
            data-hero-phone
            className="absolute top-0 left-1/2 w-[248px] -translate-x-1/2 md:w-[300px] lg:w-[320px]"
          >
            <PhoneFrame screenClassName="bg-black" label={a11y.altHome}>
              <div className="relative h-full w-full">
                <div data-hero-home className="absolute inset-0">
                  <HomeScreen />
                </div>
                <div data-hero-calc className="absolute inset-0 opacity-0">
                  <CalculatorScreen mode="auto" ref={calc} />
                </div>
              </div>
            </PhoneFrame>
            <button
              type="button"
              data-hero-replay
              onClick={replay}
              className="absolute top-6 -right-3 hidden translate-x-full items-center gap-1.5 rounded-full border border-borda bg-white/90 px-3.5 py-2 text-[0.8125rem] font-bold text-vinho-profundo backdrop-blur hover:text-vinho lg:inline-flex"
            >
              <span aria-hidden>↺</span> {ui.verDeNovo}
            </button>
          </div>

          {/* Pílulas inclinadas (links âncora) */}
          <a
            data-hero-pop
            data-depth="-60"
            href="#disfarce"
            className="absolute top-2 left-[4%] z-10 flex -rotate-6 items-center gap-2.5 rounded-full border border-borda bg-white py-2 pr-4 pl-2 shadow-float md:-top-6 md:top-6 lg:left-[calc(50%-560px)]"
          >
            <span className="grid size-8 place-items-center rounded-full bg-vinho text-white">
              <Calculator className="size-4" strokeWidth={2} />
            </span>
            <span className="text-[0.9375rem] font-bold text-texto">{recursos.items[5].title}</span>
          </a>
          <a
            data-hero-pop
            data-depth="-110"
            href="#sos"
            className="absolute top-6 right-[calc(50%-560px)] z-10 hidden rotate-6 items-center gap-2.5 rounded-full border border-borda bg-white py-2 pr-4 pl-2 shadow-float lg:flex"
          >
            <span className="grid size-8 place-items-center rounded-full bg-vinho text-white">
              <Siren className="size-4" strokeWidth={2} />
            </span>
            <span className="text-[0.9375rem] font-bold text-texto">{recursos.items[0].title}</span>
          </a>

          {/* Cartões flutuantes */}
          <div
            data-hero-pop
            data-depth="-40"
            className="absolute top-[230px] right-[3%] z-10 w-[200px] md:top-[70px] md:right-auto md:left-[2%] md:w-[230px] lg:left-[calc(50%-600px)]"
          >
            <FloatCard
              tone="confirma"
              icon={<Check strokeWidth={2.75} />}
              title={ui.alertaEnviado.title}
              text={ui.alertaEnviado.text}
            />
          </div>
          <div
            data-hero-pop
            data-depth="-90"
            className="absolute top-[210px] right-[2%] z-10 hidden w-[230px] md:block lg:right-[calc(50%-600px)]"
          >
            <FloatCard
              tone="confirma"
              icon={
                <Initials className="size-9 text-[0.8125rem]">{ui.confirmou.initials}</Initials>
              }
              title={ui.confirmou.name}
              text={<span className="font-semibold text-confirma">{ui.confirmou.status}</span>}
              className="[&>span:first-child]:bg-transparent"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 z-10 hidden lg:block">
          <CircularBadge />
        </div>
      </div>
    </section>
  )
}

/** Círculo vinho com ícone sobre os celulares laterais + seta de cursor (ref. Task.io). */
function IconBubble({
  icon,
  className,
  flip,
}: {
  icon: ReactNode
  className?: string
  flip?: boolean
}) {
  return (
    <span data-hero-pop className={`absolute z-10 flex items-end gap-1 ${className ?? ''}`}>
      <span className="grid size-14 place-items-center rounded-full border-4 border-white bg-vinho text-white shadow-float [&>svg]:size-5">
        {icon}
      </span>
      <MousePointer2
        aria-hidden
        className={`size-5 fill-vinho-profundo text-vinho-profundo ${flip ? '-scale-x-100' : ''}`}
        strokeWidth={1.5}
      />
    </span>
  )
}
