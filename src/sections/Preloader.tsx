import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import wordmark from '../assets/brand/amparo-wordmark-branco.svg'
import { BrandDrop } from '../components/ui/BrandDrop'
import { preloader } from '../content/copy'
import { gsap } from '../lib/gsap'
import { markPreloaderSeen, startIntro } from '../lib/intro'

/**
 * Tela de abertura (DESIGN §6.22 e §7.0, padrão Gaia + Gardance): logo vertical branco com a gota
 * se desenhando, contador grande 0 → 100 no canto inferior direito e saída em fade (~2,8s).
 * Quem decide se aparece é o `App` (`shouldShowPreloader`).
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const path = q('[data-drop-path]')
      const fade = q('[data-pre-fade]')
      const n = { v: 0 }

      // Trava a rolagem enquanto a abertura está na tela.
      const html = document.documentElement
      const prev = html.style.overflow
      html.style.overflow = 'hidden'

      const finish = () => {
        html.style.overflow = prev
        markPreloaderSeen()
        setGone(true)
      }

      const tl = gsap.timeline({ onComplete: finish })
      tl.set(path, { drawSVG: '0%', fillOpacity: 0, stroke: '#fff', strokeWidth: 1.6 })
        // 1. A gota se desenha e o preenchimento aparece; o nome sobe saindo do desfoque.
        .to(path, { drawSVG: '100%', duration: 1, ease: 'power2.inOut' }, 0)
        .to(path, { fillOpacity: 1, duration: 0.3, ease: 'power1.out' }, 0.9)
        .from(
          q('[data-pre-word]'),
          { y: 12, opacity: 0, filter: 'blur(8px)', duration: 0.6, ease: 'expo.out' },
          0.2,
        )
        // 2. Contador 0 → 100 com aceleração no começo e desaceleração no fim.
        .to(
          n,
          {
            v: 100,
            duration: 2,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(n.v))
            },
          },
          0,
        )
        // 3. Logo, contador e texto somem juntos.
        .to(fade, { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' }, 2)
        // 4. Fade do preloader; o hero começa junto (§7.1).
        .call(startIntro, undefined, 2.2)
        .to(root.current, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 2.2)

      // Nunca segura a página por mais de 3s (fontes atrasadas, aba em segundo plano…).
      const guard = window.setTimeout(() => tl.progress(1), 3000)
      return () => {
        window.clearTimeout(guard)
        html.style.overflow = prev
      }
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div
      ref={root}
      role="presentation"
      className="on-dark fixed inset-0 z-[100] grid place-items-center text-white"
      style={{ background: 'var(--grad-vinho)' }}
    >
      <div data-pre-fade className="flex flex-col items-center gap-5">
        <BrandDrop className="h-[clamp(4.5rem,9vw,6.5rem)] w-auto overflow-visible" />
        <img
          data-pre-word
          src={wordmark}
          alt="Amparo"
          width={160}
          height={42}
          className="h-[clamp(1.75rem,3.2vw,2.5rem)] w-auto"
        />
      </div>

      <p
        data-pre-fade
        className="absolute bottom-6 left-5 max-w-[22ch] text-small text-white/70 md:bottom-10 md:left-10 md:max-w-none"
      >
        {preloader.line}
      </p>
      <p
        data-pre-fade
        aria-hidden
        className="absolute right-5 bottom-3 flex items-start font-display leading-none font-medium tracking-[-0.04em] tabular-nums md:right-10 md:bottom-6"
      >
        <span ref={count} className="text-[clamp(4rem,9vw,8rem)]">
          0
        </span>
        <span className="mt-[0.4em] ml-1 text-[clamp(1rem,1.6vw,1.5rem)] text-white/70">%</span>
      </p>
    </div>
  )
}
