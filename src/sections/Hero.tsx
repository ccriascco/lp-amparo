import clsx from 'clsx'
import {
  ArrowDown,
  Calculator,
  Check,
  FolderLock,
  MousePointer2,
  ShieldCheck,
  Siren,
  Smartphone,
  UsersRound,
} from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { HomeSosScreen, OcorrenciasScreen, RedeScreen } from '../components/phone/AppScreens'
import { CalculatorScreen, type CalculatorHandle } from '../components/phone/CalculatorScreen'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { CircularBadge } from '../components/ui/CircularBadge'
import { NotificationCard } from '../components/ui/NotificationCard'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { Container } from '../components/ui/Section'
import { a11y, cta, hero, recursos, ui } from '../content/copy'
import { APP_URL } from '../lib/config'
import { useHeroMotion } from '../motion/useHeroMotion'

/** Pilha de notificações (a mais nova em cima). Estado final; a timeline faz elas chegarem. */
const STACK: CSSProperties[] = [
  { transform: 'translateY(0px) scale(1)', opacity: 1, zIndex: 3 },
  { transform: 'translateY(14px) scale(0.94)', opacity: 0.75, zIndex: 2 },
  { transform: 'translateY(28px) scale(0.88)', opacity: 0.45, zIndex: 1 },
]

/** Hero "Desbloqueio" (DESIGN §9 Hero, §7.1): de ponta a ponta, sem card. */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const calc = useRef<CalculatorHandle>(null)
  const { replay } = useHeroMotion(root, calc)

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      data-hero
      className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip bg-white pb-16 md:pb-20"
    >
      {/* Fundo: gradiente do hero + anéis, visíveis desde o carregamento (ajuste do cliente).
          Recortado nesta camada e dissolvido no branco nos últimos 200px, sem linha na base. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden mask-[linear-gradient(180deg,#000_calc(100%-200px),transparent)]"
      >
        <div data-hero-veil className="absolute inset-0" style={{ background: 'var(--grad-hero)' }}>
          <HeroRings />
        </div>
      </div>

      <Container className="relative z-10 pt-32 text-center md:pt-40">
        <div data-hero-text>
          <div data-hero-chip>
            <Chip icon={<ShieldCheck />}>{hero.chip}</Chip>
          </div>
          <h1 id="hero-title" data-hero-title className="mt-6 display-xl text-texto">
            {hero.h1}
          </h1>
          <div data-hero-rest className="mx-auto max-w-[820px]">
            <p className="mx-auto mt-6 max-w-[52ch] lead text-pretty text-texto-secundario">
              {hero.sub}
            </p>
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
          </div>
        </div>
      </Container>

      {/* Palco dos celulares: os 3 aparecem inteiros (altura = celular + leque + flutuação) */}
      <div
        data-hero-stage
        className="relative mt-12 h-[560px] shrink-0 md:mt-14 md:h-[690px] lg:h-[730px]"
      >
        <div
          data-hero-side="left"
          className="absolute top-[90px] left-[calc(50%-400px)] hidden w-[255px] md:block lg:left-[calc(50%-430px)] lg:w-[272px]"
          style={{ transform: 'rotate(-12deg)' }}
        >
          <div data-hero-side-inner className="relative">
            <div data-hero-float className="relative isolate">
              <IconBubble icon={<UsersRound />} className="-top-7 left-[58%]" />
              <PhoneFrame decorative className="z-0">
                <RedeScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
        <div
          data-hero-side="right"
          className="absolute top-[90px] right-[calc(50%-400px)] hidden w-[255px] md:block lg:right-[calc(50%-430px)] lg:w-[272px]"
          style={{ transform: 'rotate(12deg)' }}
        >
          <div data-hero-side-inner className="relative">
            <div data-hero-float className="relative isolate">
              <IconBubble icon={<FolderLock />} className="-top-7 left-[22%]" flip />
              <PhoneFrame decorative className="z-0">
                <OcorrenciasScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Celular central: calculadora → tela inicial. Reto e centralizado; ao rolar só sobe. */}
        <div
          data-hero-phone
          className="absolute top-0 left-1/2 z-[5] w-[248px] -translate-x-1/2 md:w-[300px] lg:w-[320px]"
        >
          <div data-hero-float>
            <PhoneFrame screenClassName="bg-black" label={a11y.altHome}>
              <div className="relative h-full w-full">
                <div data-hero-home className="absolute inset-0">
                  <HomeSosScreen />
                </div>
                <div data-hero-calc className="absolute inset-0 opacity-0">
                  <CalculatorScreen mode="auto" compact ref={calc} />
                </div>
                {/* Pulso de luz no "=" (centro medido na tecla durante a timeline) */}
                <div
                  data-hero-glow
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background:
                      'radial-gradient(70% 45% at var(--gx, 75%) var(--gy, 85%), rgb(255 255 255 / 0.9) 0%, rgb(149 75 110 / 0.4) 40%, transparent 72%)',
                  }}
                />
              </div>
            </PhoneFrame>
          </div>
          <button
            type="button"
            data-hero-replay
            onClick={replay}
            style={{ visibility: 'hidden' }}
            className="absolute top-6 -left-3 hidden -translate-x-full items-center gap-1.5 rounded-full border border-borda bg-white/90 px-3.5 py-2 text-[0.8125rem] font-bold text-vinho-profundo transition-[color,transform] duration-250 hover:text-vinho active:scale-[0.97] lg:inline-flex"
          >
            <span aria-hidden>↺</span> {ui.verDeNovo}
          </button>
        </div>

        <Pill
          href="#disfarce"
          depth={-60}
          icon={<Calculator />}
          label={recursos.items[5].title}
          className="top-2 left-[4%] -rotate-6 md:-top-4 lg:left-[calc(50%-560px)]"
        />
        <Pill
          href="#sos"
          depth={-110}
          icon={<Siren />}
          label={recursos.items[0].title}
          className="-top-4 right-[calc(50%-570px)] hidden rotate-6 lg:flex"
        />

        {/* Notificações empilhadas (padrão Eduzz), à direita do celular central */}
        <div
          data-hero-pop
          data-depth="-90"
          data-hero-notifs
          className="absolute top-[150px] right-[3%] z-20 h-[110px] w-[250px] md:top-[200px] md:right-auto md:left-[calc(50%+140px)] md:w-[280px] lg:top-[190px] lg:left-[calc(50%+190px)]"
        >
          {hero.notifications.map((n, i) => (
            <NotificationCard
              key={n.title}
              title={n.title}
              text={n.text}
              time={n.time}
              className={clsx(
                'absolute top-0 left-0 origin-top max-md:w-[250px]',
                i > 0 && 'max-md:hidden',
              )}
              style={STACK[i]}
            />
          ))}
        </div>
      </div>

      <div data-hero-pop className="absolute bottom-8 left-8 z-10 hidden lg:block">
        <CircularBadge />
      </div>
    </section>
  )
}

/** Anéis do hero (§6.19, variante `hero`): 12 anéis a cada 90px, centrados no celular central. */
function HeroRings() {
  const rings = Array.from({ length: 12 }, (_, i) => 150 + i * 90)
  const max = rings[rings.length - 1]
  return (
    <svg
      data-rings
      aria-hidden
      viewBox={`${-max - 2} ${-max - 2} ${max * 2 + 4} ${max * 2 + 4}`}
      className="pointer-events-none absolute top-[calc(100%-370px)] left-1/2 h-[2600px] w-[2600px] -translate-x-1/2 -translate-y-1/2 md:top-[calc(100%-460px)] lg:top-[calc(100%-480px)]"
      fill="none"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          data-ring
          r={r}
          stroke={`rgb(149 75 110 / ${(0.18 - (i * 0.1) / 11).toFixed(3)})`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

function Pill({
  href,
  depth,
  icon,
  label,
  className,
}: {
  href: string
  depth: number
  icon: ReactNode
  label: string
  className?: string
}) {
  return (
    <a
      data-hero-pop
      data-depth={depth}
      href={href}
      className={clsx(
        'absolute z-10 flex items-center gap-2.5 rounded-full border border-borda bg-white py-2 pr-4 pl-2 shadow-float transition-[translate] duration-300 ease-amparo hover:-translate-y-0.5',
        className,
      )}
    >
      <span className="grid size-8 place-items-center rounded-full bg-vinho text-white [&>svg]:size-4">
        {icon}
      </span>
      <span className="text-[0.9375rem] font-bold text-texto">{label}</span>
    </a>
  )
}

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
    <span data-hero-pop className={clsx('absolute z-20 flex items-end gap-1', className)}>
      <span className="grid size-14 place-items-center rounded-full border-4 border-white bg-vinho text-white shadow-float [&>svg]:size-5">
        {icon}
      </span>
      <MousePointer2
        aria-hidden
        className={clsx('size-5 fill-vinho-profundo text-white', flip && '-scale-x-100')}
        strokeWidth={1.5}
      />
    </span>
  )
}
