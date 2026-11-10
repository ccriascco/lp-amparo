import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { PeopleScatter } from '../components/ui/PeopleScatter'
import { contexto } from '../content/copy'
import { gsap, MQ } from '../lib/gsap'

/**
 * Fotos espalhadas com a frase de fecho do COPY 3.2c (§6.26, padrão Gaia), como seção própria logo
 * depois de `#contexto`. Pedidos do cliente (10/11/2026): fundo próprio com divisória clara e, ao
 * entrar, o fundo rosado "abre" das margens até ocupar a tela inteira (sem bordas sobrando nas
 * laterais quando o palco fixa). A moldura é um `clip-path` (recuo + cantos de 32px) que vai a zero
 * entre a entrada da seção e o início do palco fixo — o mesmo movimento dos shells no §7.9.
 * Movimento reduzido: fundo já em tela cheia.
 */
export function Pessoas() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean }
        const inset = desktop ? 16 : 12
        const radius = desktop ? 32 : 24
        gsap.fromTo(
          '[data-pessoas-bg]',
          { clipPath: `inset(0px ${inset}px 0px ${inset}px round ${radius}px)` },
          {
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-pessoas-bg]',
              start: 'top bottom',
              // desktop: termina quando o palco fixa; celular (sem sticky): enquanto a seção está na tela
              end: desktop ? 'top top' : 'top 35%',
              scrub: true,
            },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="pessoas"
      aria-labelledby="pessoas-title"
      className="bg-branco pt-3 md:pt-4"
    >
      <div data-pessoas-bg className="overflow-clip" style={{ background: 'var(--grad-rosa)' }}>
        <PeopleScatter phrase={contexto.fecho} centerSlot="contexto" headingId="pessoas-title" />
      </div>
    </section>
  )
}
