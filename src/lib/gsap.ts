import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

// Plugins gratuitos desde a 3.13 (DESIGN.md §7).
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

/** Consultas usadas em todos os `gsap.matchMedia()` (§7.8). */
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
}

export const prefersReducedMotion = () => window.matchMedia(MQ.reduce).matches

let lenis: Lenis | null = null
export const getLenis = () => lenis

/**
 * Scroll suave com Lenis no ticker do GSAP (§7). Não é instanciado com movimento reduzido.
 * Retorna a função de limpeza.
 */
export function startSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Rola até uma âncora (`#secao`) com offset do header e move o foco para ela. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return false
  if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.4, force: true })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  // Foco para quem navega por teclado/leitor de tela, sem pular a página.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}

export { gsap, ScrollTrigger, SplitText }
