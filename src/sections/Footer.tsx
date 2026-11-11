import { useGSAP } from '@gsap/react'
import { EyeOff, Heart, Sparkles, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import logoBranco from '../assets/brand/amparo-logo-horizontal-branco-recortado.png'
import { cta, footer as F, nav } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap, ScrollTrigger } from '../lib/gsap'

const PILL_ICONS: LucideIcon[] = [EyeOff, Sparkles, Heart]

type FooterLink = { label: string; href: string; external?: boolean }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: F.colunas.navegacao, links: [...nav.links, { label: F.voltarTopo, href: '#inicio' }] },
  { title: F.colunas.direitos, links: F.linksDireitos },
  // "Privacidade" só quando a página existir (ainda não existe); sem redes sociais.
  { title: F.colunas.projeto, links: [{ label: cta.acessar, href: APP_URL, external: true }] },
]

/**
 * Rodapé em vidro (pedido do cliente), dentro do bloco do CTA final, sobre a mesma foto. Linha de
 * cima: marca, título, subtítulo e pílulas | 3 colunas de links (190 e 180 em "Seus direitos").
 * Faixa gigante "Amparo · Amparo ·" em loop (decorativa, pausa fora da tela). Base: ©.
 */
export function Footer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(root.current, {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
        })
        gsap.from(q('[data-ft-stagger] > *'), {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.08,
          delay: 0.2,
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        })
        // Faixa em loop infinito (~40s), só com o rodapé na tela.
        const loop = gsap.to(q('[data-ft-marquee]'), { xPercent: -50, duration: 40, ease: 'none', repeat: -1, paused: true })
        ScrollTrigger.create({
          trigger: q('[data-ft-marquee-box]')[0],
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const reps = Array.from({ length: 4 }, (_, i) => i)

  return (
    <footer
      ref={root}
      className="relative mx-3 mb-10 -mt-[200px] overflow-hidden rounded-[24px] border border-white/14 bg-[rgb(149_75_110/0.08)] px-5 pt-8 pb-6 text-white/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-[28px] backdrop-saturate-[140%] md:mx-auto md:mt-0 md:mb-16 md:max-w-[calc(var(--grid)+48px)] md:px-14 md:pt-16 md:pb-8 max-md:bg-[rgb(149_75_110/0.1)]"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div data-ft-stagger className="lg:col-span-5">
          <img src={logoBranco} alt="Amparo" width={140} height={34} className="h-8 w-auto" />
          <p className="mt-7 max-w-[420px] font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white">
            {F.titulo}
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-white/72 md:max-w-[380px] md:text-base">
            {F.descricao}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {F.pilulas.map((p, i) => {
              const Icon = PILL_ICONS[i]
              return (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3.5 py-2 text-sm font-semibold text-white"
                >
                  <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                  {p}
                </li>
              )
            })}
          </ul>
        </div>

        <nav
          aria-label="Rodapé"
          data-ft-stagger
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6 lg:pl-8"
        >
          {COLUMNS.map((c, i) => (
            <div key={c.title} className={i === 2 ? 'max-sm:col-span-2' : ''}>
              <p className="text-xs font-bold tracking-[0.08em] text-white/50 uppercase">{c.title}</p>
              <ul className="mt-3 space-y-0.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                      className="group relative inline-flex min-h-11 items-center text-[0.9375rem] text-white/80 transition-colors hover:text-white focus-visible:text-white"
                    >
                      {l.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-2.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-amparo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Faixa gigante em loop (decorativa), cortada pelas bordas do cartão */}
      <div data-ft-marquee-box aria-hidden className="-mx-5 mt-10 overflow-hidden md:-mx-14 md:mt-14">
        <div data-ft-marquee className="flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {reps.map((r) => (
                <span
                  key={r}
                  className="px-[0.18em] font-display text-[clamp(6rem,16vw,16.25rem)] leading-[0.9] font-semibold tracking-[-0.03em] whitespace-nowrap text-white/7"
                >
                  {F.marquee} ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-white/12 pt-6 text-center text-[13px] text-white/60 md:text-left">
        <p>{F.copyright}</p>
      </div>
    </footer>
  )
}
