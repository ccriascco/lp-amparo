import { useGSAP } from '@gsap/react'
import { House, Phone, Ribbon, ShieldOff, UsersRound } from 'lucide-react'
import { useRef } from 'react'
import { NotificationCard } from '../components/ui/NotificationCard'
import { Container, SectionHeading } from '../components/ui/Section'
import { StatsBand } from '../components/ui/StatsBand'
import { TintedPhoto } from '../components/ui/TintedPhoto'
import { contexto, emergencia, hero, numeros } from '../content/copy'
import { gsap, MQ } from '../lib/gsap'

/** Ícones na ordem dos números: feminicídios, dentro de casa, companheiros, medidas descumpridas. */
const ICONS = [Ribbon, House, UsersRound, ShieldOff]

/**
 * `#contexto` — números + cabeçalho do contexto numa só seção (ajustes 3 do cliente, 10/11/2026;
 * padrão Finexa "About" + bento, ref-03). Shell rosado recuado; H2 e texto do COPY 3.2c em duas
 * colunas; abaixo, os 4 cartões de número em 2×2 (7 col) e uma foto vertical (5 col) com o
 * "Ligue 180" e uma notificação flutuando pelas bordas. As fotos espalhadas (`PeopleScatter`)
 * vêm logo depois, como seção própria (`Pessoas`).
 */
export function Contexto() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        const photo = root.current!.querySelector('[data-ctx-photo]')!
        const img = photo.querySelector('.parallax-img')
        const floats = gsap.utils.toArray<HTMLElement>('[data-ctx-float]', root.current)

        // Foto: revelação por máscara de baixo para cima; os flutuantes entram 0,2s depois.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: photo, start: 'top 85%', once: true },
        })
        tl.fromTo(
          photo,
          { clipPath: 'inset(100% 0% 0% 0% round 20px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 1.1,
            ease: 'expo.inOut',
            clearProps: 'clipPath',
          },
        ).from(
          floats,
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.9,
            filter: 'blur(8px)',
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.12,
            clearProps: 'filter',
          },
          // 0,2s depois da foto praticamente aberta (a curva expo.inOut abre ~85% até 0,7s);
          // antes disso os flutuantes ficavam pairando sobre a foto ainda fechada.
          0.9,
        )

        // Parallax interno leve da foto.
        if (img) {
          const k = desktop ? 6 : 3
          gsap.fromTo(
            img,
            { yPercent: -k },
            {
              yPercent: k,
              ease: 'none',
              scrollTrigger: {
                trigger: photo,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        }

        // Depois de entrar, os flutuantes balançam devagar (y ±6px), cada um no seu ritmo.
        floats.forEach((f, i) => {
          const inner = f.firstElementChild
          if (!inner) return
          gsap.to(inner, {
            y: i ? 6 : -6,
            duration: 4.5 + i * 1.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.4,
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const alerta = hero.notifications[0]

  return (
    <section ref={root} id="contexto" aria-labelledby="contexto-title" className="py-3 md:py-4">
      <div
        className="mx-3 overflow-hidden rounded-[24px] md:mx-4 md:rounded-shell"
        style={{ background: 'var(--grad-rosa)' }}
      >
        <Container className="py-16 md:py-24">
          {/* Cabeçalho em duas colunas, alinhado pela base */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <SectionHeading
                id="contexto-title"
                className="text-[clamp(2.25rem,4.2vw,3.5rem)] lg:max-w-[22ch]"
              >
                {contexto.h2}
              </SectionHeading>
            </div>
            <p
              data-appear
              className="max-w-[52ch] lead text-pretty text-texto-secundario lg:col-span-5"
            >
              {contexto.text}
            </p>
          </div>

          {/* Bento: cartões 2×2 (7 col) + foto vertical (5 col) com a mesma altura */}
          <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-6">
            <div className="relative lg:order-2 lg:col-span-5">
              <div
                data-ctx-photo
                className="aspect-[4/5] overflow-hidden rounded-card-lg md:aspect-[16/11] lg:aspect-auto lg:h-full"
              >
                <TintedPhoto
                  slot="numeros"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  overlay="soft"
                  parallax
                  className="h-full rounded-card-lg"
                />
              </div>

              {/* Notificação no canto superior direito, saindo levemente pela borda */}
              <div
                data-ctx-float
                aria-hidden
                className="absolute top-4 right-4 z-10 w-[min(280px,calc(100%-32px))] lg:-top-5 lg:-right-6"
              >
                <div>
                  <NotificationCard
                    title={alerta.title}
                    text={alerta.text}
                    time={alerta.time}
                    className="w-full"
                  />
                </div>
              </div>

              {/* "Ligue 180" no canto inferior esquerdo, saindo levemente pela borda */}
              <div data-ctx-float className="absolute bottom-4 left-4 z-10 lg:-bottom-6 lg:-left-3">
                <div>
                  <a
                    href="tel:180"
                    className="flex min-h-11 items-center gap-3 rounded-card py-3 pr-5 pl-3 shadow-float glass-light transition-[translate] duration-300 ease-amparo hover:-translate-y-0.5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-vinho text-white">
                      <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-lg leading-tight font-bold text-texto">
                        {emergencia.ligue180}
                      </span>
                      <span className="text-small text-texto-secundario">{emergencia.info180}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <StatsBand
              stats={numeros.stats}
              icons={ICONS}
              highlight={3}
              className="lg:order-1 lg:col-span-7"
            />
          </div>
        </Container>
      </div>
    </section>
  )
}
