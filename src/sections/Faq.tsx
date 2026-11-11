import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { Plus } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { BrandDrop } from '../components/ui/BrandDrop'
import { Chip } from '../components/ui/Chip'
import { HeroRings } from '../components/ui/HeroRings'
import { RichText } from '../components/ui/RichText'
import { Container, SectionHeading } from '../components/ui/Section'
import { faq, type Rich } from '../content/copy'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

const BORDER = 'border border-[rgb(228_211_217/0.55)]'

/** Texto puro de uma resposta (para o JSON-LD). */
const plain = (parts: Rich) =>
  parts.map((p) => (typeof p === 'string' ? p : 'strong' in p ? p.strong : p.em)).join('')

/** Avatar do Amparo: círculo vinho com a gota branca. */
function Avatar() {
  return (
    <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-vinho text-white">
      <BrandDrop className="h-3.5" />
    </span>
  )
}

/**
 * `#faq` (pedido do cliente): perguntas como balões da usuária e respostas como mensagens do Amparo,
 * num painel de conversa com o design system do Amparo (sem imitar apps de mensagem). Cada pergunta
 * é um botão de accordion (`aria-expanded`/`aria-controls`); só uma aberta por vez, a 1ª aberta ao
 * carregar. Ao abrir: balão fica vinho, 3 pontinhos por ~600ms e a resposta entra. Movimento
 * reduzido: resposta direta com fade. Textos: COPY 3.9.
 */
export function Faq() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(0)
  const prev = useRef<number | null>(0)
  const reduced = useReducedMotion()
  const uid = useId()

  // Abre/fecha com altura animada (GSAP height auto) e a "digitação" antes da resposta.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const regions = Array.from(el.querySelectorAll<HTMLElement>('[data-faq-region]'))
    const before = prev.current
    prev.current = open
    if (before === open) return

    if (before !== null && regions[before]) {
      const r = regions[before]
      gsap.killTweensOf(r)
      gsap.to(r, {
        height: 0,
        opacity: reduced ? 0 : 1,
        duration: reduced ? 0.2 : 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          r.hidden = true
        },
      })
    }
    const r = open >= 0 ? regions[open] : null
    if (!r) return
    const typing = r.querySelector<HTMLElement>('[data-faq-typing]')!
    const answer = r.querySelector<HTMLElement>('[data-faq-answer]')!
    gsap.killTweensOf([r, typing, answer])
    r.hidden = false
    if (reduced) {
      typing.style.display = 'none'
      answer.style.display = ''
      gsap.fromTo(r, { height: 'auto', opacity: 0 }, { opacity: 1, duration: 0.25 })
      return
    }
    answer.style.display = 'none'
    typing.style.display = ''
    gsap.fromTo(r, { height: 0, opacity: 1 }, { height: 'auto', duration: 0.35, ease: 'power2.out' })
    gsap.fromTo(typing, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.25 })
    const t = gsap.delayedCall(0.6 + 0.25, () => {
      const h = r.offsetHeight
      typing.style.display = 'none'
      answer.style.display = ''
      gsap.fromTo(r, { height: h }, { height: 'auto', duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(answer, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    })
    return () => {
      t.kill()
    }
  }, [open, reduced])

  // Entrada: balões de pergunta chegando da direita, em sequência.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(q('[data-faq-q]'), {
          x: -24,
          autoAlpha: 0,
          filter: 'blur(6px)',
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.08,
          clearProps: 'filter,transform',
          scrollTrigger: { trigger: q('[data-faq-panel]')[0], start: 'top 80%', once: true },
        })
        // Anéis ao fundo: giro muito lento + respiração suave (não disputam com o card).
        gsap.to(q('[data-faq-rings]'), { rotate: 360, duration: 240, ease: 'none', repeat: -1 })
        gsap.fromTo(q('[data-faq-rings]'), { opacity: 0.7 }, { opacity: 1, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  }

  return (
    <section
      ref={root}
      id="faq"
      aria-labelledby="faq-title"
      className="relative isolate overflow-clip bg-branco py-[72px] lg:py-[120px]"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Fundo: brilho rosado do centro + anéis do hero atrás do card */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(55% 50% at 50% 58%, rgb(149 75 110 / 0.12) 0%, transparent 70%)' }}
        />
        <div className="absolute top-[58%] left-1/2 size-0">
          <div data-faq-rings className="absolute top-0 left-0 size-0">
            <HeroRings className="top-0 left-0" />
          </div>
        </div>
      </div>

      <Container>
        {/* Cabeçalho centralizado */}
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <div data-appear>
            <Chip dot>{faq.chip}</Chip>
          </div>
          <SectionHeading
            id="faq-title"
            className="mt-5 max-w-[22ch] !text-[clamp(2.5rem,4.2vw,3.75rem)] !leading-[1.06] font-semibold"
          >
            {faq.h2}
          </SectionHeading>
          <p
            data-appear
            className="mt-5 max-w-[560px] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.5] text-pretty text-texto-secundario"
          >
            {faq.sub}
          </p>
        </div>

        {/* Card da conversa */}
        <div
          data-faq-panel
          className={clsx(
            'mx-auto mt-12 max-w-[880px] rounded-[24px] bg-white p-5 shadow-[0_24px_60px_-30px_rgb(75_42_63/0.22)] md:p-10',
            BORDER,
          )}
        >
          <ul className="space-y-3">
            {faq.items.map((f, i) => {
              const isOpen = open === i
              const bid = `${uid}-q${i}`
              const rid = `${uid}-a${i}`
              return (
                <li key={f.q}>
                  {/* Pergunta (usuária) à esquerda */}
                  <div className="flex justify-start">
                    <button
                      id={bid}
                      type="button"
                      data-faq-q
                      aria-expanded={isOpen}
                      aria-controls={rid}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className={clsx(
                        'flex min-h-11 max-w-[90%] cursor-pointer items-center gap-3 rounded-[18px] rounded-bl-[6px] px-4 py-3 text-left text-base font-semibold transition-[background-color,color,translate] duration-300 ease-amparo md:max-w-[80%]',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vinho',
                        isOpen
                          ? 'bg-vinho text-white'
                          : 'bg-superficie text-texto hover:translate-x-0.5 hover:bg-[rgb(149_75_110/0.1)] motion-reduce:hover:translate-x-0',
                      )}
                    >
                      <span className="flex-1 text-pretty">{f.q}</span>
                      <Plus
                        aria-hidden
                        className={clsx(
                          'size-5 shrink-0 transition-transform duration-300 ease-amparo',
                          isOpen ? 'rotate-45 text-white' : 'text-vinho',
                        )}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Resposta (Amparo) à direita */}
                  <div
                    id={rid}
                    role="region"
                    aria-labelledby={bid}
                    data-faq-region
                    hidden={i !== 0}
                    className="overflow-hidden"
                  >
                    <div className="ml-auto flex max-w-[90%] items-end justify-end gap-2 pt-3 md:max-w-[80%]">
                      {/* Digitação (some quando a resposta chega) */}
                      <div
                        data-faq-typing
                        aria-hidden
                        style={{ display: 'none' }}
                        className="flex items-center gap-1 rounded-[18px] rounded-br-[6px] bg-vinho px-4 py-3.5"
                      >
                        {[0, 1, 2].map((k) => (
                          <span
                            key={k}
                            className="size-2 animate-[faq-dot_1s_ease-in-out_infinite] rounded-full bg-white/70"
                            style={{ animationDelay: `${k * 0.15}s` }}
                          />
                        ))}
                      </div>
                      <div data-faq-answer className="min-w-0">
                        <div className="rounded-[18px] rounded-br-[6px] bg-vinho px-4 py-3 text-[15px] leading-[1.6] text-pretty text-white">
                          <p>
                            <RichText parts={f.a} strongClassName="font-bold text-white" />
                          </p>
                        </div>
                        <p className="mt-1 text-right text-xs text-texto-secundario">{faq.painel.agora}</p>
                      </div>
                      <Avatar />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
