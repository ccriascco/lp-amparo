import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'
import { formatNumber } from '../lib/format'
import { initAppear } from '../lib/appear'
import { gsap, MQ, ScrollTrigger, scrollToHash, startSmoothScroll } from '../lib/gsap'

const HEX = '0123456789abcdef'

/**
 * Movimento global da landing (DESIGN.md §7, §7.9): scroll suave, títulos por linha,
 * fotos por máscara, shells, contadores, hash, rede, progresso, selo e cartões flutuantes.
 * Tudo dentro de `gsap.matchMedia()` — com movimento reduzido nada disso roda e a página
 * fica no estado final.
 */
export function useSiteMotion() {
  // Lenis + âncoras + refresh após fontes e imagens.
  useEffect(() => {
    const stop = startSmoothScroll()

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return
      const hash = a.getAttribute('href')
      if (!hash || hash === '#' || hash === '#kit') return
      if (scrollToHash(hash)) {
        e.preventDefault()
        history.pushState(null, '', hash)
      }
    }
    document.addEventListener('click', onClick)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    // Link direto para uma seção (#recursos): rola depois do layout estabilizar.
    if (location.hash && location.hash !== '#kit') {
      const h = location.hash
      window.setTimeout(() => scrollToHash(h), 300)
    }

    return () => {
      stop()
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
    }
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean }
      const k = desktop ? 1 : 0.5 // mobile: metade das amplitudes (§7.10)

      // "Aparecer no scroll" (§7.11): títulos palavra por palavra, textos, cartões e visuais.
      initAppear(document)

      // Fotos: revelação por máscara + imagem interna com parallax.
      gsap.utils.toArray<HTMLElement>('[data-reveal-photo]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'expo.inOut',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
        const img = el.querySelector('.parallax-img')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 * k },
            {
              yPercent: 8 * k,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })

      // Shells (#disfarce, CTA final) entram "abrindo" das margens.
      const r = desktop ? 40 : 28
      gsap.utils.toArray<HTMLElement>('[data-shell-open]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: `inset(6% 4% round ${r}px)` },
          {
            clipPath: `inset(0% 0% round ${r}px)`,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: true },
          },
        )
      })

      // Anéis concêntricos (fora do hero) expandem devagar.
      gsap.utils.toArray<SVGElement>('[data-rings]').forEach((el) => {
        if (el.closest('[data-hero]')) return
        gsap.fromTo(
          el,
          { scale: 1 },
          {
            scale: 1 + 0.15 * k,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      // Contadores: 0 → valor em 1,6s, formatado em pt-BR (§7.3).
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const to = Number(el.dataset.count)
        const decimals = Number(el.dataset.decimals ?? 0)
        const obj = { v: 0 }
        el.textContent = formatNumber(0, decimals)
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = formatNumber(decimals ? obj.v : Math.round(obj.v), decimals)
          },
        })
      })

      // Hash: caracteres embaralham e fixam da esquerda para a direita em 1,2s (§6.12).
      gsap.utils.toArray<HTMLElement>('[data-hash]').forEach((el) => {
        const final = el.dataset.hash ?? ''
        const badge = el.closest('section')?.querySelector('[data-hash-badge]')
        if (badge) gsap.set(badge, { autoAlpha: 0, scale: 0.9 })
        const p = { v: 0 }
        gsap.to(p, {
          v: 1,
          duration: 1.2,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          onUpdate: () => {
            const fixed = Math.floor(p.v * final.length)
            el.textContent = [...final]
              .map((ch, i) =>
                i < fixed || !/[0-9a-f]/.test(ch) ? ch : HEX[Math.floor(Math.random() * 16)],
              )
              .join('')
          },
          onComplete: () => {
            el.textContent = final
            if (badge)
              gsap.to(badge, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
          },
        })
      })

      // Rede: linhas se desenham com o scroll; cada guardiã aparece ao fim da sua linha (§7.4).
      gsap.utils.toArray<HTMLElement>('[data-rede]').forEach((section) => {
        const graph = section.querySelector('[role="img"]')
        if (!graph) return
        const lines = gsap.utils.toArray<SVGLineElement>('[data-net-line]', graph)
        const nodes = gsap.utils.toArray<HTMLElement>('[data-net-node]', graph)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: graph, start: 'top 85%', end: 'center 45%', scrub: true },
        })
        lines.forEach((line, i) => {
          const at = i * 0.6
          if (line.getAttribute('stroke-dasharray'))
            tl.from(line, { opacity: 0, duration: 0.6 }, at)
          else tl.from(line, { drawSVG: '0%', duration: 0.8, ease: 'none' }, at)
          tl.from(nodes[i], { autoAlpha: 0, scale: 0.6, duration: 0.35 }, at + 0.6)
          const check = nodes[i]?.querySelector('[data-net-check]')
          if (check) tl.from(check, { scale: 0, duration: 0.25, ease: 'back.out(3)' }, at + 0.8)
        })
      })

      // Como começar: a linha se preenche com o scroll (§7.6).
      gsap.utils.toArray<HTMLElement>('[data-steps]').forEach((el) => {
        const fill = el.querySelector('[data-progress-fill]')
        if (!fill) return
        gsap.fromTo(fill, desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 }, {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: true },
        })
      })

      // Selo circular: 360° em 24s; acelera um pouco com a velocidade do scroll (§6.20).
      const spins = gsap.utils.toArray<SVGElement>('[data-badge-spin]').map((el) =>
        gsap.to(el, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        }),
      )
      if (spins.length) {
        ScrollTrigger.create({
          onUpdate: (self) => {
            const ts = gsap.utils.clamp(1, 3, 1 + Math.abs(self.getVelocity()) / 1200)
            spins.forEach((t) =>
              gsap.to(t, {
                timeScale: ts,
                duration: 0.25,
                overwrite: true,
                onComplete: () => void gsap.to(t, { timeScale: 1, duration: 0.8 }),
              }),
            )
          },
        })
      }

      // Cartões flutuantes: só no desktop (§6.6).
      if (desktop) {
        gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 6 : -6,
            duration: 4 + (i % 3),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.4,
          })
        })
      }
    })

    return () => mm.revert()
  })
}
