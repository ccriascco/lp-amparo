import { useGSAP } from '@gsap/react'
import { Check, Smartphone } from 'lucide-react'
import { useRef } from 'react'
import { CalculatorScreen } from '../components/phone/CalculatorScreen'
import { HomeScreen } from '../components/phone/HomeScreen'
import { HeroRings } from '../components/ui/HeroRings'
import { NotificationCard } from '../components/ui/NotificationCard'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { a11y, cta, ctaFinal as C } from '../content/copy'
import { APP_URL } from '../lib/config'
import { gsap } from '../lib/gsap'

/**
 * `#cta` (pedido do cliente): shell com o fundo do hero e os mesmos anéis, saindo de trás do celular.
 * Centro: chip, H2, texto, botão "Acessar o Amparo" (magnético, até 8px) e 3 micro-itens. Base:
 * celular cortado pela borda, da calculadora (Modo Disfarce) para a tela inicial com o scroll, e
 * notificações empilhadas ao lado. Movimento reduzido: tudo parado (tela inicial visível).
 */
export function CtaFinal() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const shell = q('[data-cta-shell]')[0]
        // Celular sobe (y 160 → 0) e troca a calculadora pela tela inicial.
        gsap.fromTo(
          q('[data-cta-phone]'),
          { y: 160 },
          { y: 0, ease: 'none', scrollTrigger: { trigger: shell, start: 'top 85%', end: 'center center', scrub: true } },
        )
        gsap.set(q('[data-cta-home]'), { opacity: 0 })
        gsap
          .timeline({ scrollTrigger: { trigger: shell, start: 'top 30%', end: 'top 5%', scrub: true } })
          .to(q('[data-cta-calc]'), { opacity: 0, ease: 'none' }, 0)
          .to(q('[data-cta-home]'), { opacity: 1, ease: 'none' }, 0)
        // Anéis pulsando em sequência, bem devagar (opacidade 0,25 ↔ 0,5, ciclo de 6s).
        const rings = q('[data-cta-rings] [data-ring]')
        gsap.fromTo(
          rings,
          { opacity: 0.25 },
          { opacity: 0.5, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.35, repeat: -1, yoyo: true } },
        )
        // Notificações: entram em sequência e depois flutuam ±6px.
        const notifs = q('[data-cta-notif]')
        gsap.from(notifs, {
          autoAlpha: 0,
          y: 24,
          scale: 0.94,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: { trigger: shell, start: 'top 55%', once: true },
          onComplete: () =>
            notifs.forEach((n, i) =>
              gsap.fromTo(n, { y: -6 }, { y: 6, duration: 2.6 + i * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
            ),
        })
        // Botão magnético (até 8px), só com mouse.
        const btn = q('[data-cta-magnet]')[0] as HTMLElement
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        const x = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' })
        const y = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          x(gsap.utils.clamp(-8, 8, dx * 8))
          y(gsap.utils.clamp(-8, 8, dy * 8))
        }
        const leave = () => (x(0), y(0))
        btn.addEventListener('pointermove', move)
        btn.addEventListener('pointerleave', leave)
        return () => {
          btn.removeEventListener('pointermove', move)
          btn.removeEventListener('pointerleave', leave)
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="cta" aria-labelledby="cta-title" className="bg-branco p-3 md:p-4">
      <div
        data-cta-shell
        className="relative isolate flex min-h-[760px] flex-col items-center overflow-clip rounded-[24px] px-5 pt-16 text-center md:min-h-[820px] md:pt-20"
        style={{ background: 'var(--grad-hero)' }}
      >
        {/* Anéis do hero, centrados atrás do celular */}
        <div data-cta-rings aria-hidden className="absolute inset-0 -z-10">
          <HeroRings className="top-[calc(100%-120px)] left-1/2" />
        </div>

        <span
          data-appear
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 caption text-vinho-profundo backdrop-blur-md"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-vinho" />
          {C.chip}
        </span>
        <h2
          id="cta-title"
          data-words
          className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance text-texto md:max-w-[18ch]"
        >
          {C.h2}
        </h2>
        <p data-appear className="mt-5 max-w-[560px] lead text-pretty text-texto-secundario">
          {C.text}
        </p>

        <div data-appear className="mt-8 w-full max-md:max-w-[420px] md:w-auto">
          <a
            data-cta-magnet
            href={APP_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-vinho px-9 text-[1.0625rem] font-bold text-white shadow-float transition-[background-color,scale] duration-200 hover:bg-vinho-profundo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vinho active:scale-[0.97] md:w-auto"
          >
            <Smartphone aria-hidden className="size-5" strokeWidth={2} />
            {cta.acessar}
          </a>
        </div>
        <ul data-appear className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-vinho-profundo">
          {C.itens.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check aria-hidden className="size-4 text-confirma" strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </ul>

        {/* Celular cortado pela borda de baixo + notificações ao lado */}
        <div className="relative mt-12 w-full flex-1">
          <div data-cta-phone className="absolute top-0 left-1/2 w-[240px] -translate-x-1/2 md:w-[300px]">
            <PhoneFrame screenClassName="bg-black" label={a11y.altHome}>
              <div className="relative h-full w-full">
                <div data-cta-calc className="absolute inset-0 motion-reduce:hidden">
                  <CalculatorScreen mode="auto" compact />
                </div>
                <div data-cta-home className="absolute inset-0">
                  <HomeScreen />
                </div>
              </div>
            </PhoneFrame>
          </div>
          <div className="absolute top-10 left-1/2 hidden w-[300px] md:ml-[180px] md:block lg:ml-[200px] [&_[data-notif]]:w-[300px]">
            {C.notificacoes.map((n, i) => (
              <div key={n.title} data-cta-notif className={i ? 'mt-3 ml-8' : ''}>
                <NotificationCard title={n.title} text={n.text} time={n.time} />
              </div>
            ))}
          </div>
          {/* Celular: uma notificação só */}
          <div data-cta-notif className="absolute top-24 left-1/2 w-[250px] -translate-x-1/2 md:hidden">
            <NotificationCard title={C.notificacoes[0].title} text={C.notificacoes[0].text} time={C.notificacoes[0].time} className="w-[250px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
