import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { useRef, type CSSProperties } from 'react'
import { gsap, MQ, ScrollTrigger } from '../../lib/gsap'
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

/** 9 fotos em volta da frase (§6.26; ajustadas a pedido do cliente). As de speed baixo ficam "ao fundo". */
const PHOTOS: Floating[] = [
  {
    slot: 'rede-duas-mulheres',
    pos: { left: '3%', top: '9%' },
    size: 156,
    speed: 1.3,
    ratio: 'portrait',
    mobile: { left: '5%', top: '3%' },
  },
  {
    slot: 'direitos-1',
    pos: { left: '29%', top: '4%' },
    size: 112,
    speed: 0.6,
    mobile: { left: '40%', top: '1%' },
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
    // versão 4:5 centrada na figura (no 16:9 a mulher ficava na borda do quadrado)
    slot: 'sos-mobile',
    pos: { right: '8%', top: '57%' },
    size: 160,
    speed: 1.2,
    mobile: { right: '2%', bottom: '24%' },
  },
  {
    slot: 'direitos-4',
    pos: { left: '4%', top: '90%' },
    size: 136,
    speed: 1,
    ratio: 'portrait',
  },
  { slot: 'cta-final', pos: { right: '21%', top: '90%' }, size: 108, speed: 0.55 },
  // Mais fotos (pedido do cliente, 10/11/2026), nos vãos que não cruzam a frase no estado parado
  {
    slot: 'risco',
    pos: { left: '14%', top: '24%' },
    size: 118,
    speed: 0.7,
    mobile: { left: '30%', bottom: '1%' },
  },
  {
    slot: 'comecar-2',
    pos: { right: '4%', top: '84%' },
    size: 120,
    speed: 0.95,
    mobile: { right: '4%', top: '5%' },
  },
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
 * < 1024px: sem sticky; as fotos também se movem (amplitude menor). Movimento reduzido: estado final.
 */
export function PeopleScatter({ phrase, centerSlot, headingId }: PeopleScatterProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        const el = root.current!
        const vh = () => window.innerHeight
        const range = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
        // Celular (pedido do cliente): as fotos também se movem, com amplitude menor e sem o palco
        // fixo; desktop: +35vh → −60vh × velocidade, como no §7.12.
        const [from, to] = desktop ? [0.35, -0.6] : [0.14, -0.14]

        // Fotos pequenas: cada uma no seu ritmo (§7.12).
        gsap.utils.toArray<HTMLElement>('[data-speed]', el).forEach((ph) => {
          const s = Number(ph.dataset.speed)
          gsap.fromTo(
            ph,
            { y: () => vh() * from * s },
            { y: () => vh() * to * s, ease: 'none', scrollTrigger: range },
          )
        })

        // Foto central (desktop): grande na base, cobrindo a frase → 150px abaixo dela.
        if (desktop) {
          gsap.from('[data-scatter-center]', {
            scale: CENTER_START / CENTER_FINAL,
            y: () => vh() * 0.12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top top', scrub: true },
          })
        }

        // Foto central também se move (pedido do cliente): depois de encolher, sobe devagar
        // enquanto o palco está fixo, em vez de ficar parada encostada na base.
        gsap.fromTo(
          '[data-center-drift]',
          { y: desktop ? 24 : 20 },
          {
            y: desktop ? -16 : -14,
            ease: 'none',
            scrollTrigger: desktop
              ? { trigger: el, start: 'top top', end: 'bottom bottom', scrub: true }
              : range,
          },
        )
        // + flutuação lenta contínua (±8px); a soma nunca alcança a frase.
        gsap.to('[data-center-drift] > *', {
          y: -8,
          duration: 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })

        // A nuvem do fundo fica parada (pedido do cliente: o parallax do fundo travava a rolagem).

        // Camada própria para cada foto que se move, só enquanto a seção está na tela (§7.10):
        // sem isso o tingimento (mix-blend-mode) e o blur das fotos "ao fundo" eram refeitos a
        // cada quadro.
        const movers = gsap.utils.toArray<HTMLElement>(
          '[data-speed], [data-scatter-center], [data-center-drift]',
          el,
        )
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) =>
            gsap.set(movers, { willChange: self.isActive ? 'transform' : 'auto' }),
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
          className="absolute -inset-x-[10%] -top-[10%] -bottom-[25%]"
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
                  back && 'opacity-50 blur-[2px]',
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
                    natural
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
              {/* Invólucro próprio para a subida contínua (não disputa o encolhimento da entrada) */}
              <div data-center-drift>
                <TintedPhoto
                  slot={centerSlot}
                  sizes={`${CENTER_START}px`}
                  overlay="none"
                  natural
                  className="aspect-[4/5] rounded-card shadow-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
