import { useGSAP } from '@gsap/react'
import { Smartphone } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { cardLoop, PHONE_STACK, PHONE_STAGE, StepCard } from '../components/ui/ComecarCards'
import { Container, SectionHeading } from '../components/ui/Section'
import { Picture, type ImageSlot } from '../components/ui/TintedPhoto'
import { comecar, cta } from '../content/copy'
import { APP_URL } from '../lib/config'
import { getLenis, gsap, ScrollTrigger } from '../lib/gsap'

/** Rolagem por passo (pedido do cliente, 11/11: menos voltas da roda para trocar de passo). */
const STEP_PX = 750
const PHOTOS: ImageSlot[] = ['comecar-1', 'comecar-2', 'comecar-3', 'comecar-4']
const PHOTOS_MOBILE: ImageSlot[] = [
  'comecar-1-mobile',
  'comecar-2-mobile',
  'comecar-3-mobile',
  'comecar-4-mobile',
]
/** Palco fixo: a partir de 768px e com movimento. Abaixo disso (ou com movimento reduzido), blocos. */
const STAGE = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
const STACK_MOTION = '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)'

/** Escurecimento da base e da esquerda, transparente no centro e no topo (várias paradas, sem emenda). */
const SHADE_BOTTOM =
  'linear-gradient(to top, rgb(20 10 16 / 0.72) 0%, rgb(43 24 36 / 0.55) 22%, rgb(75 42 63 / 0.25) 45%, rgb(75 42 63 / 0.08) 62%, transparent 78%)'
const SHADE_LEFT =
  'linear-gradient(to right, rgb(43 24 36 / 0.62) 0%, rgb(75 42 63 / 0.35) 28%, rgb(75 42 63 / 0.1) 50%, transparent 66%)'

/**
 * `#comecar` (seção 8, padrão Gardance "Como funciona"): cabeçalho à esquerda e um palco fixo
 * (100vh) num trilho de 4 × 1500px. A foto de fundo, o título, a descrição e o cartão interativo
 * trocam a cada passo; a barra de progresso na base enche com o scroll e seus rótulos levam a cada
 * passo. Abaixo de 768px e com movimento reduzido: 4 blocos empilhados (foto 4:5, texto por cima,
 * cartão sobrepondo a borda). Laços dos cartões só no passo ativo e com a seção na tela.
 */
export function Comecar() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  const goTo = (k: number) => {
    const el = track.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY + k * STEP_PX + 2
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { duration: 1.2 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // ── Palco fixo ──────────────────────────────────────────────
      mm.add(STAGE, () => {
        const q = gsap.utils.selector(track)
        const texts = q('[data-cm-text]')
        const cards = q('[data-cm-card]')
        const photos = q('[data-cm-photo]')
        const fills = q('[data-cm-fill]')
        const labels = q('[data-cm-label]')
        const loops = cards.map((c, i) => cardLoop(i, c))
        let active = 0
        let visible = false

        gsap.set(texts, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) })
        gsap.set(cards, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) })
        gsap.set(photos, { opacity: (i: number) => (i === 0 ? 1 : 0), scale: 1.06 })
        gsap.set(fills, { scaleX: 0 })
        cards.forEach((c, i) => (c.inert = i !== 0))
        labels.forEach((l, i) => l.toggleAttribute('data-active', i === 0))

        // Entrada do palco (como o cartão das Dores): começa menor, com cantos arredondados, e cresce
        // até a tela cheia enquanto o trilho chega ao topo. Por recorte, sem escalar o palco.
        gsap.fromTo(
          q('[data-cm-stage]'),
          { clipPath: 'inset(4% 6% 4% 6% round 32px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: track.current, start: 'top bottom', end: 'top top', scrub: true },
          },
        )

        const setActive = (i: number) => {
          if (i === active) return
          const prev = active
          active = i
          // Saem o título/descrição e o cartão antigos; entram os novos (Gardance).
          gsap.to(texts[prev], { autoAlpha: 0, y: -20, duration: 0.35, ease: 'power2.in', overwrite: true })
          gsap.to(cards[prev], { autoAlpha: 0, scale: 0.95, duration: 0.35, ease: 'power2.in', overwrite: true })
          gsap.to(photos[prev], { opacity: 0, duration: 0.8, ease: 'power1.inOut', overwrite: 'auto' })
          gsap.fromTo(
            texts[i],
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.15, overwrite: true },
          )
          gsap.fromTo(
            cards[i],
            { autoAlpha: 0, scale: 0.9, y: 120 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.15, overwrite: true },
          )
          gsap.to(photos[i], { opacity: 1, duration: 0.8, ease: 'power1.inOut', overwrite: 'auto' })
          cards.forEach((c, k) => (c.inert = k !== i))
          labels.forEach((l, k) => l.toggleAttribute('data-active', k === i))
          loops[prev].pause()
          if (visible) loops[i].restart()
        }

        ScrollTrigger.create({
          trigger: track.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const x = self.progress * 4
            const i = Math.min(3, Math.floor(x))
            setActive(i)
            fills.forEach((f, k) => gsap.set(f, { scaleX: gsap.utils.clamp(0, 1, x - k) }))
            // Zoom lento da foto ativa (1,06 → 1) enquanto o passo dura.
            gsap.set(photos[i], { scale: 1.06 - 0.06 * gsap.utils.clamp(0, 1, x - i) })
          },
        })
        ScrollTrigger.create({
          trigger: track.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            visible = self.isActive
            if (visible) loops[active].restart()
            else loops[active].pause()
          },
        })

        // Header some enquanto o palco ocupa a tela inteira e volta ao sair (pedido do cliente).
        const html = document.documentElement
        ScrollTrigger.create({
          trigger: track.current,
          start: 'top top',
          end: 'bottom bottom',
          onToggle: (self) => html.toggleAttribute('data-hide-header', self.isActive),
        })

        return () => {
          html.removeAttribute('data-hide-header')
          cards.forEach((c) => (c.inert = false))
          labels.forEach((l) => l.removeAttribute('data-active'))
        }
      })

      // ── Blocos empilhados (celular, com movimento): laço de cada cartão quando o bloco aparece ──
      mm.add(STACK_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('[data-cm-block]', root.current).forEach((block, i) => {
          const card = block.querySelector<HTMLElement>('[data-cm-block-card]')!
          const loop = cardLoop(i, card)
          ScrollTrigger.create({
            trigger: block,
            start: 'top 85%',
            end: 'bottom 15%',
            onToggle: (self) => (self.isActive ? loop.restart() : loop.pause()),
          })
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="comecar"
      aria-labelledby="comecar-title"
      className="bg-branco pt-20 pb-20 md:pt-28 md:pb-28"
    >
      {/* Cabeçalho centralizado (pedido do cliente, 11/11) */}
      <Container>
        <div className="mx-auto flex max-w-[1080px] flex-col items-center text-center">
          <div data-appear>
            <Chip dot>{comecar.chip}</Chip>
          </div>
          <SectionHeading id="comecar-title" className="mt-5">
            {comecar.h2}
          </SectionHeading>
          <p data-appear className="mt-6 lead text-pretty text-texto-secundario md:max-w-[72ch]">
            {comecar.sub}
          </p>
        </div>
      </Container>

      {/* ── Palco fixo (≥768px, com movimento) ── */}
      <div
        ref={track}
        data-cm-track
        data-header-dark
        className="relative mt-10 hidden md:motion-safe:block"
        style={{ height: `calc(100vh + ${STEP_PX * 4}px)` }}
      >
        {/* Palco em tela cheia (como a referência); entra crescendo a partir das laterais */}
        <div className="sticky top-0 h-screen">
          <div data-cm-stage className="on-dark relative h-full overflow-clip bg-vinho-profundo">
            {/* Fotos empilhadas (só a do passo ativo visível) */}
            {PHOTOS.map((slot, i) => (
              <div
                key={slot}
                data-cm-photo
                aria-hidden
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Picture
                  slot={slot}
                  sizes="100vw"
                  className="size-full object-cover"
                />
              </div>
            ))}
            <div aria-hidden className="absolute inset-0" style={{ background: SHADE_BOTTOM }} />
            <div aria-hidden className="absolute inset-0" style={{ background: SHADE_LEFT }} />

            <div className="absolute inset-0 mx-auto flex max-w-(--grid) flex-col justify-end px-8 pt-28 pb-6 lg:pb-8">
              <div className="flex items-end justify-between gap-8">
                {/* Título + descrição do passo (empilhados; só o ativo visível) */}
                <div className="grid min-w-0 flex-1">
                  {comecar.steps.map((s, i) => (
                    <div
                      key={s.title}
                      data-cm-text
                      className="col-start-1 row-start-1 self-end pb-2"
                      style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                      <h3 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.02em] text-balance text-white">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-[30ch] text-[1.25rem] leading-[1.55] text-pretty text-white/80">
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Cartão interativo do passo (canto inferior direito) */}
                <div className="grid shrink-0 justify-items-end">
                  {comecar.steps.map((s, i) => (
                    <div
                      key={s.title}
                      data-cm-card
                      className="col-start-1 row-start-1 self-end"
                      style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                      <StepCard i={i} phoneClassName={PHONE_STAGE} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Barra de progresso: 4 colunas; clicar no rótulo rola até o passo */}
              <div className="mt-8 grid grid-cols-4 gap-4 lg:gap-6">
                {comecar.steps.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    data-cm-label
                    onClick={() => goTo(i)}
                    className="group/l min-h-11 cursor-pointer pt-1 text-left"
                  >
                    <span aria-hidden className="relative block h-[2px] overflow-hidden rounded-full bg-white/25">
                      <span
                        data-cm-fill
                        className="absolute inset-0 origin-left rounded-full bg-white"
                      />
                    </span>
                    <span className="mt-3 block text-[0.9375rem] font-semibold text-white/70 transition-colors duration-300 group-hover/l:text-white group-data-active/l:text-white">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Blocos empilhados (celular e movimento reduzido) ── */}
      <Container className="mt-10 md:motion-safe:hidden">
        <ol aria-label={comecar.ariaPassos} className="grid gap-14 md:grid-cols-2 md:gap-x-8">
          {comecar.steps.map((s, i) => (
            <li key={s.title} data-cm-block>
              <div className="flex items-center gap-3 text-sm font-bold text-vinho-profundo">
                <span className="tabular-nums">
                  {i + 1}
                  {comecar.de}
                </span>
                <span aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-borda">
                  <span
                    className="block h-full rounded-full bg-vinho"
                    style={{ width: `${((i + 1) / 4) * 100}%` }}
                  />
                </span>
              </div>
              <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-card-lg bg-vinho-profundo">
                <Picture
                  slot={PHOTOS_MOBILE[i]}
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className="absolute inset-0 size-full object-cover"
                />
                <div aria-hidden className="absolute inset-0" style={{ background: SHADE_BOTTOM }} />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-20">
                  <h3 className="font-display text-[2.25rem] leading-[1.05] font-medium tracking-[-0.02em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 lead text-pretty text-white/80">{s.text}</p>
                </div>
              </div>
              <div data-cm-block-card className="relative z-10 -mt-14 flex justify-center px-3">
                <StepCard i={i} phoneClassName={PHONE_STACK} />
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* CTA depois do palco */}
      <Container className="mt-12 flex justify-center md:mt-16">
        <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />}>
          {cta.acessar}
        </Button>
      </Container>
    </section>
  )
}
