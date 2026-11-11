import { useGSAP } from '@gsap/react'
import { Smartphone } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Container } from '../components/ui/Section'
import { TintedPhoto, type ImageSlot } from '../components/ui/TintedPhoto'
import { beneficios, cta } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap, MQ } from '../lib/gsap'

const b = beneficios

/**
 * `#beneficios` (seção nova pedida pelo cliente em 10/11/2026), entre o Manifesto e as Dores.
 * Padrão Gardance "O que você ganha…" (cabeçalho com botão à direita, 3 fotos altas com etiqueta
 * branca) + NextPay "Mais que um banco digital…" (H2 em duas linhas, a 2ª na cor da marca). Os pedaços de
 * interface sobre as fotos saíram a pedido do cliente. Celular: carrossel com scroll-snap (85vw).
 */
export function Beneficios() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        const q = gsap.utils.selector(root)
        const cards = q('[data-ben-card]')

        // Cartões revelados por máscara de baixo para cima.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q('[data-ben-list]')[0], start: 'top 80%', once: true },
        })
        tl.fromTo(
          cards,
          { clipPath: 'inset(100% 0% 0% 0% round 20px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 1,
            ease: 'expo.inOut',
            stagger: 0.12,
            clearProps: 'clipPath',
          },
        )

        // Parallax interno leve da foto.
        q('[data-ben-card] .parallax-img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: desktop ? -6 : -3 },
            {
              yPercent: desktop ? 6 : 3,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('[data-ben-card]'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="beneficios"
      aria-labelledby="beneficios-title"
      className="bg-branco py-16 md:py-20 lg:py-24"
    >
      <Container>
        {/* Cabeçalho: chip + H2 à esquerda, botão à direita alinhado pela base */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Chip dot>{b.chip}</Chip>
            <h2 id="beneficios-title" data-words className="mt-5 display-l text-balance text-texto">
              <span className="block">{b.h2a}</span>
              <span className="block">{b.h2b}</span>
            </h2>
          </div>
          <div data-appear className="shrink-0">
            <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />}>
              {cta.acessar}
            </Button>
          </div>
        </div>
      </Container>

      {/* Cartões: grid de 3 no desktop; carrossel com snap no celular (o próximo aparece na borda) */}
      <div className="mt-12 md:mt-16">
        <ul
          data-ben-list
          tabIndex={0}
          aria-label="Benefícios do Amparo"
          className="mx-auto no-scrollbar flex max-w-(--grid) snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:px-8 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {b.cards.map((c) => (
            <li
              key={c.title}
              className="w-[85vw] max-w-[420px] shrink-0 snap-start lg:w-auto lg:max-w-none"
            >
              <BenefitCard slot={c.slot} title={c.title} text={c.text} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

type BenefitCardProps = {
  slot: ImageSlot
  title: string
  text: string
}

function BenefitCard({ slot, title, text }: BenefitCardProps) {
  return (
    <article
      data-ben-card
      className="group relative aspect-[4/5] overflow-hidden rounded-card-lg bg-superficie"
    >
      {/* Foto em cores naturais, com zoom 1.04 no hover */}
      <div className="absolute inset-0 transition-transform duration-700 ease-amparo group-hover:scale-[1.04]">
        <TintedPhoto
          slot={slot}
          sizes="(min-width: 1024px) 33vw, 85vw"
          overlay="none"
          natural
          parallax
          className="h-full"
        />
      </div>

      {/* Etiqueta branca na base */}
      <div className="absolute inset-x-4 bottom-4 z-10 rounded-card bg-white p-5 transition-transform duration-300 ease-amparo group-hover:-translate-y-1">
        <h3 className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em] text-texto">
          {title}
        </h3>
        <p className="mt-1.5 text-small text-pretty text-texto-secundario">{text}</p>
      </div>
    </article>
  )
}
