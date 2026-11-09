import { useGSAP } from '@gsap/react'
import { useCallback, useRef, type RefObject } from 'react'
import type { CalculatorHandle } from '../components/phone/CalculatorScreen'
import { gsap, MQ, ScrollTrigger, SplitText } from '../lib/gsap'
import { introStart } from '../lib/intro'

const CODE = ['1', '9', '0', '7'] as const
const STACK_Y = [0, 14, 28]
const STACK_S = [1, 0.94, 0.88]
const STACK_O = [1, 0.75, 0.45]

/**
 * Hero "Desbloqueio" (DESIGN §7.1) + parallax do hero (§7.9).
 * Começa quando o preloader inicia o fade (ou direto, sem preloader). Com movimento reduzido nada
 * roda e o hero fica no estado final do markup.
 */
export function useHeroMotion(
  root: RefObject<HTMLElement | null>,
  calc: RefObject<CalculatorHandle | null>,
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const mm = gsap.matchMedia()

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean }
        const q = gsap.utils.selector(el)
        const veil = q('[data-hero-veil]')[0]
        const phone = q('[data-hero-phone]')[0]
        const calcLayer = q('[data-hero-calc]')[0]
        const homeLayer = q('[data-hero-home]')[0]
        const sides = q('[data-hero-side]')
        const sideInners = q('[data-hero-side-inner]')
        const pops = q('[data-hero-pop]').filter((p) => !p.hasAttribute('data-hero-notifs'))
        const notifs = q('[data-hero-notifs] [data-notif]')
        const notifBox = q('[data-hero-notifs]')[0]
        const rings = q('[data-hero-veil] [data-ring]')
        const ringsSvg = q('[data-hero-veil] [data-rings]')[0]
        const replayBtn = q('[data-hero-replay]')[0]
        const eqKey = q('[data-hero-calc] [data-key="="]')[0]
        const blur = (px: number) => `blur(${px}px)`

        const aimAtEquals = () => {
          const r = el.getBoundingClientRect()
          const k = eqKey.getBoundingClientRect()
          gsap.set(veil, {
            '--x': `${k.left + k.width / 2 - r.left}px`,
            '--y': `${k.top + k.height / 2 - r.top}px`,
          })
        }

        const split = SplitText.create(q('[data-hero-title]')[0], { type: 'words' })

        // Timeline pausada até a abertura liberar (preloader em fade ou página sem preloader).
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        tlRef.current = tl

        // Estado inicial: fundo branco, sem véu e sem anéis, só texto e celular central.
        tl.set(veil, { '--r': '0%' })
          .set(calcLayer, { autoAlpha: 1 })
          .set(homeLayer, { autoAlpha: 0 })
          .set(rings, { drawSVG: '0%' })
          .set(sideInners, { y: 120, autoAlpha: 0 })
          .set(sideInners[0] ?? {}, { rotation: 12 })
          .set(sideInners[1] ?? {}, { rotation: -12 })
          .set(pops, { scale: 0.8, autoAlpha: 0 })
          .set(notifs, { autoAlpha: 0, y: -16, filter: blur(8) })
          .set(replayBtn, { autoAlpha: 0 })

        // 1. Chip; H1 palavra por palavra saindo do desfoque (NextPay); subtítulo, botões, checks.
        tl.from(q('[data-hero-chip]'), { y: 12, autoAlpha: 0, filter: blur(8), duration: 0.6 }, 0)
          .from(
            split.words,
            { opacity: 0, y: 10, filter: blur(12), duration: 0.8, stagger: 0.09 },
            0.1,
          )
          .from(q('[data-hero-rest]'), { y: 16, autoAlpha: 0, filter: blur(8), duration: 0.6 }, 0.5)
          // 2. Celular central sobe.
          .from(phone, { yPercent: 40, autoAlpha: 0, duration: 1 }, 0.4)
          .addLabel('keys', 1.3)

        // 3. Teclas 1, 9, 0, 7 acendem uma a uma.
        CODE.forEach((d, i) => {
          const key = q(`[data-hero-calc] [data-key="${d}"]`)[0]
          const t = `keys+=${i * 0.18}`
          tl.call(() => calc.current?.press(d), undefined, t).fromTo(
            key,
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.92,
              filter: 'brightness(1.8)',
              duration: 0.09,
              yoyo: true,
              repeat: 1,
              ease: 'power1.inOut',
              immediateRender: false,
            },
            t,
          )
        })

        // 4–5. "=", onda do gradiente + anéis a partir da tecla, tela vira a HomeScreen.
        tl.fromTo(
          eqKey,
          { scale: 1, filter: 'brightness(1)' },
          {
            scale: 0.92,
            filter: 'brightness(1.25)',
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
            immediateRender: false,
          },
          2.2,
        )
          .call(aimAtEquals, undefined, 2.3)
          .to(veil, { '--r': '150%', duration: 1, ease: 'expo.inOut' }, 2.35)
          .to(calcLayer, { autoAlpha: 0, duration: 0.45, ease: 'power2.inOut' }, 2.4)
          .to(homeLayer, { autoAlpha: 1, duration: 0.45, ease: 'power2.inOut' }, 2.4)
          .to(rings, { drawSVG: '100%', duration: 1.1, stagger: 0.08, ease: 'power2.out' }, 2.4)
          // 6. Celulares laterais em leque.
          .to(sideInners, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.9 }, 2.9)
          // 7. Pílulas, ícones e selo; notificações chegando uma a uma (Eduzz).
          .to(
            pops,
            { scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)' },
            3.2,
          )
          .from(q('[data-badge]'), { autoAlpha: 0, scale: 0.8, duration: 0.6 }, 3.3)
          .to(replayBtn, { autoAlpha: 1, duration: 0.4 }, 3.6)

        // Notificações: a mais antiga chega primeiro no topo e é empurrada para trás pelas novas.
        const order = [...notifs].reverse() // [3ª, 2ª, 1ª] → a 1ª (Alerta enviado) chega por último
        order.forEach((n, i) => {
          const t = 3.3 + i * 0.35
          tl.to(n, { autoAlpha: 1, y: 0, scale: 1, filter: blur(0), duration: 0.6 }, t)
          // as que já chegaram descem um degrau na pilha
          order.slice(0, i).forEach((prev, j) => {
            const depth = i - j
            tl.to(
              prev,
              { y: STACK_Y[depth], scale: STACK_S[depth], opacity: STACK_O[depth], duration: 0.5 },
              t,
            )
          })
        })
        tl.set(notifs, { clearProps: 'filter' })

        void introStart.then(() => tl.play(0))

        // will-change só enquanto o hero está na tela (§7.10).
        const layers = [phone, ...sides, ...pops, notifBox, ringsSvg, veil].filter(Boolean)
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) =>
            gsap.set(layers, { willChange: self.isActive ? 'transform' : 'auto' }),
        })

        // Parallax (§7.9), metade das amplitudes no mobile.
        const amp = desktop ? 1 : 0.5
        const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(veil, { yPercent: 15 * amp, ease: 'none', scrollTrigger: st })
        if (ringsSvg) gsap.to(ringsSvg, { scale: 1 + 0.15 * amp, ease: 'none', scrollTrigger: st })
        // Celular central sobe mais rápido e gira/inclina ao sair (Gardance).
        gsap.to(phone, {
          y: () => -0.14 * amp * phone.offsetHeight,
          rotation: -8 * amp,
          rotationX: 12 * amp,
          scale: 1 - 0.08 * amp,
          transformOrigin: '50% 30%',
          ease: 'none',
          scrollTrigger: st,
        })
        sides.forEach((s, i) => {
          const dir = i === 0 ? -1 : 1
          gsap.to(s, {
            rotation: dir * (12 + 6 * amp),
            x: dir * 40 * amp,
            yPercent: -6 * amp,
            ease: 'none',
            scrollTrigger: st,
          })
        })
        q('[data-depth]').forEach((p) => {
          gsap.to(p, { y: Number(p.dataset.depth) * amp, ease: 'none', scrollTrigger: st })
        })
        gsap.to(q('[data-hero-text]'), {
          autoAlpha: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: '40% top', scrub: true },
        })

        return () => {
          split.revert()
          tlRef.current = null
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  /** "↺ Ver de novo": reinicia a parte do celular (passos 3–7). */
  const replay = useCallback(() => {
    const tl = tlRef.current
    if (!tl) return
    calc.current?.reset()
    tl.seek('keys', true).play()
  }, [calc])

  return { replay }
}
