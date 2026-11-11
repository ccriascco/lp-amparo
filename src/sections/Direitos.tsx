import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { FileText, Gavel, ListChecks, Radar, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import {
  MonitoramentoArt,
  PedidoArt,
  SemBoletimArt,
  SinaisArt,
  TiposArt,
} from '../components/direitos/DireitosArt'
import { DireitosScreen } from '../components/phone/AppScreens'
import { Chip } from '../components/ui/Chip'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { Container, SectionHeading } from '../components/ui/Section'
import { direitos as D } from '../content/copy'
import { gsap, ScrollTrigger } from '../lib/gsap'

/** Cartão branco do bento (pedido do cliente): borda #E4D3D9 apagada, sombra suave, hover sobe 4px. */
const CARD = clsx(
  'rounded-card-lg border border-[rgb(228_211_217/0.55)] bg-white',
  'shadow-[0_1px_2px_rgb(75_42_63/0.04),0_16px_40px_-24px_rgb(75_42_63/0.16)]',
  'transition-[translate,box-shadow,border-color] duration-300 ease-amparo motion-reduce:transition-none',
  'hover:-translate-y-1 hover:border-[rgb(149_75_110/0.25)] hover:shadow-[0_2px_4px_rgb(75_42_63/0.05),0_24px_48px_-24px_rgb(75_42_63/0.24)]',
)

/**
 * `#direitos` (pedido do cliente): bento "Seus direitos" em fundo branco. Centro: celular com a
 * tela "Conteúdo e direitos" (lista rolando devagar) e um badge flutuando. Em volta, um direito por
 * cartão, cada um com uma ilustração animada própria (`DireitosArt`) no mesmo lugar (embaixo do
 * texto); embaixo, o pedido sem advogado em 3 colunas. Movimento reduzido: tudo no estado final.
 */
export function Direitos() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        // Lista da tela rolando devagar e o badge flutuando, só com o cartão na tela.
        const list = gsap.fromTo(
          q('[data-dr-list]'),
          { y: 0 },
          { y: -120, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true },
        )
        const badge = gsap.fromTo(
          q('[data-dr-badge]'),
          { y: -6 },
          { y: 6, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true },
        )
        ScrollTrigger.create({
          trigger: q('[data-dr-phone]')[0],
          start: 'top 90%',
          end: 'bottom 10%',
          onToggle: (self) => [list, badge].forEach((t) => (self.isActive ? t.play() : t.pause())),
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
      className="bg-branco py-20 md:py-28"
    >
      <Container>
        {/* Cabeçalho centralizado */}
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <div data-appear>
            <Chip dot>{D.chip}</Chip>
          </div>
          <SectionHeading id="direitos-title" className="mt-5">
            {D.h2}
          </SectionHeading>
          <p data-appear className="mt-6 lead text-pretty text-texto-secundario">
            {D.sub}
          </p>
        </div>

        {/* Bento: celular primeiro no celular; 3 colunas no desktop */}
        <ul data-appear-stagger className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3">
          {/* Centro: celular com a tela do app saindo pela base */}
          <li className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div
              data-dr-phone
              className={clsx(CARD, 'relative flex h-[440px] justify-center overflow-hidden lg:h-full lg:min-h-[560px]')}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(60% 50% at 50% 100%, rgb(149 75 110 / 0.12) 0%, transparent 70%)',
                }}
              />
              <PhoneFrame
                className="absolute top-12 w-[280px] lg:top-[30%] lg:w-[330px]"
                label={D.altTela}
              >
                <DireitosScreen />
              </PhoneFrame>
              <span
                data-dr-badge
                aria-hidden
                className="absolute top-4 right-4 rounded-full border border-borda/70 bg-white px-3.5 py-2 font-display text-[12px] font-semibold whitespace-nowrap text-vinho-profundo shadow-card lg:top-[14%] lg:right-auto lg:left-1/2 lg:-translate-x-1/2"
              >
                {D.art.badge}
              </span>
            </div>
          </li>

          <BentoCard className="lg:col-start-1 lg:row-start-1" icon={Gavel} title={D.tipos.title} text={D.tipos.text}>
            <TiposArt />
          </BentoCard>
          <BentoCard className="lg:col-start-1 lg:row-start-2" icon={ListChecks} title={D.sinais.title} text={D.sinais.text}>
            <SinaisArt />
          </BentoCard>
          <BentoCard className="lg:col-start-3 lg:row-start-1" icon={FileText} title={D.semBoletim.title} text={D.semBoletim.text}>
            <SemBoletimArt />
          </BentoCard>
          <BentoCard className="lg:col-start-3 lg:row-start-2" icon={Radar} title={D.monitoramento.title} text={D.monitoramento.text}>
            <MonitoramentoArt />
          </BentoCard>
          <BentoCard
            className="lg:col-span-3 lg:row-start-3"
            icon={ShieldCheck}
            title={D.pedido.title}
            text={D.pedido.text}
            wide
          >
            <PedidoArt />
          </BentoCard>
        </ul>

        <p className="mx-auto mt-10 max-w-[60ch] text-center caption font-normal text-texto-secundario">
          {D.nota}
        </p>
      </Container>
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
        data-dr-card
        className={clsx(
          CARD,
          'flex h-full flex-col gap-6 p-7',
          wide && 'md:flex-row md:items-center md:gap-10',
        )}
      >
        <div className={clsx(wide && 'md:w-[40%] md:shrink-0')}>
          <span aria-hidden className="grid size-11 place-items-center rounded-sm bg-vinho text-white">
            <Icon className="size-5" strokeWidth={1.5} />
          </span>
          <h3 className="mt-5 font-display text-xl leading-tight font-semibold text-texto">{title}</h3>
          <p className="mt-2 text-[0.9375rem] text-pretty text-texto-secundario">{text}</p>
        </div>
        {/* Área visual sempre embaixo do texto (no cartão largo, à direita) */}
        <div className={clsx('mt-auto', wide && 'md:mt-0 md:flex-1')}>{children}</div>
      </article>
    </li>
  )
}
