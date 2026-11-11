import { useGSAP } from '@gsap/react'
import { EyeOff, Heart, Sparkles, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import logoBranco from '../assets/brand/amparo-logo-horizontal-branco-recortado.png'
import simboloBranco from '../assets/brand/amparo-simbolo-branco.svg'
import wordmarkBranco from '../assets/brand/amparo-wordmark-branco.svg'
import { cta, footer as F, nav } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap } from '../lib/gsap'

const PILL_ICONS: LucideIcon[] = [EyeOff, Sparkles, Heart]

type FooterLink = { label: string; href: string; external?: boolean }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: F.colunas.navegacao, links: [...nav.links, { label: F.voltarTopo, href: '#inicio' }] },
  { title: F.colunas.direitos, links: F.linksDireitos },
  {
    title: F.colunas.projeto,
    // "Privacidade" só se a página existir (ainda não existe); sem redes sociais.
    links: [
      { label: cta.acessar, href: APP_URL, external: true },
      { label: F.sobreTcc, href: '#sobre-tcc' },
    ],
  },
]

/**
 * Rodapé (pedido do cliente): cartão `vinho-profundo` com dois brilhos vinho derivando devagar e uma
 * grade de pontos no topo. Linha de cima: marca, frase de fecho, descrição e pílulas | 3 colunas de
 * links. No meio, o logotipo gigante como marca d'água (sobe com o scroll no fim da página). Base:
 * texto legal, © e fonte dos dados. 190 e 180 sempre visíveis (coluna "Seus direitos").
 */
export function Footer() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        // Brilhos derivando (±40px, 14s).
        q('[data-ft-glow]').forEach((g, i) =>
          gsap.fromTo(
            g,
            { x: i ? 40 : -40, y: i ? -30 : 30 },
            { x: i ? -40 : 40, y: i ? 30 : -30, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 },
          ),
        )
        // Colunas e pílulas em sequência.
        gsap.from(q('[data-ft-stagger] > *'), {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        })
        // Marca d'água: sobe de dentro do recorte e aparece (0 → 1 dentro da caixa a 4% = 0 → 0,04).
        gsap.fromTo(
          q('[data-ft-mark]'),
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: q('[data-ft-mark-box]')[0], start: 'top bottom', end: 'bottom bottom', scrub: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <footer ref={root} className="bg-branco px-3 pb-3 md:px-4 md:pb-4">
      <div
        data-header-dark
        className="on-dark relative isolate overflow-clip rounded-[24px] bg-vinho-profundo px-5 pt-14 pb-8 text-white/80 md:px-16 md:pt-[72px] md:pb-10"
      >
        {/* Brilhos vinho (55%, blur 120px) e grade de pontos no terço de cima */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span data-ft-glow className="absolute -top-40 -right-32 size-[520px] rounded-full bg-vinho/55 blur-[120px]" />
          <span data-ft-glow className="absolute -bottom-40 -left-32 size-[520px] rounded-full bg-vinho/55 blur-[120px]" />
          <span
            className="absolute inset-x-0 top-0 h-1/3 mask-[linear-gradient(180deg,#000,transparent)]"
            style={{ backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.06) 1.2px, transparent 1.2px)', backgroundSize: '18px 18px' }}
          />
        </div>

        <div className="mx-auto max-w-(--grid)">
          {/* Linha de cima */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div data-ft-stagger className="lg:col-span-5">
              <img src={logoBranco} alt="Amparo" width={140} height={34} className="h-8 w-auto" />
              <p className="mt-8 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-white">
                {F.lema}
              </p>
              <p className="mt-3 text-white/70">{F.descricao}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {F.pilulas.map((p, i) => {
                  const Icon = PILL_ICONS[i]
                  return (
                    <li
                      key={p}
                      className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur-md"
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
              className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6 lg:pl-8"
            >
              {COLUMNS.map((c, i) => (
                <div key={c.title} className={i === 2 ? 'max-sm:col-span-2' : ''}>
                  <p className="text-xs font-bold tracking-[0.08em] text-white/50 uppercase">{c.title}</p>
                  <ul className="mt-4 space-y-1">
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

          {/* Marca d'água: logotipo gigante (decorativo) */}
          <div data-ft-mark-box aria-hidden className="mt-16 overflow-hidden opacity-[0.04] md:mt-20">
            <div data-ft-mark className="flex items-end gap-[2.5%]">
              <img src={simboloBranco} alt="" className="h-auto w-[14%]" />
              <img src={wordmarkBranco} alt="" className="h-auto w-[83%]" />
            </div>
          </div>

          {/* Texto legal (âncora "Sobre o TCC") e base */}
          <p id="sobre-tcc" className="mt-10 max-w-[720px] scroll-mt-28 text-[13px] leading-relaxed text-white/50">
            {F.legal}
          </p>
          <div className="mt-6 flex flex-col gap-2 border-t border-white/12 pt-6 text-[13px] text-white/60 md:flex-row md:justify-between md:gap-8">
            <p>{F.base}</p>
            <p>{F.dados}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
