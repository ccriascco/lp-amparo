import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap, MQ, ScrollTrigger } from '../lib/gsap'

/**
 * `#disfarce` (DESIGN.md §7.2):
 * - desktop: palco fixado (`pin`, `end: +=250%`, `scrub: 0.6`); o progresso escolhe o passo ativo;
 * - mobile e movimento reduzido: sem pin; cada passo ativa a tela ao entrar (`onEnter`).
 */
export function useDisfarceMotion(
  root: RefObject<HTMLElement | null>,
  setStep: (step: number) => void,
) {
  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const stage = el.querySelector<HTMLElement>('[data-disfarce-stage]')
      const steps = gsap.utils.toArray<HTMLElement>('[data-disfarce-step]', el)
      if (!stage || !steps.length) return

      const mm = gsap.matchMedia()

      mm.add(MQ.desktop, () => {
        let current = -1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'center center',
            end: '+=250%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const next = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
              if (next !== current) {
                current = next
                setStep(next)
              }
            },
          },
        })
        // Barra do passo ativo acompanha o scroll (o resto é troca de estado).
        tl.to({}, { duration: 1 })
        return () => setStep(0)
      })

      // Mobile e movimento reduzido: troca por passo, sem pin.
      mm.add(`${MQ.mobile}, ${MQ.reduce}`, () => {
        steps.forEach((s, i) => {
          ScrollTrigger.create({
            trigger: s,
            start: 'top 60%',
            end: 'bottom 60%',
            onEnter: () => setStep(i),
            onEnterBack: () => setStep(i),
          })
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )
}
