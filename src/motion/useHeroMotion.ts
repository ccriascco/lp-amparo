import { useGSAP } from '@gsap/react'
import { useCallback, useRef, type RefObject } from 'react'
import type { CalculatorHandle } from '../components/phone/CalculatorScreen'
import { gsap, MQ, ScrollTrigger, SplitText } from '../lib/gsap'

const CODE = ['1', '9', '0', '7'] as const

/**
 * Hero "Desbloqueio" (DESIGN.md §7.1) + parallax do hero (§7.9).
 * Texto primeiro; depois o celular sobe com a calculadora, digita 1907, toca "=" e o véu vinho
 * se espalha em onda a partir da tecla; anéis se desenham; celulares laterais abrem em leque.
 * Com movimento reduzido: nada roda e o hero fica no estado final (markup estático).
 */
export function useHeroMotion(
  root: RefObject<HTMLDivElement | null>,
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
        const pops = q('[data-hero-pop]')
        const rings = q('[data-hero-stage] [data-ring]')
        const ringsSvg = q('[data-hero-stage] [data-rings]')[0]
        const replayBtn = q('[data-hero-replay]')[0]
        const eqKey = q('[data-hero-calc] [data-key="="]')[0]

        // Centro da tecla "=" medido na hora da onda (o layout pode mudar com as fontes).
        const aimAtEquals = () => {
          const r = el.getBoundingClientRect()
          const k = eqKey.getBoundingClientRect()
          gsap.set(veil, {
            '--x': `${k.left + k.width / 2 - r.left}px`,
            '--y': `${k.top + k.height / 2 - r.top}px`,
          })
        }

        const split = SplitText.create(q('[data-hero-title]')[0], { type: 'lines', mask: 'lines' })

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tlRef.current = tl

        // Estado inicial: fundo branco, só o texto e o celular central (com a calculadora).
        tl.set(veil, { '--r': '0%' })
          .set(calcLayer, { autoAlpha: 1 })
          .set(homeLayer, { autoAlpha: 0 })
          .set(rings, { drawSVG: '0%' })
          .set(sideInners, { y: 120, autoAlpha: 0 })
          .set(sideInners[0] ?? {}, { rotation: 12 })
          .set(sideInners[1] ?? {}, { rotation: -12 })
          .set(pops, { scale: 0.8, autoAlpha: 0 })
          .set(replayBtn, { autoAlpha: 0 })

        // 1. Texto (0s): chip, H1 por linhas, depois subtítulo, botões e checks.
        tl.from(q('[data-hero-chip]'), { y: 16, autoAlpha: 0, duration: 0.6 }, 0)
          .from(split.lines, { yPercent: 110, stagger: 0.08, duration: 0.9 }, 0.05)
          .from(q('[data-hero-rest]'), { y: 16, autoAlpha: 0, duration: 0.6 }, 0.3)
          // 2. Celular central sobe (0.4s).
          .from(phone, { yPercent: 40, autoAlpha: 0, duration: 1 }, 0.4)
          .addLabel('keys', 1.3)

        // 3. Teclas 1, 9, 0, 7 acendem uma a uma (180ms cada).
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

        // 4. "=" (2.2s) — só visual: o display continua mostrando 1907 até o crossfade.
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
          // 5. Véu vinho se espalha a partir do "=" (2.35s); tela vira a HomeScreen; anéis se desenham.
          .call(aimAtEquals, undefined, 2.3)
          .to(veil, { '--r': '150%', duration: 1, ease: 'expo.inOut' }, 2.35)
          .to(calcLayer, { autoAlpha: 0, duration: 0.45, ease: 'power2.inOut' }, 2.4)
          .to(homeLayer, { autoAlpha: 1, duration: 0.45, ease: 'power2.inOut' }, 2.4)
          .to(rings, { drawSVG: '100%', duration: 1.1, stagger: 0.08, ease: 'power2.out' }, 2.4)
          // 6. Celulares laterais sobem de trás e abrem em leque (2.9s).
          .to(sideInners, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.9 }, 2.9)
          // 7. Pílulas, cartões, círculos de ícone e selo (3.2s).
          .to(
            pops,
            { scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)' },
            3.2,
          )
          .from(q('[data-badge]'), { autoAlpha: 0, scale: 0.8, duration: 0.6 }, 3.3)
          .to(replayBtn, { autoAlpha: 1, duration: 0.4 }, 3.6)

        // will-change só enquanto o hero está na tela (§7.10): evita re-rasterizar
        // os celulares (cheios de texto) a cada quadro do parallax.
        const layers = [phone, ...sides, ...pops, ringsSvg, veil].filter(Boolean)
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) =>
            gsap.set(layers, { willChange: self.isActive ? 'transform' : 'auto' }),
        })

        // Parallax do hero (§7.9), metade das amplitudes no mobile.
        const amp = desktop ? 1 : 0.5
        const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(veil, { yPercent: 15 * amp, ease: 'none', scrollTrigger: st })
        if (ringsSvg)
          gsap.to(ringsSvg, {
            yPercent: 15 * amp,
            scale: 1 + 0.15 * amp,
            ease: 'none',
            scrollTrigger: st,
          })
        gsap.to(phone, {
          y: () => -0.14 * amp * phone.offsetHeight,
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
        pops.forEach((p) => {
          const depth = Number(p.dataset.depth)
          if (!depth) return
          gsap.to(p, { y: depth * amp, ease: 'none', scrollTrigger: st })
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
