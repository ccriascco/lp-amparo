import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import {
  AlertCircle,
  BadgeCheck,
  Building2,
  FileText,
  Gavel,
  ListChecks,
  MapPin,
  Phone,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { DireitosScreen } from '../components/phone/AppScreens'
import { Chip } from '../components/ui/Chip'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { SectionHeading } from '../components/ui/Section'
import { direitos as D } from '../content/copy'
import { gsap, ScrollTrigger } from '../lib/gsap'

/** Fundo do shell: superfície com manchas radiais de vinho a 18–25%. */
const SHELL_BG = [
  'radial-gradient(60% 55% at 6% 8%, rgb(149 75 110 / 0.22) 0%, transparent 70%)',
  'radial-gradient(55% 50% at 96% 14%, rgb(149 75 110 / 0.18) 0%, transparent 70%)',
  'radial-gradient(70% 60% at 82% 98%, rgb(149 75 110 / 0.25) 0%, transparent 72%)',
  'radial-gradient(50% 45% at 18% 92%, rgb(149 75 110 / 0.18) 0%, transparent 72%)',
  'var(--color-superficie)',
].join(',')

const CARD =
  'rounded-card-lg bg-white p-7 shadow-card transition-[translate,box-shadow] duration-300 ease-amparo hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none'

/**
 * `#direitos` (pedido do cliente, 11/11/2026): bento "Seus direitos, em linguagem simples" dentro de
 * um shell rosado. Centro: celular com a tela "Conteúdo e direitos" do app (2 linhas). Em volta,
 * um direito por cartão com um visual próprio; embaixo, o pedido sem advogado (2 colunas) e o
 * cartão vinho do Ligue 180. Microanimações só com a seção visível; movimento reduzido: estático
 * (o markup já é o estado final).
 */
export function Direitos() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 })
        // Chips das 5 violências entrando um a um.
        tl.fromTo(
          q('[data-dr-chip]'),
          { autoAlpha: 0, y: 10, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.18 },
          0,
        )
          // Passos "Delegacia → Pedido → Proteção" acendendo em sequência.
          .fromTo(
            q('[data-dr-step]'),
            { backgroundColor: '#ffffff', color: '#954b6e' },
            { backgroundColor: '#954b6e', color: '#ffffff', duration: 0.35, stagger: 0.55 },
            0.3,
          )
          .fromTo(
            q('[data-dr-arrow]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.35, ease: 'power2.out', stagger: 0.55 },
            0.55,
          )
          .to({}, { duration: 2.2 })
          .to(q('[data-dr-step]'), { backgroundColor: '#ffffff', color: '#954b6e', duration: 0.3 })
          .to(q('[data-dr-arrow]'), { scaleX: 0, duration: 0.3 }, '<')
          .to(q('[data-dr-chip]'), { autoAlpha: 0, duration: 0.3 }, '<')
        // Círculo de distância do mapa pulsando (laço próprio).
        const pulse = gsap.fromTo(
          q('[data-dr-ring]'),
          { scale: 0.85, opacity: 0.55 },
          { scale: 1.25, opacity: 0, duration: 2.2, ease: 'sine.out', repeat: -1, paused: true },
        )
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 75%',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) {
              tl.play()
              pulse.play()
            } else {
              tl.pause()
              pulse.pause()
            }
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="direitos"
      aria-labelledby="direitos-title"
      className="bg-branco p-3 md:p-4"
    >
      <div className="mx-auto rounded-[24px] px-5 py-20 md:px-8 md:py-28" style={{ background: SHELL_BG }}>
        <div className="mx-auto max-w-(--grid)">
          {/* Cabeçalho centralizado */}
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <div data-appear>
              <Chip dot variant="outline" className="bg-white">
                {D.chip}
              </Chip>
            </div>
            <SectionHeading id="direitos-title" className="mt-5">
              {D.h2}
            </SectionHeading>
            <p data-appear className="mt-6 lead text-pretty text-texto-secundario">
              {D.sub}
            </p>
          </div>

          {/* Bento: celular primeiro no celular; 3 colunas no desktop */}
          <ul
            data-appear-stagger
            className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]"
          >
            {/* Centro: celular com a tela do app saindo pela base */}
            <li className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative flex h-[440px] justify-center overflow-hidden rounded-card-lg bg-white shadow-card lg:h-full lg:min-h-[560px]">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(60% 50% at 50% 100%, rgb(149 75 110 / 0.16) 0%, transparent 70%)',
                  }}
                />
                <PhoneFrame
                  className="absolute top-10 w-[280px] lg:top-auto lg:-bottom-44 lg:w-[330px]"
                  label={D.altTela}
                >
                  <DireitosScreen />
                </PhoneFrame>
              </div>
            </li>

            <BentoCard
              className="lg:col-start-1 lg:row-start-1"
              icon={Gavel}
              title={D.tipos.title}
              text={D.tipos.text}
            >
              <ul aria-label={D.tipos.text} className="flex flex-wrap gap-2">
                {D.tipos.chips.map((c) => (
                  <li
                    key={c}
                    data-dr-chip
                    className="rounded-full border border-borda bg-superficie px-3.5 py-1.5 text-sm font-bold text-vinho-profundo"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              className="lg:col-start-1 lg:row-start-2"
              icon={ListChecks}
              title={D.sinais.title}
              text={D.sinais.text}
            >
              <ul className="space-y-2">
                {D.sinais.itens.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 rounded-sm bg-superficie px-3 py-2.5 text-[0.9375rem] font-semibold text-texto"
                  >
                    <AlertCircle aria-hidden className="size-[18px] shrink-0 text-vinho/70" strokeWidth={2} />
                    {s}
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              className="lg:col-start-3 lg:row-start-1"
              icon={FileText}
              title={D.semBoletim.title}
              text={D.semBoletim.text}
            >
              <DocVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-start-3 lg:row-start-2"
              icon={Radar}
              title={D.monitoramento.title}
              text={D.monitoramento.text}
            >
              <MapVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-span-2 lg:col-start-1 lg:row-start-3"
              icon={ShieldCheck}
              title={D.pedido.title}
              text={D.pedido.text}
              wide
            >
              <StepsVisual />
            </BentoCard>

            {/* Cartão vinho: Ligue 180 */}
            <li className="lg:col-start-3 lg:row-start-3">
              <article className="flex h-full flex-col rounded-card-lg bg-vinho p-7 text-white shadow-card transition-[translate,box-shadow] duration-300 ease-amparo hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none">
                <span aria-hidden className="grid size-11 place-items-center rounded-sm bg-white/15">
                  <Phone className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-xl leading-tight font-semibold">{D.ligue.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-pretty text-white/85">{D.ligue.text}</p>
                <a
                  href="tel:180"
                  className="mt-auto inline-flex min-h-12 w-max items-center gap-2 self-start rounded-full bg-white px-6 font-bold text-vinho-profundo transition-[scale,background-color] duration-200 hover:bg-superficie active:scale-[0.97] max-lg:mt-6 lg:mt-6"
                >
                  <Phone aria-hidden className="size-4" strokeWidth={2.25} />
                  {D.ligue.botao}
                </a>
              </article>
            </li>
          </ul>

          <p className="mx-auto mt-10 max-w-[60ch] text-center caption font-normal text-texto-secundario">
            {D.nota}
          </p>
        </div>
      </div>
    </section>
  )
}

function BentoCard({
  icon: Icon,
  title,
  text,
  className,
  wide,
  children,
}: {
  icon: LucideIcon
  title: string
  text: string
  className?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <li className={className}>
      <article
        className={clsx(
          CARD,
          'flex h-full flex-col gap-6',
          wide && 'md:flex-row md:items-center md:justify-between md:gap-10',
        )}
      >
        <div className={clsx(wide && 'md:max-w-[340px]')}>
          <span aria-hidden className="grid size-11 place-items-center rounded-sm bg-vinho text-white">
            <Icon className="size-5" strokeWidth={2} />
          </span>
          <h3 className="mt-5 font-display text-xl leading-tight font-semibold text-texto">{title}</h3>
          <p className="mt-2 text-[0.9375rem] text-pretty text-texto-secundario">{text}</p>
        </div>
        <div className={clsx(!wide && 'mt-auto', wide && 'md:flex-1')}>{children}</div>
      </article>
    </li>
  )
}

/** Documento estilizado com selo de check. */
function DocVisual() {
  return (
    <div aria-hidden className="flex justify-center rounded-card bg-superficie py-5">
      <div className="relative w-[170px] -rotate-2 rounded-sm bg-white p-4 shadow-card">
        <p className="text-[0.75rem] font-bold tracking-wide text-vinho">{D.semBoletim.doc}</p>
        <span className="mt-3 block h-1.5 w-full rounded-full bg-borda" />
        <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-borda" />
        <span className="mt-2 block h-1.5 w-3/5 rounded-full bg-borda" />
        <span className="absolute -right-4 -bottom-4 grid size-12 rotate-6 place-items-center rounded-full bg-confirma text-white shadow-float">
          <BadgeCheck className="size-6" strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}

/** Mini-mapa: ruas, dois pontos e o raio de distância em volta de um deles. */
function MapVisual() {
  return (
    <div
      aria-hidden
      className="relative h-[132px] overflow-hidden rounded-card bg-superficie"
      style={{
        backgroundImage:
          'linear-gradient(rgb(149 75 110 / 0.08) 2px, transparent 2px), linear-gradient(90deg, rgb(149 75 110 / 0.08) 2px, transparent 2px)',
        backgroundSize: '34px 34px',
      }}
    >
      <span className="absolute top-[46%] left-[-10%] h-3 w-[120%] -rotate-12 bg-white/80" />
      <span className="absolute top-0 left-[58%] h-full w-3 rotate-6 bg-white/80" />
      {/* Ponto protegido com o raio de distância */}
      <div className="absolute top-1/2 left-[32%] grid size-24 -translate-1/2 place-items-center">
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-vinho/40 bg-vinho/8" />
        <span data-dr-ring className="absolute inset-0 rounded-full border-2 border-vinho/60" />
        <span className="relative grid size-8 place-items-center rounded-full bg-vinho text-white shadow-card">
          <MapPin className="size-4" strokeWidth={2.25} />
        </span>
      </div>
      {/* Outro ponto, fora do raio */}
      <span className="absolute top-[30%] left-[78%] size-4 rounded-full border-[3px] border-white bg-vinho-profundo shadow-card" />
    </div>
  )
}

/** 3 passos em linha: Delegacia → Pedido → Proteção. */
function StepsVisual() {
  const icons: LucideIcon[] = [Building2, FileText, ShieldCheck]
  return (
    <ol aria-label={D.pedido.passos.join(', ')} className="flex items-center gap-2 sm:gap-3">
      {D.pedido.passos.map((p, i) => {
        const Icon = icons[i]
        return (
          <li key={p} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex flex-1 flex-col items-center gap-2">
              <span
                aria-hidden
                data-dr-step
                className="grid size-12 place-items-center rounded-full border-2 border-vinho/25 bg-vinho text-white"
              >
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <span className="text-sm font-bold text-vinho-profundo">{p}</span>
            </div>
            {i < D.pedido.passos.length - 1 && (
              <span
                aria-hidden
                data-dr-arrow
                className="mb-6 h-0.5 w-6 origin-left rounded-full bg-vinho/50 sm:w-10"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
