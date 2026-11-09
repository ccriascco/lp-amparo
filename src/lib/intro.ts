/**
 * Coordena a abertura: o preloader (§7.0) avisa quando começa o fade e o hero (§7.1) começa nesse
 * momento. Sem preloader (visita repetida ou movimento reduzido), o hero começa direto.
 */
let started = false
let resolveStart: () => void = () => {}
export const introStart = new Promise<void>((r) => (resolveStart = r))

export function startIntro() {
  if (started) return
  started = true
  resolveStart()
}

export const introStarted = () => started

const KEY = 'amparo:preloader'

/** Preloader só na primeira visita da sessão e nunca com movimento reduzido. */
export function shouldShowPreloader(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (new URLSearchParams(location.search).has('intro')) return true // forçar (testes)
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

export function markPreloaderSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // sem storage (aba privada): o preloader pode aparecer de novo, sem problema
  }
}
