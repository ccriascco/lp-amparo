import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { Plus, Smartphone } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { BrandDrop } from '../components/ui/BrandDrop'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { EmergencyBar } from '../components/ui/EmergencyBar'
import { RichText } from '../components/ui/RichText'
import { Container, SectionHeading } from '../components/ui/Section'
import { cta, faq, type Rich } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

const BORDER = 'border border-[rgb(228_211_217/0.55)]'
const SOFT_SHADOW = 'shadow-[0_1px_2px_rgb(75_42_63/0.04),0_16px_40px_-24px_rgb(75_42_63/0.16)]'

/** Texto puro de uma resposta (para o JSON-LD). */
const plain = (parts: Rich) =>
  parts.map((p) => (typeof p === 'string' ? p : 'strong' in p ? p.strong : p.em)).join('')

/** Avatar do Amparo: círculo vinho com a gota branca. */
function Avatar({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <span
      aria-hidden
      className={clsx(
        'grid shrink-0 place-items-center rounded-full bg-vinho text-white',
        size === 'md' ? 'size-10' : 'size-7',
      )}
    >
      <BrandDrop className={size === 'md' ? 'h-5' : 'h-3.5'} />
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
          x: 24,
          autoAlpha: 0,
          filter: 'blur(6px)',
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.08,
          clearProps: 'filter,transform',
          scrollTrigger: { trigger: q('[data-faq-panel]')[0], start: 'top 80%', once: true },
        })
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
      className="bg-branco py-[72px] lg:py-[120px]"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-16">
        {/* Esquerda: no desktop fixa; no celular os filhos entram na ordem título → painel → CTA */}
        <div className="max-lg:contents lg:sticky lg:top-[120px] lg:col-span-5 lg:self-start">
          <div className="max-lg:order-1">
            <div data-appear>
              <Chip dot>{faq.chip}</Chip>
            </div>
            <SectionHeading
              id="faq-title"
              className="mt-5 !text-[clamp(2.25rem,3.6vw,3.25rem)] !leading-[1.08] font-semibold"
            >
              {faq.h2}
            </SectionHeading>
            <p data-appear className="mt-5 lead text-pretty text-texto-secundario">
              {faq.sub}
            </p>
          </div>
          <div className="max-lg:order-3 lg:mt-10">
            <div className={clsx('rounded-card-lg bg-white p-6', BORDER, SOFT_SHADOW)}>
              <div className="flex items-center gap-3">
                <Avatar size="md" />
                <p className="font-display text-lg font-semibold text-texto">{faq.ajuda}</p>
              </div>
              <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />} className="mt-5">
                {cta.acessar}
              </Button>
            </div>
            {/* 190 e 180 sempre visíveis no FAQ (não negociável do CLAUDE.md) */}
            <EmergencyBar compact className="mt-4 [&_ul]:lg:flex-col [&_ul]:lg:gap-3" />
          </div>
        </div>

        {/* Direita: painel de conversa */}
        <div
          data-faq-panel
          className={clsx('rounded-[24px] bg-superficie p-4 max-lg:order-2 md:p-8 lg:col-span-7', BORDER)}
        >
          <div className="flex items-center gap-3 border-b border-[rgb(228_211_217/0.9)] pb-5">
            <Avatar size="md" />
            <div>
              <p className="font-display font-semibold text-texto">{faq.painel.nome}</p>
              <p className="flex items-center gap-1.5 text-sm text-texto-secundario">
                <span aria-hidden className="size-2 rounded-full bg-confirma" />
                {faq.painel.status}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {faq.items.map((f, i) => {
              const isOpen = open === i
              const bid = `${uid}-q${i}`
              const rid = `${uid}-a${i}`
              return (
                <li key={f.q}>
                  <div className="flex justify-end">
                    <button
                      id={bid}
                      type="button"
                      data-faq-q
                      aria-expanded={isOpen}
                      aria-controls={rid}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className={clsx(
                        'flex min-h-11 max-w-[92%] cursor-pointer items-center gap-3 rounded-[18px] rounded-br-[6px] px-4 py-3 text-left text-base font-semibold transition-[background-color,color,translate] duration-300 ease-amparo md:max-w-[85%]',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vinho',
                        isOpen
                          ? 'bg-vinho text-white'
                          : 'bg-white text-texto hover:-translate-x-0.5 hover:bg-[rgb(149_75_110/0.06)] motion-reduce:hover:translate-x-0',
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

                  <div
                    id={rid}
                    role="region"
                    aria-labelledby={bid}
                    data-faq-region
                    hidden={i !== 0}
                    className="overflow-hidden"
                  >
                    <div className="flex items-end gap-2 pt-3 md:max-w-[85%] max-md:max-w-[92%]">
                      <Avatar />
                      {/* Digitação (some quando a resposta chega) */}
                      <div
                        data-faq-typing
                        aria-hidden
                        style={{ display: 'none' }}
                        className="flex items-center gap-1 rounded-[18px] rounded-bl-[6px] bg-white px-4 py-3.5"
                      >
                        {[0, 1, 2].map((k) => (
                          <span
                            key={k}
                            className="size-2 animate-[faq-dot_1s_ease-in-out_infinite] rounded-full bg-vinho/40"
                            style={{ animationDelay: `${k * 0.15}s` }}
                          />
                        ))}
                      </div>
                      <div
                        data-faq-answer
                        className="rounded-[18px] rounded-bl-[6px] bg-white px-4 py-3 text-[15px] leading-[1.6] text-pretty text-texto"
                      >
                        <p>
                          <RichText parts={f.a} strongClassName="font-bold text-vinho-profundo" />
                        </p>
                        <p className="mt-1 text-right text-xs text-texto-secundario">{faq.painel.agora}</p>
                      </div>
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
