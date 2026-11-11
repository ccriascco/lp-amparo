import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { Picture } from '../components/ui/TintedPhoto'
import { cta, ctaFinal as C } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap } from '../lib/gsap'
import { Footer } from './Footer'

/** Escurecimento do topo e da base da foto (contraste ≥ 4.5:1 do texto branco). */
const SHADE =
  'linear-gradient(180deg, rgb(75 42 63 / 0.55) 0%, transparent 40%), linear-gradient(0deg, rgb(75 42 63 / 0.7) 0%, transparent 50%)'
/** A foto termina dissolvendo em vinho-profundo nos últimos 25% (sem linha de corte). */
const FADE_MOBILE = 'linear-gradient(180deg, transparent 75%, #4B2A3F 100%)'

/**
 * CTA final + rodapé como um BLOCO ÚNICO (pedido do cliente): um shell com a mesma foto (céu, mulher
 * de costas, grama). Em cima, o CTA centralizado sobre o céu; um respiro para a mulher aparecer
 * inteira; embaixo, o rodapé em vidro sobre a grama. Desktop: a foto cobre o bloco todo. Celular
 * (estilo Gaia): a foto ocupa uma área própria (~115svh) e o cartão de vidro sobe sobre ela; abaixo
 * da foto o shell continua em vinho-profundo. Movimento reduzido: tudo parado.
 */
export function CtaFinal() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          desk: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mob: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const { desk } = ctx.conditions as { desk: boolean }
          const q = gsap.utils.selector(root)
          const shell = q('[data-cta-shell]')[0]
          // Foto: 1.1 → 1 (1.06 no celular) durante o scroll do bloco.
          gsap.fromTo(
            q('[data-cta-zoom]'),
            { scale: desk ? 1.1 : 1.06 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: shell, start: 'top bottom', end: 'bottom bottom', scrub: true } },
          )
          // Botão magnético (até 8px), só com mouse.
          const btn = q('[data-cta-magnet]')[0] as HTMLElement
          if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
          const x = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' })
          const y = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' })
          const move = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect()
            x(gsap.utils.clamp(-8, 8, ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 8))
            y(gsap.utils.clamp(-8, 8, ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8))
          }
          const leave = () => (x(0), y(0))
          btn.addEventListener('pointermove', move)
          btn.addEventListener('pointerleave', leave)
          return () => {
            btn.removeEventListener('pointermove', move)
            btn.removeEventListener('pointerleave', leave)
          }
        },
      )
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="cta" aria-labelledby="cta-title" className="bg-branco p-3 md:p-4">
      <div
        data-cta-shell
        data-header-dark
        className="on-dark relative isolate overflow-clip rounded-[24px] bg-vinho-profundo"
      >
        {/* Celular: brilho vinho atrás da metade de baixo do cartão de vidro */}
        <div
          aria-hidden
          className="absolute bottom-[12%] left-1/2 -z-10 size-[420px] -translate-x-1/2 rounded-full bg-vinho/35 blur-[100px] md:hidden"
        />

        {/* CTA sobre o céu + respiro (a foto é posicionada em relação a este bloco) */}
        <div className="relative">
          {/* Foto ancorada no CTA: termina logo depois dos pés da mulher (122% da área do CTA no
              desktop; ~115svh no celular) e dissolve em vinho-profundo sob o cartão de vidro. */}
          <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[max(115svh,760px)] overflow-hidden md:h-[132%]">
            <div data-cta-zoom className="absolute inset-0">
              <Picture
                slot="cta-fundo"
                mobileSlot="cta-fundo-mobile"
                sizes="100vw"
                className="size-full object-cover object-[50%_30%] md:object-[50%_100%]"
              />
            </div>
            <div className="absolute inset-0" style={{ background: SHADE }} />
            <div className="absolute inset-0" style={{ background: FADE_MOBILE }} />
          </div>
        <div className="flex flex-col items-center px-5 pt-[88px] text-center md:px-8 md:pt-[120px]">
          <span
            data-appear
            className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-2 caption text-white backdrop-blur-md"
          >
            {C.chip}
          </span>
          <h2
            id="cta-title"
            data-words
            className="mt-5 max-w-[12ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance text-white md:max-w-[18ch]"
          >
            {C.h2}
          </h2>
          <p data-appear className="mt-5 max-w-[560px] lead text-pretty text-white/85">
            {C.text}
          </p>
          <div data-appear className="mt-8 w-full max-w-[420px] md:w-auto md:max-w-none">
            <a
              data-cta-magnet
              href={APP_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-9 text-[1.0625rem] font-bold text-vinho shadow-float transition-[background-color,scale] duration-200 hover:bg-superficie focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.97] md:w-auto"
            >
              {cta.acessar}
            </a>
          </div>
          <ul data-appear className="mt-5 flex max-w-[320px] flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-white md:max-w-none">
            {C.itens.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check aria-hidden className="size-4" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Respiro para a mulher aparecer inteira antes do rodapé */}
        <div aria-hidden className="h-[calc(max(115svh,760px)-560px)] md:h-[600px]" />
        </div>

        <Footer />
      </div>
    </section>
  )
}
