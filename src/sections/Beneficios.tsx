import { useGSAP } from '@gsap/react'
import { ArrowRight, FolderLock, Gauge, Smartphone, Users, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Container } from '../components/ui/Section'
import { TintedPhoto } from '../components/ui/TintedPhoto'
import { beneficios, cta } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap, MQ } from '../lib/gsap'

const b = beneficios
/** Rede de apoio, cofre de provas e leitura de risco (o destino de cada link). */
const ICONS: LucideIcon[] = [Users, FolderLock, Gauge]
/**
 * `object-position` de cada foto: x no rosto (fica centrado tanto no cartão estreito quanto no
 * largo); y perto do topo, para o rosto ficar acima da etiqueta aberta.
 */
const FACE = ['48% 12%', '60% 18%', '40% 16%']

/**
 * `#beneficios` (COPY 3.5) — padrão Gardance "O que você ganha".
 * Desktop: 3 cartões em flex; o ativo cresce (flex-grow 1.6, GSAP 0.6s expo.out) e abre a etiqueta
 * de vidro (texto + link); os outros mostram só ícone + tópico. O 1º começa ativo; mouse e foco do
 * teclado ativam; ao sair, fica o último ativo.
 * Celular: carrossel com scroll-snap (85vw) e todas as etiquetas abertas.
 * Movimento reduzido: larguras iguais e etiquetas abertas (é o estado do HTML, sem GSAP).
 */
export function Beneficios() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const q = gsap.utils.selector(root)

      // Entrada (com movimento): cartões por máscara de baixo para cima + parallax leve da foto.
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        gsap.fromTo(
          q('[data-ben-card]'),
          { clipPath: 'inset(100% 0% 0% 0% round 20px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 1,
            ease: 'expo.inOut',
            stagger: 0.12,
            clearProps: 'clipPath',
            scrollTrigger: { trigger: q('[data-ben-list]')[0], start: 'top 80%', once: true },
          },
        )
        q('[data-ben-card] .parallax-img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: desktop ? -5 : -3 },
            {
              yPercent: desktop ? 5 : 3,
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

      // Expansão (só desktop com movimento).
      mm.add(MQ.desktop, () => {
        const items = q('[data-ben-item]')
        const bodies = q('[data-ben-body]')
        let current = -1

        const activate = (i: number, instant = false) => {
          if (i === current) return
          current = i
          // Mata também as aberturas ainda no atraso (o overwrite 'auto' só pega as já iniciadas):
          // sem isso, Tab/mouse rápidos reabriam a etiqueta do cartão anterior.
          gsap.killTweensOf(bodies)
          const d = instant ? 0 : 1
          items.forEach((it, j) => it.setAttribute('data-active', String(j === i)))
          gsap.to(items, {
            flexGrow: (j: number) => (j === i ? 1.6 : 1),
            duration: 0.6 * d,
            ease: 'expo.out',
            overwrite: 'auto',
          })
          bodies.forEach((body, j) => {
            if (j === i) {
              gsap.fromTo(
                body,
                { height: body.offsetHeight, opacity: +getComputedStyle(body).opacity, y: 8 },
                {
                  height: 'auto',
                  opacity: 1,
                  y: 0,
                  duration: 0.5 * d,
                  delay: 0.1 * d,
                  ease: 'expo.out',
                  overwrite: 'auto',
                },
              )
            } else {
              gsap.to(body, {
                height: 0,
                opacity: 0,
                y: 8,
                duration: 0.3 * d,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            }
          })
        }

        activate(0, true)
        const offs = items.map((it, i) => {
          const on = () => activate(i)
          it.addEventListener('pointerenter', on)
          it.addEventListener('focusin', on)
          return () => {
            it.removeEventListener('pointerenter', on)
            it.removeEventListener('focusin', on)
          }
        })
        return () => {
          offs.forEach((off) => off())
          items.forEach((it) => it.removeAttribute('data-active'))
        }
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
      className="bg-branco py-24 md:py-32"
    >
      <Container>
        {/* Cabeçalho: chip + H2 à esquerda, botão à direita alinhado pela base */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Chip dot>{b.chip}</Chip>
            <h2 id="beneficios-title" data-words className="mt-5 display-l text-balance text-texto">
              <span className="block">{b.h2a}</span>
              <span className="block text-vinho">{b.h2b}</span>
            </h2>
          </div>
          <div data-appear className="shrink-0">
            <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />}>
              {cta.acessar}
            </Button>
          </div>
        </div>
      </Container>

      {/* Desktop: linha flex; celular: carrossel com snap (o próximo aparece na borda) */}
      <div className="mt-12 md:mt-16">
        <ul
          data-ben-list
          aria-label="Benefícios do Amparo"
          className="mx-auto no-scrollbar flex max-w-(--grid) snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:px-8 lg:h-[clamp(480px,36vw,580px)] lg:overflow-visible"
        >
          {b.cards.map((c, i) => {
            const Icon = ICONS[i]
            return (
              <li
                key={c.title}
                data-ben-item
                className="group w-[85vw] max-w-[420px] shrink-0 snap-start lg:w-auto lg:max-w-none lg:min-w-0 lg:flex-1 lg:shrink"
              >
                <article
                  data-ben-card
                  className="relative aspect-[4/5] overflow-hidden rounded-card-lg bg-superficie lg:aspect-auto lg:h-full"
                >
                  {/* Foto natural; o cartão ativo faz zoom 1.03 */}
                  <div className="absolute inset-0 transition-transform duration-700 ease-amparo group-data-[active=true]:scale-[1.03]">
                    <TintedPhoto
                      slot={c.slot}
                      sizes="(min-width: 1024px) 45vw, 85vw"
                      overlay="none"
                      natural
                      parallax
                      position={FACE[i]}
                      className="h-full"
                    />
                  </div>

                  {/* Etiqueta de vidro na base: ícone + tópico sempre; texto e link quando aberta */}
                  <div className="absolute inset-x-3 bottom-3 z-10 rounded-[16px] border border-white/60 bg-white/70 p-4 backdrop-blur-[16px] sm:inset-x-4 sm:bottom-4 sm:px-5">
                    <h3 className="flex items-center gap-3 font-display text-xl leading-tight font-semibold tracking-[-0.015em] text-texto">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-vinho text-white">
                        <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="min-w-0 text-balance">{c.title}</span>
                    </h3>
                    <div data-ben-body className="-mx-1 overflow-hidden px-1 pb-1">
                      <p className="mt-3 text-[0.9375rem] leading-snug text-pretty text-texto-secundario">
                        {c.text}
                      </p>
                      <a
                        href={c.link.href}
                        className="group/link mt-1 -mb-3 -ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 text-[0.9375rem] font-bold text-vinho focus-visible:outline-offset-0"
                      >
                        {c.link.label}
                        <ArrowRight
                          className="size-4 transition-transform duration-300 ease-amparo group-hover/link:translate-x-1"
                          aria-hidden
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
