import { gsap, SplitText } from './gsap'

/**
 * "Aparecer no scroll" (DESIGN §7.11), o padrão dos sites de referência:
 * opacidade 0 + y 32 + desfoque 8px → estado final, `expo.out`, 0.9s, stagger 0.08.
 *
 * Marcação nas seções (aplicada por `initAppear` dentro de um `gsap.matchMedia()`):
 * - `data-appear`             elemento único (título, parágrafo, cartão)
 * - `data-appear="visual"`    celular ou painel: y 60 + scale 0.96 → 1, 1.1s
 * - `data-appear="float"`     cartão flutuante/notificação: scale 0.9 → 1, entra 0.2s depois
 * - `data-appear-stagger`     grupo: os filhos diretos entram em sequência
 * - `data-words`              título que aparece palavra por palavra saindo do desfoque
 */

const BASE = { opacity: 0, y: 32, filter: 'blur(8px)', duration: 0.9, ease: 'expo.out' }

const VARIANTS: Record<string, gsap.TweenVars> = {
  '': BASE,
  visual: { opacity: 0, y: 60, scale: 0.96, filter: 'blur(8px)', duration: 1.1, ease: 'expo.out' },
  float: {
    opacity: 0,
    y: 24,
    scale: 0.9,
    filter: 'blur(8px)',
    duration: 0.9,
    ease: 'expo.out',
    delay: 0.2,
  },
}

const trigger = (el: Element, start = 'top 80%') => ({ trigger: el, start, once: true })

/** Título palavra por palavra saindo do desfoque (padrão NextPay). Retorna o SplitText. */
export function wordsFromBlur(el: Element, vars: gsap.TweenVars = {}) {
  return SplitText.create(el, {
    type: 'words',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        opacity: 0,
        y: 10,
        filter: 'blur(12px)',
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.09,
        clearProps: 'filter',
        ...vars,
      })
    },
  })
}

/** Liga todas as entradas marcadas dentro de `root`. Chamar dentro de um contexto do GSAP. */
export function initAppear(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    if (el.closest('[data-hero]')) return // o H1 é animado pela timeline do hero
    wordsFromBlur(el, { scrollTrigger: trigger(el, 'top 85%') })
  })

  root.querySelectorAll<HTMLElement>('[data-appear]').forEach((el) => {
    const vars = VARIANTS[el.dataset.appear ?? ''] ?? BASE
    gsap.from(el, { ...vars, clearProps: 'filter', scrollTrigger: trigger(el) })
  })

  root.querySelectorAll<HTMLElement>('[data-appear-stagger]').forEach((group) => {
    gsap.from(group.children, {
      ...BASE,
      stagger: 0.08,
      clearProps: 'filter',
      scrollTrigger: trigger(group),
    })
  })
}
