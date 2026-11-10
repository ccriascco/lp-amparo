import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { useRef, type CSSProperties } from 'react'
import { gsap, MQ } from '../../lib/gsap'
import { TintedPhoto, type ImageSlot } from './TintedPhoto'

type Floating = {
  slot: ImageSlot
  /** Posição no palco (desktop), em % do palco. */
  pos: CSSProperties
  /** Lado em px (desktop). */
  size: number
  /** Velocidade do parallax (§7.12): < 0.8 fica menor, com desfoque e 50% de opacidade. */
  speed: number
  /** Também aparece no celular (posição própria). */
  mobile?: CSSProperties
  ratio?: 'square' | 'portrait'
}

/** 8 fotos em volta da frase (§6.26). As de speed baixo ficam "ao fundo". */
const PHOTOS: Floating[] = [
  {
    slot: 'rede-duas-mulheres',
    pos: { left: '3%', top: '9%' },
    size: 156,
    speed: 1.3,
    ratio: 'portrait',
    mobile: { left: '0%', top: '0%' },
  },
  { slot: 'direitos-1', pos: { left: '29%', top: '4%' }, size: 112, speed: 0.6 },
  {
    slot: 'ajudar',
    pos: { left: '58%', top: '17%' },
    size: 128,
    speed: 1,
    mobile: { right: '0%', top: '4%' },
  },
  {
    slot: 'direitos-3',
    pos: { right: '5%', top: '11%' },
    size: 146,
    speed: 1.4,
    ratio: 'portrait',
  },
  {
    slot: 'direitos-2',
    pos: { left: '8%', top: '64%' },
    size: 124,
    speed: 0.9,
    mobile: { left: '4%', bottom: '18%' },
  },
  {
    slot: 'sos',
    pos: { right: '8%', top: '57%' },
    size: 160,
    speed: 1.2,
    mobile: { right: '2%', bottom: '24%' },
  },
  {
    slot: 'direitos-4',
    pos: { left: '23%', top: '86%' },
    size: 136,
    speed: 1.1,
    ratio: 'portrait',
  },
  { slot: 'cta-final', pos: { right: '21%', top: '90%' }, size: 108, speed: 0.55 },
]

/** Foto central: 150px no estado final (CSS); entra a partir de ~340px (escala 2,27). */
const CENTER_FINAL = 150
const CENTER_START = 340

type PeopleScatterProps = {
  phrase: string
  centerSlot: ImageSlot
  /** `id` do H2 (a frase), para o `aria-labelledby` da seção. */
  headingId: string
}

/**
 * "É sobre pessoas" (DESIGN.md §6.26 + §7.12, padrão Gaia). Desktop: 200vh com palco sticky; as
 * fotos sobem em velocidades diferentes e a foto central diminui enquanto o palco entra.
 * < 1024px: sem sticky, composição estática com `appear`. Movimento reduzido: estado final.
 */
export function PeopleScatter({ phrase, centerSlot, headingId }: PeopleScatterProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.desktop, () => {
        const el = root.current!
        const vh = () => window.innerHeight
        const range = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }

        // Fotos pequenas: cada uma no seu ritmo (§7.12).
        gsap.utils.toArray<HTMLElement>('[data-speed]', el).forEach((ph) => {
          const s = Number(ph.dataset.speed)
          gsap.fromTo(
            ph,
            { y: () => vh() * 0.35 * s },
            { y: () => -vh() * 0.6 * s, ease: 'none', scrollTrigger: range },
          )
        })

        // Foto central: grande na base, cobrindo a frase → 150px abaixo dela.
        gsap.from('[data-scatter-center]', {
          scale: CENTER_START / CENTER_FINAL,
          y: () => vh() * 0.12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top top', scrub: true },
        })

        // Nuvem do fundo fica para trás.
        gsap.to('[data-scatter-cloud]', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: range,
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} data-scatter className="relative lg:h-[200vh]">
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-svh">
        {/* Nuvem: manchas grandes e suaves, só com as cores do app (§3.1) */}
        <div
          aria-hidden
          data-scatter-cloud
          className="absolute -inset-x-[10%] -top-[10%] -bottom-[25%] mask-[linear-gradient(180deg,transparent_10%,#000_30%)]"
          style={{
            background: [
              'radial-gradient(40% 36% at 16% 24%, rgb(149 75 110 / 0.55) 0%, transparent 70%)',
              'radial-gradient(36% 42% at 86% 28%, rgb(75 42 63 / 0.4) 0%, transparent 70%)',
              'radial-gradient(46% 40% at 72% 80%, rgb(149 75 110 / 0.5) 0%, transparent 70%)',
              'radial-gradient(38% 36% at 10% 84%, rgb(75 42 63 / 0.32) 0%, transparent 70%)',
              'radial-gradient(40% 30% at 50% 50%, rgb(255 255 255 / 0.6) 0%, transparent 75%)',
              '#f3edef',
            ].join(','),
          }}
        />

        <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] place-items-center px-5 pt-40 pb-20 md:px-8 md:pt-44 lg:h-full lg:min-h-0 lg:py-0">
          {/* Fotos pequenas */}
          {PHOTOS.map((p) => {
            const back = p.speed < 0.8
            return (
              <div
                key={p.slot}
                data-speed={p.speed}
                aria-hidden
                className={clsx(
                  'absolute',
                  p.mobile ? 'block' : 'hidden lg:block',
                  back && 'lg:opacity-50 lg:blur-[2px]',
                  // celular: tamanho fixo menor
                  'w-[92px] md:w-[116px] lg:w-[var(--w)]',
                  '[top:var(--mt,auto)] [right:var(--mr,auto)] [bottom:var(--mb,auto)] [left:var(--ml,auto)]',
                  'lg:[top:var(--t,auto)] lg:[right:var(--r,auto)] lg:[bottom:auto] lg:[left:var(--l,auto)]',
                )}
                style={
                  {
                    '--w': `${p.size}px`,
                    '--l': p.pos.left,
                    '--r': p.pos.right,
                    '--t': p.pos.top,
                    '--ml': p.mobile?.left,
                    '--mr': p.mobile?.right,
                    '--mt': p.mobile?.top,
                    '--mb': p.mobile?.bottom,
                  } as CSSProperties
                }
              >
                <div data-appear="float">
                  <TintedPhoto
                    slot={p.slot}
                    sizes={`${p.size}px`}
                    overlay="none"
                    className={clsx(
                      'rounded-card-lg shadow-float',
                      p.ratio === 'portrait' ? 'aspect-[4/5]' : 'aspect-square',
                    )}
                  />
                </div>
              </div>
            )
          })}

          {/* Frase de fecho (COPY 3.2c): é o título da seção das fotos espalhadas */}
          <h2
            id={headingId}
            data-words
            className="relative z-10 max-w-[16ch] text-center display-l text-balance text-texto lg:max-w-[24ch]"
          >
            {/* Uma frase por bloco no desktop: 3 linhas, como na referência */}
            {phrase.split(/(?<=\.)\s+/).map((s) => (
              <span key={s} className="lg:block">
                {s}{' '}
              </span>
            ))}
          </h2>

          {/* Foto central: a mulher na janela (slot `contexto`) */}
          <div
            data-scatter-center
            aria-hidden
            className="relative z-20 mx-auto mt-10 w-[136px] origin-bottom lg:absolute lg:top-[calc(50%+130px)] lg:left-1/2 lg:mt-0 lg:-ml-[75px] lg:w-[150px]"
          >
            <div data-appear="float" className="lg:contents">
              <TintedPhoto
                slot={centerSlot}
                sizes={`${CENTER_START}px`}
                overlay="none"
                className="aspect-[4/5] rounded-card shadow-float"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
