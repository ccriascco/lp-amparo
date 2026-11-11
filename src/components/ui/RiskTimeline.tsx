import { useGSAP } from '@gsap/react'
import { BellRing, ChevronRight, PhoneCall, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { leituraRisco } from '../../content/copy'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { Picture, type ImageSlot } from './TintedPhoto'

const A = leituraRisco.adapta

const ICONS: LucideIcon[] = [ShieldCheck, BellRing, PhoneCall]
const SLOTS: ImageSlot[] = ['risco-baixo', 'risco-medio', 'risco-alto']
/** Posição das setas ao longo da linha (entre Baixo e Médio, entre Médio e Alto). */
const CHEV_AT = [0.25, 0.75]

/** Desktop com movimento: linha horizontal e bloco fixo. Abaixo de 1024px: linha vertical. */
const LG = '(min-width: 1024px)'
const DESK = `${LG} and (prefers-reduced-motion: no-preference)`
const MOB = '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'

/**
 * "Como o app se adapta ao seu risco" (ajustes 7–8 da seção 7): linha do tempo Baixo → Médio → Alto,
 * toda em `vinho-profundo`. A linha vai do marco Baixo ao marco Alto e se preenche com o scroll
 * (desktop: bloco fixo por ~150vh; abaixo de 1024px: vertical, sem sticky). Cada marco acende quando
 * a linha chega nele (cor + anéis, medidor por DrawSVG) e o cartão do nível fica nítido, com a
 * ilustração acendendo. Não apaga ao voltar, só ao sair pelo início da seção.
 * O markup já traz o estado final (tudo aceso e nítido): é o que fica com movimento reduzido.
 */
export function RiskTimeline() {
  const root = useRef<HTMLDivElement>(null)

  // A linha liga o centro do 1º marco ao centro do último (horizontal ou vertical, conforme a largura).
  useEffect(() => {
    const el = root.current
    if (!el) return
    const ol = el.querySelector('ol')!
    const line = el.querySelector<HTMLElement>('[data-tl-line]')!
    const layout = () => {
      const markers = el.querySelectorAll('[data-tl-marker]')
      const o = ol.getBoundingClientRect()
      const a = markers[0].getBoundingClientRect()
      const b = markers[markers.length - 1].getBoundingClientRect()
      const ax = a.left + a.width / 2 - o.left
      const ay = a.top + a.height / 2 - o.top
      const bx = b.left + b.width / 2 - o.left
      const by = b.top + b.height / 2 - o.top
      const horizontal = window.matchMedia(LG).matches
      Object.assign(line.style, {
        left: `${horizontal ? ax : ax - 1}px`,
        top: `${horizontal ? ay - 1 : ay}px`,
        width: `${horizontal ? bx - ax : 2}px`,
        height: `${horizontal ? 2 : by - ay}px`,
      })
      ScrollTrigger.refresh()
    }
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(ol)
    return () => ro.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desk: DESK, mob: MOB }, (ctx) => {
        const desk = Boolean((ctx.conditions as { desk?: boolean }).desk)
        const el = root.current!
        const q = gsap.utils.selector(el)
        const items = q('[data-tl-item]')
        const pick = <T extends Element>(sel: string) =>
          items.map((it) => it.querySelector<T>(sel)!)
        const cards = pick<HTMLElement>('[data-tl-card]')
        const bodies = pick<HTMLElement>('[data-tl-body]')
        const arts = pick<HTMLElement>('[data-tl-art]')
        const gauges = pick<SVGPathElement>('[data-tl-gauge]')
        const line = q('[data-tl-line]')[0]
        const fill = q('[data-tl-fill]')[0]

        // Laços de cada nível (anéis pulsando no marco), criados pausados.
        const loops = items.map((it) => {
          const ls: gsap.core.Tween[] = []
          it.querySelectorAll<HTMLElement>('[data-tl-pulse]').forEach((r) => {
            const k = Number(r.dataset.tlI)
            ls.push(
              gsap
                .fromTo(
                  r,
                  { scale: 1, opacity: 0.5 },
                  { scale: 1.6, opacity: 0, duration: 2.4, ease: 'sine.out', repeat: -1, delay: k * 1.2 },
                )
                .pause(),
            )
          })
          return ls
        })

        // Estado inicial: nada aceso, linha vazia, cartões apagados.
        const on = items.map(() => false)
        let visible = false
        const chevs = q('[data-tl-chev]')
        // Revela por recorte, a partir do marco Baixo.
        const setFill = (f: number) => {
          const rest = `${((1 - f) * 100).toFixed(2)}%`
          gsap.set(fill, { clipPath: desk ? `inset(0 ${rest} 0 0)` : `inset(0 0 ${rest} 0)` })
        }
        const sync = () =>
          loops.forEach((ls, i) => ls.forEach((t) => (visible && on[i] ? t.play() : t.pause())))
        const off = () => {
          gsap.set(cards, { y: 24, filter: 'blur(6px)' })
          gsap.set(bodies, { opacity: 0.4 })
          gsap.set(arts, { opacity: 0.5 })
          gsap.set(gauges, { drawSVG: '0% 0%' })
        }
        items.forEach((it) => delete it.dataset.on)
        chevs.forEach((c) => delete c.dataset.on)
        setFill(0)
        off()

        const activate = (i: number) => {
          if (on[i]) return
          on[i] = true
          items[i].dataset.on = ''
          const ease = 'expo.out'
          gsap.to(cards[i], { y: 0, filter: 'blur(0px)', duration: 0.8, ease, overwrite: true })
          gsap.to(bodies[i], { opacity: 1, duration: 0.8, ease, overwrite: true })
          gsap.to(arts[i], { opacity: 1, duration: 0.8, ease, overwrite: 'auto' })
          gsap.to(gauges[i], {
            drawSVG: `0% ${Number(gauges[i].dataset.fill) * 100}%`,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: true,
          })
          sync()
        }
        // Voltando com o scroll: o nível apaga quando a linha recua para antes do marco.
        const deactivate = (i: number) => {
          if (!on[i]) return
          on[i] = false
          delete items[i].dataset.on
          sync()
          const ease = 'power2.out'
          gsap.to(cards[i], { y: 24, filter: 'blur(6px)', duration: 0.5, ease, overwrite: true })
          gsap.to(bodies[i], { opacity: 0.4, duration: 0.5, ease, overwrite: true })
          gsap.to(arts[i], { opacity: 0.5, duration: 0.5, ease, overwrite: true })
          gsap.to(gauges[i], { drawSVG: '0% 0%', duration: 0.5, ease, overwrite: true })
        }

        // Setas entre os marcos: enchem de cor com um "pulo" quando a linha passa por elas.
        const chevOn = chevs.map(() => false)
        const setChev = (k: number, v: boolean) => {
          if (chevOn[k] === v) return
          chevOn[k] = v
          const c = chevs[k]
          if (v) {
            c.dataset.on = ''
            gsap.fromTo(c, { scale: 0.7 }, { scale: 1, duration: 0.6, ease: 'back.out(3)', overwrite: true })
          } else {
            delete c.dataset.on
            gsap.fromTo(c, { scale: 1.1 }, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: true })
          }
        }

        // Posição de cada marco ao longo da linha (0 = Baixo, 1 = Alto).
        let pos: number[] = []
        const measure = () => {
          const r = line.getBoundingClientRect()
          pos = items.map((it) => {
            const m = it.querySelector('[data-tl-marker]')!.getBoundingClientRect()
            const p = desk
              ? (m.left + m.width / 2 - r.left) / r.width
              : (m.top + m.height / 2 - r.top) / r.height
            return Math.min(1, Math.max(0, p))
          })
        }
        measure()

        ScrollTrigger.create({
          trigger: desk ? q('[data-tl-pin]')[0] : q('ol')[0],
          start: desk ? 'top top' : 'top 70%',
          end: desk ? 'bottom bottom' : 'bottom 70%',
          onRefresh: measure,
          onUpdate: (self) => {
            // Desktop: a linha enche nos primeiros 85% do bloco fixo; o resto é respiro no fim.
            // Acompanha o scroll nos dois sentidos: ao voltar, a linha recua e os níveis apagam.
            const f = desk ? Math.min(1, self.progress / 0.85) : self.progress
            setFill(f)
            // A linha sai do Baixo: ele acende assim que a rolagem começa.
            pos.forEach((p, i) =>
              (i === 0 ? self.progress > 0 : f >= p - 0.01) ? activate(i) : deactivate(i),
            )
            CHEV_AT.forEach((p, k) => setChev(k, f >= p))
          },
        })
        // Laços só com a linha do tempo na tela.
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            visible = self.isActive
            sync()
          },
        })

        // Ao sair deste modo (ex.: movimento reduzido), o markup volta ao estado final.
        return () => [...items, ...chevs].forEach((it) => (it.dataset.on = ''))
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="mt-10 md:mt-14">
      {/* Desktop: bloco fixo por ~150vh enquanto a linha se preenche (sem sticky com movimento reduzido) */}
      <div data-tl-pin className="relative lg:h-[160vh] lg:motion-reduce:h-auto">
        {/* Fixo só com a altura do conteúdo, centralizado na tela: ao soltar, a seção seguinte vem logo depois (sem o vazio de uma tela inteira em 1920). */}
        <div className="lg:sticky lg:top-[max(6rem,calc(50vh-20rem))] lg:motion-reduce:static">
          <h3
            data-appear
            className="text-center font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.01em] text-texto md:text-[1.875rem]"
          >
            {A.title}
          </h3>

          <ol
            aria-label={A.ariaLabel}
            className="relative mt-10 grid gap-y-10 lg:mt-12 lg:grid-cols-3 lg:gap-x-6"
          >
            {/* Linha do marco Baixo ao marco Alto (posição calculada a partir dos marcos) */}
            <span aria-hidden data-tl-line className="absolute bg-borda">
              <span
                data-tl-fill
                className="absolute inset-y-0 -inset-x-px rounded-full bg-vinho-profundo lg:inset-x-0 lg:-inset-y-px"
              />
              {/* Chevrons entre os marcos (o risco subindo) */}
              {CHEV_AT.map((x) => (
                <span
                  key={x}
                  className="absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  style={{ left: `${x * 100}%` }}
                >
                  {/* Caixa interna separada: o GSAP anima a escala sem desfazer a centralização */}
                  <span
                    data-tl-chev
                    data-on=""
                    className="grid size-6 place-items-center rounded-full border border-borda bg-white text-vinho-profundo/70 transition-colors duration-300 data-on:border-vinho-profundo data-on:bg-vinho-profundo data-on:text-white"
                  >
                    <ChevronRight className="size-3.5" strokeWidth={2.25} />
                  </span>
                </span>
              ))}
            </span>

            {A.levels.map((l, i) => {
              const Icon = ICONS[i]
              return (
                <li
                  key={l.label}
                  data-tl-item
                  data-on=""
                  className="group/tl relative grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 lg:grid-cols-1 lg:justify-items-center"
                >
                  {/* Pílula do nível + medidor */}
                  <div className="col-start-2 row-start-1 flex h-14 items-center gap-3 lg:col-start-1 lg:h-20 lg:items-end lg:pb-4">
                    <span className="rounded-full bg-vinho-profundo px-3 py-1.5 text-[0.8125rem] leading-none font-bold text-white">
                      {l.label}
                    </span>
                    <MiniGauge fill={(i + 1) / 3} />
                  </div>

                  {/* Marco sobre a linha */}
                  <span
                    aria-hidden
                    data-tl-marker
                    className="relative col-start-1 row-start-1 grid size-14 place-items-center rounded-full border-2 border-borda bg-white text-vinho-profundo/40 transition-[border-color,color] duration-500 group-data-on/tl:border-transparent group-data-on/tl:text-white lg:row-start-2"
                  >
                    <span className="absolute -inset-0.5 rounded-full bg-vinho-profundo opacity-0 transition-opacity duration-500 group-data-on/tl:opacity-100" />
                    {[0, 1].map((k) => (
                      <span
                        key={k}
                        data-tl-pulse
                        data-tl-i={k}
                        className="absolute -inset-0.5 rounded-full border-2 border-vinho-profundo opacity-0"
                      />
                    ))}
                    <Icon className="relative size-6" strokeWidth={1.75} />
                  </span>

                  {/* Cartão do nível */}
                  <div
                    data-tl-card
                    className="col-start-2 row-start-2 mt-3 w-full lg:col-start-1 lg:row-start-3 lg:mt-6 lg:max-w-[360px]"
                  >
                    <article className="h-full rounded-card-lg bg-white p-2.5 shadow-card">
                      <div className="h-[170px] overflow-hidden rounded-card bg-superficie lg:h-[200px]">
                        <div data-tl-art className="size-full">
                          <Picture
                            slot={SLOTS[i]}
                            sizes="(min-width: 1024px) 340px, 80vw"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div data-tl-body className="px-3 pt-4 pb-3">
                        <h4 className="font-display text-xl leading-tight font-semibold tracking-[-0.01em] text-texto">
                          {l.title}
                        </h4>
                        <p className="mt-1.5 text-[0.9375rem] text-pretty text-texto-secundario">
                          {l.text}
                        </p>
                      </div>
                    </article>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

const ARC = 'M6 32 A26 26 0 0 1 58 32'
const ARC_LEN = Math.PI * 26

/** Medidor semicircular de 40px em `vinho-profundo`. `fill` de 0 a 1 (o markup já vem preenchido). */
function MiniGauge({ fill }: { fill: number }) {
  return (
    <svg aria-hidden width="40" height="24" viewBox="0 0 64 38" fill="none" className="shrink-0">
      <path d={ARC} stroke="var(--color-borda)" strokeWidth={7} strokeLinecap="round" />
      <path
        data-tl-gauge
        data-fill={fill}
        d={ARC}
        stroke="var(--color-vinho-profundo)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${ARC_LEN * fill} ${ARC_LEN}`}
      />
    </svg>
  )
}
