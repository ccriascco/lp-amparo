import { useGSAP } from '@gsap/react'
import { BellRing, CheckCheck, LockKeyhole, MapPin, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { Picture } from '../components/ui/TintedPhoto'
import { guardia as G } from '../content/copy'
import { gsap } from '../lib/gsap'

const ICONS: LucideIcon[] = [BellRing, MapPin, CheckCheck, LockKeyhole]

/** Escurecimento do topo e da base (contraste ≥ 4.5:1 para o texto branco). */
const SHADE_TOP = 'linear-gradient(180deg, rgb(75 42 63 / 0.7) 0%, transparent 35%)'
const SHADE_BOTTOM =
  'linear-gradient(0deg, rgb(17 17 17 / 0.88) 0%, rgb(75 42 63 / 0.4) 30%, transparent 55%)'

/**
 * `#guardia` (pedido do cliente): banner fotográfico num shell com margem, itens soltos sobre a
 * imagem (sem cartões). Topo: chip de vidro, H2 e subtítulo. Base: 4 itens separados por uma linha
 * fina. Movimento: foto 1.12 → 1 ao entrar e parallax leve; ícones se desenham (DrawSVG) e os textos
 * sobem saindo do desfoque. Movimento reduzido: estático (o markup já é o estado final).
 */
export function Guardia() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const shell = q('[data-gd-shell]')[0]
        gsap.fromTo(
          q('[data-gd-zoom]'),
          { scale: 1.12 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: shell, start: 'top bottom', end: 'top top', scrub: true } },
        )
        gsap.to(q('[data-gd-parallax]'), {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: shell, start: 'top top', end: 'bottom top', scrub: true },
        })

        const items = q('[data-gd-item]')
        items.forEach((it) => {
          gsap.set(it.querySelectorAll('svg > *'), { drawSVG: '0%' })
          gsap.set(it.querySelectorAll('[data-gd-text]'), { autoAlpha: 0, y: 16, filter: 'blur(6px)' })
        })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q('[data-gd-items]')[0], start: 'top 85%', once: true },
        })
        items.forEach((it, i) => {
          const at = i * 0.12
          tl.to(it.querySelectorAll('svg > *'), { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut' }, at).to(
            it.querySelectorAll('[data-gd-text]'),
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out', stagger: 0.08, clearProps: 'filter' },
            at + 0.45,
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="guardia" aria-labelledby="guardia-title" className="bg-branco p-3 md:p-4">
      <div
        data-gd-shell
        data-header-dark
        className="on-dark relative isolate flex min-h-[max(680px,100svh)] flex-col overflow-clip rounded-[24px] bg-vinho-profundo md:h-[min(100svh,860px)] md:min-h-[680px]"
      >
        {/* Fundo: foto (vertical no celular), com zoom de entrada e parallax */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div data-gd-zoom className="absolute inset-0">
            <div data-gd-parallax className="absolute inset-x-0 -top-[4%] -bottom-[8%]">
              <Picture
                slot="guardia-fundo"
                mobileSlot="guardia-fundo-mobile"
                sizes="100vw"
                className="size-full object-cover object-[50%_30%] max-md:object-[50%_22%]"
              />
            </div>
          </div>
          <div className="absolute inset-0" style={{ background: SHADE_TOP }} />
          <div className="absolute inset-0" style={{ background: SHADE_BOTTOM }} />
        </div>

        <div className="mx-auto flex w-full max-w-(--grid) flex-1 flex-col justify-between px-5 pt-10 md:px-16 md:pt-16">
          {/* Topo */}
          <div>
            <span
              data-appear
              className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-2 caption text-white backdrop-blur-md"
            >
              {G.chip}
            </span>
            <h2
              id="guardia-title"
              data-words
              className="mt-5 max-w-[18ch] font-display md:max-w-[26ch] text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance text-white"
            >
              {G.h2}
            </h2>
            <p data-appear className="mt-5 max-w-[520px] lead text-pretty text-white/75">
              {G.sub}
            </p>
          </div>

          {/* Base: itens soltos sobre a foto, separados por uma linha fina */}
          <ul
            data-gd-items
            className="mt-12 grid gap-6 border-t border-white/15 pt-8 pb-10 sm:grid-cols-2 sm:gap-8 md:pb-14 lg:grid-cols-4"
          >
            {G.itens.map((it, i) => {
              const Icon = ICONS[i]
              return (
                <li key={it.title} data-gd-item className="group flex gap-4 sm:flex-col sm:gap-0">
                  <Icon
                    aria-hidden
                    className="size-8 shrink-0 text-white transition-[translate,filter] duration-300 ease-amparo group-hover:-translate-y-[3px] group-hover:drop-shadow-[0_0_10px_rgb(149_75_110/0.95)] motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                  <div className="sm:mt-5">
                    <h3 data-gd-text className="font-display text-lg leading-tight font-semibold text-white">
                      {it.title}
                    </h3>
                    <p data-gd-text className="mt-1.5 text-[0.9375rem] leading-snug text-pretty text-white/75">
                      {it.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
