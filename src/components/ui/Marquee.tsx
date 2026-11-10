import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, MQ, ScrollTrigger } from '../../lib/gsap'
import { BrandDrop } from './BrandDrop'

type MarqueeProps = {
  items: string[]
  /** Nome da lista para leitores de tela. */
  label: string
}

/** Cópias do grupo: a 1ª é a lista acessível; as outras só completam o loop (aria-hidden). */
const COPIES = 3

/**
 * Faixa contínua (DESIGN.md §6.25, padrão FitPay): 64px, fundo branco com fios `borda` em cima e
 * embaixo, itens em Quicksand 600 separados pela gota `vinho`. Loop infinito com `xPercent`
 * (35s por volta) que acelera com a velocidade do scroll. Ajuste do cliente (10/11/2026): sem
 * botão de pausa e sem pausa no hover; só com movimento reduzido ela fica parada.
 */
export function Marquee({ items, label }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const el = root.current!
        const groups = gsap.utils.toArray<HTMLElement>('[data-marquee-group]', el)
        const loop = gsap.to(groups, { xPercent: -100, duration: 35, ease: 'none', repeat: -1 })

        // Impulso do scroll (1 a 4×), voltando a 1 em 1,2s.
        const speed = { boost: 1 }
        const apply = () => loop.timeScale(speed.boost)
        let boostTween: gsap.core.Tween | null = null

        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(1, 4, 1 + Math.abs(self.getVelocity()) / 500)
            if (boost <= speed.boost + 0.05) return
            boostTween?.kill()
            speed.boost = boost
            boostTween = gsap.to(speed, {
              boost: 1,
              duration: 1.2,
              ease: 'power2.out',
              onUpdate: apply,
            })
            apply()
          },
          // Fora da tela o loop não gasta quadro (quem está vendo, vê sempre andando).
          onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
        })
        if (!st.isActive) loop.pause()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative h-16 overflow-hidden border-y border-borda bg-branco">
      {/* Itens dentro do grid de 1280px; só os fios de borda vão de ponta a ponta */}
      <div className="mx-auto flex h-full max-w-[1280px] items-center overflow-hidden mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {Array.from({ length: COPIES }, (_, c) => (
          <ul
            key={c}
            data-marquee-group
            aria-label={c === 0 ? label : undefined}
            aria-hidden={c > 0 || undefined}
            className="flex shrink-0 items-center will-change-transform"
          >
            {items.map((item) => (
              <li key={item} className="flex shrink-0 items-center">
                <span className="font-display text-xl font-semibold whitespace-nowrap text-texto">
                  {item}
                </span>
                <BrandDrop className="mx-8 h-4.5 w-auto text-vinho md:mx-10" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
