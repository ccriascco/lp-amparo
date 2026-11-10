import { useGSAP } from '@gsap/react'
import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
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
 * embaixo, itens em Quicksand 600 separados pela gota `vinho`. Loop com `xPercent` (35s por volta),
 * acelera com a velocidade do scroll e para com o mouse em cima. Botão de pausar para teclado e
 * toque (movimento automático > 5s precisa de controle). Movimento reduzido: parada, sem botão.
 */
export function Marquee({ items, label }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const syncSpeed = useRef<() => void>(() => {})

  const toggle = () => {
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
    syncSpeed.current()
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const el = root.current!
        const groups = gsap.utils.toArray<HTMLElement>('[data-marquee-group]', el)
        const loop = gsap.to(groups, { xPercent: -100, duration: 35, ease: 'none', repeat: -1 })

        // Velocidade = base (1; 0 com o mouse em cima ou pausada) × impulso do scroll (1 a 4).
        const speed = { base: pausedRef.current ? 0 : 1, boost: 1 }
        const apply = () => loop.timeScale(speed.base * speed.boost)
        let hovering = false
        let boostTween: gsap.core.Tween | null = null
        apply()

        syncSpeed.current = () =>
          void gsap.to(speed, {
            base: hovering || pausedRef.current ? 0 : 1,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
            onUpdate: apply,
          })

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
          // Fora da tela o loop para (não gasta quadro).
          onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
        })
        if (!st.isActive) loop.pause()

        const enter = () => {
          hovering = true
          syncSpeed.current()
        }
        const leave = () => {
          hovering = false
          syncSpeed.current()
        }
        el.addEventListener('pointerenter', enter)
        el.addEventListener('pointerleave', leave)
        return () => {
          syncSpeed.current = () => {}
          el.removeEventListener('pointerenter', enter)
          el.removeEventListener('pointerleave', leave)
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative h-16 overflow-hidden border-y border-borda bg-branco">
      <div className="flex h-full items-center mask-[linear-gradient(90deg,transparent,#000_8%,#000_88%,transparent)]">
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
      <button
        type="button"
        onClick={toggle}
        aria-pressed={paused}
        aria-label="Pausar a faixa de recursos"
        className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-borda bg-branco text-vinho transition-[background-color,scale] duration-200 hover:bg-superficie active:scale-95 motion-reduce:hidden md:right-5"
      >
        {paused ? (
          <Play className="size-4" strokeWidth={1.75} aria-hidden />
        ) : (
          <Pause className="size-4" strokeWidth={1.75} aria-hidden />
        )}
      </button>
    </div>
  )
}
