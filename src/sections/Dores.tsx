import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { BookOpen, Calculator, FolderLock, Gauge, UsersRound, type LucideIcon } from 'lucide-react'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import {
  DireitosScreen,
  OcorrenciasScreen,
  RedeScreen,
  RiscoFocoScreen,
} from '../components/phone/AppScreens'
import { CalculatorScreen } from '../components/phone/CalculatorScreen'
import { Button } from '../components/ui/Button'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { Container } from '../components/ui/Section'
import { Picture } from '../components/ui/TintedPhoto'
import { dores } from '../content/copy'
import { gsap, MQ, ScrollTrigger } from '../lib/gsap'

/** Ícone e tela do app de cada dor, na ordem do `copy.dores.items`. Nenhuma repete o hero. */
const ICONS: LucideIcon[] = [Calculator, FolderLock, UsersRound, Gauge, BookOpen]
const SCREENS: (() => ReactNode)[] = [
  () => <CalculatorScreen mode="auto" />,
  () => <OcorrenciasScreen />,
  () => <RedeScreen />,
  // tela inicial já rolada até a leitura de risco; o destaque do card é animado no desktop
  () => <RiscoFocoScreen />,
  () => <DireitosScreen />,
]

/**
 * Painel atrás do celular (ajustes 3 do cliente): vinho #954B6E, mais claro e vivo que o fundo da
 * seção (como o azul claro da NextPay), brilho branco 12% num canto, linhas brancas 8% no oposto.
 */
const PANEL: CSSProperties = {
  background:
    'radial-gradient(70% 70% at 0% 0%, rgb(255 255 255 / 0.14) 0%, transparent 70%), #954b6e',
  border: '1px solid rgb(255 255 255 / 0.12)',
  boxShadow: '0 40px 80px -30px rgb(0 0 0 / 0.45)',
}
/**
 * Fundo do cartão único: degradê vertical só com as cores do app, #4B2A3F no topo (atrás da foto)
 * até #954B6E na base. As paradas seguram o tom escuro por mais tempo, para o painel do celular
 * (#954B6E com brilho) continuar mais claro que o fundo durante quase toda a lista.
 */
const CARD_BG =
  'linear-gradient(180deg, #4b2a3f 0%, #4b2a3f 18%, #5e3350 50%, #7a3f60 85%, #954b6e 100%)'

/** A foto some na base (últimos ~45%) e na esquerda (primeiros ~35%), em curva suave. */
const MASK_V =
  'linear-gradient(180deg, #000 0%, #000 55%, rgb(0 0 0 / 0.7) 66%, rgb(0 0 0 / 0.35) 78%, rgb(0 0 0 / 0.1) 90%, transparent 100%)'
const MASK_H =
  'linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.1) 10%, rgb(0 0 0 / 0.4) 20%, rgb(0 0 0 / 0.75) 29%, #000 35%)'
const PHOTO_MASK: CSSProperties = {
  maskImage: `${MASK_V}, ${MASK_H}`,
  WebkitMaskImage: `${MASK_V}, ${MASK_H}`,
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
}

/** Véu #4B2A3F 60% só atrás do título e do subtítulo, sem bordas. */
const TEXT_SCRIM: CSSProperties = {
  background: [
    'radial-gradient(60% 38% at 55% 52%, rgb(75 42 63 / 0.6) 0%, rgb(75 42 63 / 0.3) 45%, transparent 75%)',
    'radial-gradient(45% 30% at 18% 88%, rgb(75 42 63 / 0.6) 0%, rgb(75 42 63 / 0.25) 50%, transparent 80%)',
  ].join(','),
}

const PANEL_LINES: CSSProperties = {
  background:
    'repeating-linear-gradient(-45deg, rgb(255 255 255 / 0.08) 0 1px, transparent 1px 12px)',
  maskImage: 'radial-gradient(70% 70% at 100% 100%, #000 0%, transparent 70%)',
  WebkitMaskImage: 'radial-gradient(70% 70% at 100% 100%, #000 0%, transparent 70%)',
}

/**
 * `#dores` (refação pedida pelo cliente em 10/11/2026, padrão NextPay; substitui o §6.32). Seção branca
 * com um único cartão (banner + lista no mesmo fundo vinho em degradê, sem divisão).
 * 1) Banner no topo (NextPay "Uma experiência. Controle total."): foto em tela cheia num cartão com
 *    margem igual nos 4 lados, título gigante em duas linhas desencontradas, subtítulo e pílulas.
 * 2) Lista: as 5 dores à esquerda rolam normalmente; à direita, um painel claro fixo com o celular
 *    mostra a tela do recurso do item mais próximo do centro (crossfade com deslize) e o chip do
 *    recurso flutua ao lado. Celular: sem sticky, cada item com a sua tela num celular menor.
 * Movimento reduzido: tudo estático (banner no estado final, primeira tela no celular).
 */
export function Dores() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const q = gsap.utils.selector(root)

      // ── Banner (desktop e celular) ───────────────────────────────
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        const banner = q('[data-banner]')[0]
        const leave = { trigger: banner, start: 'top top', end: 'bottom top', scrub: true }
        // Entrada do cartão (pedido do cliente, 11/11): cresce até o tamanho final enquanto entra
        // na tela, acompanhando o scroll. Escala termina em 1 (identidade), sem afetar o sticky.
        const card = q('[data-dores-card]')[0]
        gsap.fromTo(
          card,
          { scale: desktop ? 0.86 : 0.92 },
          {
            scale: 1,
            ease: 'none',
            transformOrigin: '50% 0%',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 15%', scrub: true },
          },
        )
        // Enquanto o banner sai: a foto sobe mais devagar que o texto e escurece, dissolvendo no
        // fundo do cartão; o título sobe e perde opacidade aos poucos (padrão NextPay).
        gsap.to(q('[data-banner-photo]'), {
          yPercent: desktop ? 15 : 8,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: leave,
        })
        gsap.to(q('[data-banner-title]'), {
          y: desktop ? -90 : -40,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: leave,
        })
        // Entrada: linha 1 vem da esquerda, linha 2 da direita; depois chip, subtítulo e pílulas.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: banner, start: 'top 70%', once: true },
        })
        const blurIn = { duration: 1, ease: 'expo.out', clearProps: 'filter' }
        tl.from(q('[data-banner-line="1"]'), {
          x: -80,
          autoAlpha: 0,
          filter: 'blur(12px)',
          ...blurIn,
        })
          .from(
            q('[data-banner-line="2"]'),
            { x: 80, autoAlpha: 0, filter: 'blur(12px)', ...blurIn },
            0.12,
          )
          .from(
            q('[data-banner-appear]'),
            {
              autoAlpha: 0,
              y: 32,
              filter: 'blur(8px)',
              duration: 0.9,
              ease: 'expo.out',
              stagger: 0.08,
              clearProps: 'filter',
            },
            0.25,
          )
      })

      // ── Lista com o celular fixo (desktop) ───────────────────────
      mm.add(MQ.desktop, () => {
        const items = q('[data-dor-item]')
        const cards = q('[data-dor-card]')
        const screens = q('[data-dor-screen]')
        const chips = q('[data-dor-chip]')
        let current = 0
        gsap.set(screens, { autoAlpha: (i: number) => (i === 0 ? 1 : 0), yPercent: 0 })
        gsap.set(chips, { autoAlpha: (i: number) => (i === 0 ? 1 : 0), y: 0, scale: 1 })

        gsap.set(cards, { opacity: (i: number) => (i === 0 ? 1 : 0.4) })

        const activate = (i: number) => {
          if (i === current) return
          const prev = current
          current = i
          // Trocas rápidas: cancela tudo o que estava agendado (a entrada do chip tem atraso e
          // "ressuscitava" um chip antigo) e esconde na hora o que não é o anterior nem o novo.
          gsap.killTweensOf([...screens, ...chips])
          screens.forEach(
            (s, j) => j !== i && j !== prev && gsap.set(s, { autoAlpha: 0, yPercent: 0 }),
          )
          chips.forEach(
            (c, j) => j !== i && j !== prev && gsap.set(c, { autoAlpha: 0, y: 0, scale: 1 }),
          )
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
          // Card da leitura de risco: contorno vinho suave + leve zoom quando o item 4 fica ativo.
          const risk = screens[3]?.querySelector('[data-risk-card]')
          if (risk) {
            gsap.to(risk, {
              scale: i === 3 ? 1.03 : 1,
              borderColor: i === 3 ? 'rgb(149 75 110 / 0.45)' : 'rgb(228 211 217 / 0.7)',
              boxShadow:
                i === 3
                  ? '0 10px 30px -12px rgb(149 75 110 / 0.45)'
                  : '0 4px 14px -8px rgb(75 42 63 / 0.18)',
              duration: 0.6,
              delay: i === 3 ? 0.35 : 0,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
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

  const b = dores.banner

  return (
    <section
      ref={root}
      id="como-funciona"
      aria-labelledby="dores-title"
      className="bg-branco p-3 md:p-4"
    >
      {/* Cartão único (padrão NextPay): banner e lista no mesmo fundo, sem divisão.
          overflow-clip (não hidden) para os cantos sem quebrar o sticky do celular. */}
      <div
        data-header-dark
        data-dores-card
        className="on-dark relative mx-auto max-w-(--grid) overflow-clip rounded-[24px]"
        style={{ background: CARD_BG }}
      >
        {/* ── Banner ── */}
        <div data-banner className="relative lg:h-[min(90vh,860px)]">
          {/* Foto em cores naturais, dissolvendo no fundo do cartão (base e esquerda) */}
          <div
            data-banner-photo
            aria-hidden
            className="relative h-[58svh] lg:absolute lg:inset-0 lg:h-full"
            style={PHOTO_MASK}
          >
            <Picture
              slot="dores-banner"
              sizes="100vw"
              position="66% 35%"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {/* Só o necessário para o texto: véu suave atrás do título e do subtítulo */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={TEXT_SCRIM} />

          <div className="relative z-10 mx-auto -mt-28 flex flex-col gap-10 px-5 pb-4 md:px-8 lg:mt-0 lg:h-full lg:justify-between lg:gap-0 lg:px-12 lg:pt-28 lg:pb-14 min-[100rem]:px-24">
            <span
              data-banner-appear
              className="inline-flex w-max items-center rounded-full px-4 py-2 caption text-white glass"
            >
              {b.chip}
            </span>

            <div data-banner-title>
              <h2
                id="dores-title"
                className="flex flex-col font-display text-[clamp(2.75rem,7.4vw,6.75rem)] leading-[0.98] font-medium tracking-[-0.03em] lg:whitespace-nowrap"
              >
                <span data-banner-line="1" className="text-borda">
                  {b.line1}
                </span>
                <span data-banner-line="2" className="text-white lg:self-end lg:text-right">
                  {b.line2}
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <p
                data-banner-appear
                className="max-w-[44ch] text-[1.25rem] leading-snug text-pretty text-white/80"
              >
                {b.sub}
              </p>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {b.pills.map((p) => (
                  <li
                    key={p}
                    data-banner-appear
                    className="rounded-full px-4 py-2 text-small font-semibold text-white glass"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Lista com o celular ── */}
        <Container className="pt-8 pb-24 lg:pt-0 lg:pb-28 min-[100rem]:px-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Esquerda: as 5 dores, rolando normalmente */}
            <ul className="flex flex-col gap-14 pt-12 lg:col-span-5 lg:gap-0 lg:pt-0">
              {dores.items.map((d, i) => {
                const Icon = ICONS[i]
                return (
                  <li
                    key={d.id}
                    id={d.id}
                    data-dor-item
                    data-appear
                    className="lg:flex lg:min-h-[max(48vh,520px)] lg:items-center"
                  >
                    <article
                      data-dor-card
                      data-active={i === 0}
                      className="rounded-card-lg border border-white/15 bg-white/8 p-6 transition-[border-color,background-color] duration-300 focus-within:opacity-100! sm:p-8 lg:data-[active=true]:border-white/25 lg:data-[active=true]:bg-white/14"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 caption text-white">
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                        {d.chip}
                      </span>
                      <h3 className="mt-5 font-display text-[1.625rem] leading-tight font-semibold tracking-[-0.02em] text-balance text-white">
                        {d.title}
                      </h3>
                      <p className="mt-3 text-pretty text-white/70">{d.answer}</p>
                      {d.link && (
                        <Button variant="ghost" href={d.link.href} className="mt-4 text-white">
                          {d.link.label}
                        </Button>
                      )}
                    </article>

                    {/* Celular: a tela do item logo abaixo, num celular menor, sobre o painel claro */}
                    <div
                      aria-hidden
                      className="relative mt-4 h-[380px] overflow-hidden rounded-card-lg lg:hidden"
                      style={PANEL}
                    >
                      <div className="absolute inset-0" style={PANEL_LINES} />
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

            {/* Direita: painel claro fixo com o celular (desktop) */}
            <div aria-hidden className="hidden lg:col-span-7 lg:block">
              <div className="sticky top-[15vh] h-[min(70vh,560px)]">
                {/* Brilho vinho a 25% atrás do painel */}
                <div
                  className="pointer-events-none absolute -inset-24"
                  style={{
                    background:
                      'radial-gradient(50% 50% at 50% 50%, rgb(149 75 110 / 0.25) 0%, transparent 70%)',
                  }}
                />
                <div
                  data-appear="visual"
                  className="relative h-full overflow-hidden rounded-card-lg"
                  style={PANEL}
                >
                  <div className="absolute inset-0" style={PANEL_LINES} />
                  <PhoneFrame
                    decorative
                    className="absolute top-12 left-1/2 w-[300px] -translate-x-1/2"
                  >
                    <div className="relative h-full w-full">
                      {dores.items.map((d, i) => (
                        <div
                          key={d.chip}
                          data-dor-screen
                          className={clsx('absolute inset-0', i > 0 && 'invisible opacity-0')}
                        >
                          {i === 3 ? <RiscoFocoScreen highlight={false} /> : SCREENS[i]()}
                        </div>
                      ))}
                    </div>
                  </PhoneFrame>

                  {/* Chip do recurso num cartão branco flutuando ao lado do celular */}
                  <div className="absolute top-[42%] left-[calc(50%-320px)] z-10">
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
      </div>
    </section>
  )
}
