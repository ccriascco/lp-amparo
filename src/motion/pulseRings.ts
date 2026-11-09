import { gsap, prefersReducedMotion } from '../lib/gsap'

/** Pulsação única dos anéis ao completar o SOSDemo: expandem 4% e voltam, em sequência (§6.19). */
export function pulseRings(scope: Element | null) {
  if (!scope || prefersReducedMotion()) return
  const rings = scope.querySelectorAll('[data-ring]')
  gsap.fromTo(
    rings,
    { scale: 1 },
    {
      scale: 1.04,
      transformOrigin: '50% 50%',
      duration: 0.35,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      stagger: 0.08,
    },
  )
}
