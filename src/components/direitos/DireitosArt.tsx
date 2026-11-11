import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { Building2, Check, FileText, Flag, MapPin, ShieldCheck, type LucideIcon } from 'lucide-react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { direitos } from '../../content/copy'
import { gsap, ScrollTrigger } from '../../lib/gsap'

gsap.registerPlugin(MotionPathPlugin)

const A = direitos.art
const ICON_STROKE = 1.5
const VINHO = (a: number) => `rgb(149 75 110 / ${a})`

/** Mini-cartão de interface: branco, raio 12px, sombra suave. */
export const FRAG = 'rounded-[12px] bg-white shadow-[0_8px_24px_-12px_rgb(75_42_63/0.22)]'

/* ------------------------------------------------------------------------------------------------
 * Painel + motor comum: timeline própria (paused), play só com o cartão na tela, hover acelera para
 * 1.3x e move os fragmentos (`data-depth`) seguindo o mouse (até 6px). Movimento reduzido: nada é
 * criado e o markup já é o estado final da ilustração.
 * ---------------------------------------------------------------------------------------------- */

type Build = (q: (sel: string) => Element[], root: HTMLElement) => gsap.core.Timeline

function useArt(ref: RefObject<HTMLDivElement | null>, build: Build, deps: unknown[] = []) {
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(el)
        const tl = build(q, el)
        tl.pause()
        const layers = q('[data-depth]') as HTMLElement[]
        const setWill = (on: boolean) =>
          layers.forEach((l) => (l.style.willChange = on ? 'transform, opacity' : ''))
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          end: 'bottom 10%',
          onToggle: (self) => {
            setWill(self.isActive)
            if (self.isActive) tl.play()
            else tl.pause()
          },
        })

        // Hover (só com mouse): acelera e faz parallax dos fragmentos.
        const card = el.closest<HTMLElement>('[data-dr-card]') ?? el
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        const movers = layers.map((l) => {
          const d = Number(l.dataset.depth) || 1
          return {
            d,
            x: gsap.quickTo(l, 'x', { duration: 0.5, ease: 'power3.out' }),
            y: gsap.quickTo(l, 'y', { duration: 0.5, ease: 'power3.out' }),
          }
        })
        const enter = () => gsap.to(tl, { timeScale: 1.3, duration: 0.4 })
        const leave = () => {
          gsap.to(tl, { timeScale: 1, duration: 0.4 })
          movers.forEach((m) => (m.x(0), m.y(0)))
        }
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          movers.forEach((m) => (m.x(nx * 2 * 2 * m.d), m.y(ny * 2 * 2 * m.d)))
        }
        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointerleave', leave)
        card.addEventListener('pointermove', move)
        return () => {
          card.removeEventListener('pointerenter', enter)
          card.removeEventListener('pointerleave', leave)
          card.removeEventListener('pointermove', move)
        }
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: deps, revertOnUpdate: true },
  )
}

/** Painel da ilustração: 200px (180px no celular), superfície + brilho vinho num canto + pontos. */
export function ArtPanel({
  children,
  className,
  panelRef,
}: {
  children: ReactNode
  className?: string
  panelRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={panelRef}
      aria-hidden
      className={clsx(
        'relative h-[180px] overflow-hidden rounded-card bg-superficie lg:h-[200px]',
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(70% 80% at 100% 0%, ${VINHO(0.06)} 0%, transparent 70%), radial-gradient(${VINHO(0.07)} 1.2px, transparent 1.2px)`,
        backgroundSize: 'auto, 14px 14px',
      }}
    >
      {children}
    </div>
  )
}

/** Palco de tamanho fixo centralizado no painel (as coordenadas das ilustrações são em px). */
function Stage({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: w, height: h }}
    >
      {children}
    </div>
  )
}

/* ----------------------------------------------------------------------------------------------
 * a) Tipos de violência: donut de 5 segmentos + pilha de chips
 * -------------------------------------------------------------------------------------------- */

const SEG_ALPHA = [1, 0.8, 0.6, 0.4, 0.25]
const ACTIVE = 1 // "Psicológica" no estado final

function arc(i: number) {
  const r = 44
  const a0 = ((i * 72 + 4 - 90) * Math.PI) / 180
  const a1 = (((i + 1) * 72 - 4 - 90) * Math.PI) / 180
  const p = (a: number) => `${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`
  return `M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`
}

export function TiposArt() {
  const ref = useRef<HTMLDivElement>(null)
  const chips = direitos.tipos.chips
  useArt(ref, (q) => {
    const segs = q('[data-seg]')
    const labels = q('[data-label]')
    const lit = q('[data-chip-lit]')
    const tl = gsap.timeline()
    // Estado de partida: nada desenhado, nada aceso.
    tl.set(segs, { drawSVG: '0%', opacity: 1, scale: 1, svgOrigin: '60 60' })
      .set(labels, { autoAlpha: 0 })
      .set(lit, { opacity: 0 })
      .to(segs, { drawSVG: '100%', duration: 0.45, ease: 'power2.out', stagger: 0.18 })
    const loop = gsap.timeline({ repeat: -1 })
    chips.forEach((_, k) => {
      const at = k * 2.2
      loop
        .to(segs, { opacity: (i: number) => (i === k ? 1 : 0.35), scale: (i: number) => (i === k ? 1.06 : 1), svgOrigin: '60 60', duration: 0.45, ease: 'power2.out' }, at)
        .to(labels, { autoAlpha: 0, duration: 0.2 }, at)
        .fromTo(labels[k], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, at + 0.15)
        .to(lit, { opacity: (i: number) => (i === k ? 1 : 0), duration: 0.3 }, at)
    })
    loop.to({}, { duration: 0 }, chips.length * 2.2)
    return tl.add(loop)
  })
  return (
    <ArtPanel panelRef={ref}>
      <Stage w={280} h={150}>
        <div data-depth="1" className={clsx(FRAG, 'absolute top-0 left-0 grid size-[150px] place-items-center')}>
          <svg viewBox="0 0 120 120" className="size-[132px]" fill="none">
            {chips.map((c, i) => (
              <path
                key={c}
                data-seg
                d={arc(i)}
                stroke={VINHO(SEG_ALPHA[i])}
                strokeWidth={14}
                strokeLinecap="round"
                opacity={i === ACTIVE ? 1 : 0.35}
              />
            ))}
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            {chips.map((c, i) => (
              <div
                key={c}
                data-label
                className="col-start-1 row-start-1"
                style={{ opacity: i === ACTIVE ? 1 : 0, visibility: i === ACTIVE ? 'visible' : 'hidden' }}
              >
                <p className="font-display text-[13px] leading-none font-semibold text-vinho-profundo">{c}</p>
                <p className="mt-1 text-[9px] text-texto-secundario">{A.formaLegenda}</p>
              </div>
            ))}
          </div>
        </div>
        <ul data-depth="2" className="absolute top-0 right-0 flex w-[112px] flex-col gap-[6px]">
          {chips.map((c, i) => (
            <li
              key={c}
              className={clsx(FRAG, 'relative grid h-6 place-items-center overflow-hidden rounded-full text-[11px] font-semibold')}
            >
              <span className="col-start-1 row-start-1 font-display text-vinho-profundo">{c}</span>
              <span
                data-chip-lit
                className="col-start-1 row-start-1 grid size-full place-items-center bg-vinho font-display text-white"
                style={{ opacity: i === ACTIVE ? 1 : 0, gridArea: '1 / 1' }}
              >
                {c}
              </span>
            </li>
          ))}
        </ul>
      </Stage>
    </ArtPanel>
  )
}

/* ----------------------------------------------------------------------------------------------
 * b) Medida sem boletim: rastreador de 3 etapas + "Boletim · Não exigido"
 * -------------------------------------------------------------------------------------------- */

export function SemBoletimArt() {
  const ref = useRef<HTMLDivElement>(null)
  useArt(ref, (q) => {
    const fill = q('[data-fill]')
    const checks = q('[data-check]')
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 })
    tl.set(fill, { scaleX: 0 })
      .set(checks, { scale: 0 })
      .to(checks[0], { scale: 1, duration: 0.45, ease: 'back.out(1.7)' }, 0.3)
      .to(fill, { scaleX: 0.5, duration: 0.8, ease: 'power2.inOut' }, 0.7)
      .to(checks[1], { scale: 1, duration: 0.45, ease: 'back.out(1.7)' }, 1.5)
      .to(fill, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 1.9)
      .fromTo(checks[2], { scale: 0 }, { scale: 1, duration: 0.55, ease: 'back.out(2.6)' }, 2.7)
      .to({}, { duration: 1.6 })
      .to([fill, ...checks], { opacity: 0, duration: 0.35 }, 4.6)
      .set([fill, ...checks], { opacity: 1 })
    return tl
  })
  const x = [18, 113, 208]
  return (
    <ArtPanel panelRef={ref}>
      <Stage w={270} h={150}>
        {/* Documento de trás, deslocado */}
        <div data-depth="0.6" className={clsx(FRAG, 'absolute top-3 left-6 h-[128px] w-[240px] rotate-[4deg] opacity-70')} />
        <div data-depth="1.4" className={clsx(FRAG, 'absolute top-0 left-0 h-[150px] w-[250px] p-3.5')}>
          <p className="font-display text-[12px] font-semibold text-vinho-profundo">{A.pedidoTitulo}</p>
          <div className="relative mt-4 h-12">
            <span className="absolute top-[9px] left-[27px] h-0.5 w-[190px] rounded-full bg-borda" />
            <span data-fill className="absolute top-[9px] left-[27px] h-0.5 w-[190px] origin-left rounded-full bg-vinho" />
            {A.etapas.map((e, i) => (
              <div key={e} className="absolute top-0 flex w-[56px] -translate-x-[19px] flex-col items-center" style={{ left: x[i] }}>
                <span className="relative grid size-5 place-items-center rounded-full border-[1.5px] border-borda bg-white">
                  <span
                    data-check
                    className={clsx('absolute -inset-[1.5px] grid place-items-center rounded-full text-white', i === 2 ? 'bg-confirma' : 'bg-vinho')}
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                </span>
                <span className="mt-1.5 text-center text-[9px] leading-tight text-texto-secundario">{e}</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-[10px] bg-superficie px-2.5 py-2">
            <span className="text-[10px] leading-tight text-texto">
              <span className="font-semibold">{A.boletim}</span> · {A.naoExigido}
            </span>
            <span className="relative h-4 w-7 shrink-0 rounded-full bg-borda">
              <span className="absolute top-0.5 left-0.5 size-3 rounded-full bg-white shadow-sm" />
            </span>
          </div>
        </div>
      </Stage>
    </ArtPanel>
  )
}

/* ----------------------------------------------------------------------------------------------
 * c) Sinais de alerta: varredura, flags e barra de atenção
 * -------------------------------------------------------------------------------------------- */

export function SinaisArt() {
  const ref = useRef<HTMLDivElement>(null)
  const itens = direitos.sinais.itens
  useArt(ref, (q) => {
    const scan = q('[data-scan]')
    const flags = q('[data-flag]')
    const segs = q('[data-level]')
    const tl = gsap.timeline({ repeat: -1 })
    tl.set(flags, { scale: 0 })
      .set(segs, { opacity: 0 })
      .set(scan, { y: -18, opacity: 0 })
      .to(scan, { opacity: 1, duration: 0.2 }, 0.2)
      .to(scan, { y: 96, duration: 2.1, ease: 'none' }, 0.2)
    itens.forEach((_, k) => {
      const at = 0.55 + k * 0.62
      tl.to(flags[k], { scale: 1, duration: 0.35, ease: 'back.out(2)' }, at).to(segs[k], { opacity: 1, duration: 0.3 }, at)
    })
    tl.to(scan, { opacity: 0, duration: 0.2 }, 2.3)
      .to({}, { duration: 1.5 })
      .to([...flags, ...segs], { opacity: 0, duration: 0.35 })
      .set(flags, { opacity: 1, scale: 0 })
      .set(segs, { opacity: 0 })
    return tl
  })
  return (
    <ArtPanel panelRef={ref}>
      <Stage w={250} h={156}>
        <div data-depth="1.2" className={clsx(FRAG, 'absolute inset-0 overflow-hidden p-3')}>
          <p className="font-display text-[12px] font-semibold text-vinho-profundo">{A.sinaisTitulo}</p>
          <div className="relative mt-2 space-y-1.5">
            <span
              data-scan
              className="pointer-events-none absolute inset-x-0 top-0 h-5 opacity-0"
              style={{ background: `linear-gradient(180deg, transparent, ${VINHO(0.16)}, transparent)` }}
            />
            {itens.map((s) => (
              <div key={s} className="flex h-[22px] items-center justify-between rounded-[8px] bg-superficie px-2">
                <span className="text-[10.5px] text-texto">{s}</span>
                <span data-flag className="grid size-4 place-items-center rounded-full bg-vinho text-white">
                  <Flag className="size-2.5" strokeWidth={ICON_STROKE + 0.5} />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="font-display text-[10px] font-semibold text-texto-secundario">{A.atencao}</span>
            <span className="grid flex-1 grid-cols-5 gap-1">
              {[0, 1, 2, 3, 4].map((k) => (
                <span key={k} className="relative h-1.5 overflow-hidden rounded-full bg-borda">
                  {k < 3 && <span data-level className="absolute inset-0 bg-vinho" />}
                </span>
              ))}
            </span>
          </div>
        </div>
      </Stage>
    </ArtPanel>
  )
}

/* ----------------------------------------------------------------------------------------------
 * d) Monitoramento: mapa, "Você" com perímetro, agressor percorrendo a rota, toast de alerta
 * -------------------------------------------------------------------------------------------- */

const ROUTE = 'M262 22 C 228 36, 214 70, 186 84 S 150 102, 136 104'

export function MonitoramentoArt() {
  const ref = useRef<HTMLDivElement>(null)
  useArt(ref, (q) => {
    const dot = q('[data-agressor]')[0]
    const route = q('[data-route]')[0] as SVGPathElement
    const ring = q('[data-perimetro]')
    const wave = q('[data-wave]')
    const toast = q('[data-toast]')
    const mp = (start: number, end: number) => ({
      motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] as [number, number], start, end },
    })
    const tl = gsap.timeline({ repeat: -1 })
    tl.set(toast, { autoAlpha: 0, y: -16 })
      .set(wave, { scale: 1, opacity: 0 })
      .fromTo(dot, mp(0, 0), { ...mp(0, 1), duration: 2.4, ease: 'power1.inOut' })
      .to(ring, { scale: 1.08, duration: 0.25, ease: 'power2.out', transformOrigin: '50% 50%' })
      .to(ring, { scale: 1, duration: 0.35, ease: 'power2.in' })
      .fromTo(wave, { scale: 1, opacity: 0.5 }, { scale: 1.6, opacity: 0, duration: 0.9, ease: 'sine.out' }, '<-0.35')
      .to(toast, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'back.out(1.7)' }, '<')
      .to({}, { duration: 1 })
      .to(toast, { autoAlpha: 0, y: -16, duration: 0.3 })
      .to(dot, { ...mp(1, 0), duration: 1.6, ease: 'power1.inOut' }, '<')
    return tl
  })
  return (
    <ArtPanel panelRef={ref}>
      <Stage w={290} h={150}>
        <div data-depth="0.8" className={clsx(FRAG, 'absolute inset-0 overflow-hidden')}>
          <svg viewBox="0 0 290 150" className="absolute inset-0 size-full" fill="none">
            {/* grade fina */}
            {Array.from({ length: 13 }, (_, i) => (
              <path key={`v${i}`} d={`M${i * 24} 0 V150`} stroke={VINHO(0.06)} strokeWidth={1} />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <path key={`h${i}`} d={`M0 ${i * 24} H290`} stroke={VINHO(0.06)} strokeWidth={1} />
            ))}
            {/* quarteirões */}
            <rect x="14" y="12" width="92" height="50" rx="6" fill="#F3EDEF" />
            <rect x="14" y="88" width="92" height="52" rx="6" fill="#F3EDEF" />
            <rect x="198" y="96" width="80" height="44" rx="6" fill="#F3EDEF" />
            <rect x="200" y="12" width="40" height="44" rx="6" fill="#F3EDEF" />
            {/* ruas */}
            <path d="M0 76 H290" stroke="#fff" strokeWidth={10} />
            <path d="M120 0 C 140 60, 170 100, 186 150" stroke="#fff" strokeWidth={10} />
            {/* rota do agressor */}
            <path data-route d={ROUTE} stroke={VINHO(0.25)} strokeWidth={1.5} strokeDasharray="3 4" />
            {/* "Você" com o perímetro */}
            <circle data-wave cx="96" cy="104" r="34" stroke={VINHO(0.5)} strokeWidth={1.5} opacity={0} />
            <circle data-perimetro cx="96" cy="104" r="34" fill={VINHO(0.06)} stroke={VINHO(0.45)} strokeWidth={1.5} strokeDasharray="4 4" />
            <circle cx="96" cy="104" r="7" fill="#954B6E" stroke="#fff" strokeWidth={2.5} />
            {/* agressor (estado final: no fim da rota, perto do perímetro) */}
            <circle data-agressor cx="136" cy="104" r="5" fill="#4B2A3F" stroke="#fff" strokeWidth={2} />
          </svg>
          <span className="absolute top-[118px] left-[78px] font-display text-[10px] font-semibold text-vinho-profundo">
            {A.voce}
          </span>
        </div>
        <div data-depth="2" className="absolute -top-1 right-2">
          <div data-toast className={clsx(FRAG, 'flex items-center gap-2 px-2.5 py-2')}>
            <span className="grid size-5 place-items-center rounded-full bg-vinho text-white">
              <MapPin className="size-3" strokeWidth={ICON_STROKE + 0.5} />
            </span>
            <span className="text-[10px] leading-tight text-texto">
              <span className="font-display font-semibold">{A.alerta}</span> · {A.agora}
            </span>
          </div>
        </div>
      </Stage>
    </ArtPanel>
  )
}

/* ----------------------------------------------------------------------------------------------
 * e) Pedido sem advogado: fluxo Delegacia → Pedido → Proteção com token, + chips de recibo
 * -------------------------------------------------------------------------------------------- */

const FLOW_ICONS: LucideIcon[] = [Building2, FileText, ShieldCheck]
const FLOW = {
  h: {
    w: 470,
    h: 170,
    cards: [
      { x: 0, y: 92 },
      { x: 165, y: 92 },
      { x: 330, y: 92 },
    ],
    cw: 140,
    path: 'M70 118 C 110 64, 195 64, 235 118 C 275 172, 360 172, 400 118',
    chips: [
      { x: 30, y: 8 },
      { x: 235, y: 8 },
    ],
  },
  v: {
    w: 290,
    h: 156,
    cards: [
      { x: 0, y: 0 },
      { x: 0, y: 56 },
      { x: 0, y: 112 },
    ],
    cw: 140,
    path: 'M70 22 C 112 40, 112 60, 70 78 C 28 96, 28 116, 70 134',
    chips: [
      { x: 158, y: 30 },
      { x: 158, y: 88 },
    ],
  },
}

function useIsWide() {
  const q = '(min-width: 768px)'
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

const brl = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`

export function PedidoArt() {
  const ref = useRef<HTMLDivElement>(null)
  const wide = useIsWide()
  const L = wide ? FLOW.h : FLOW.v
  const passos = direitos.pedido.passos
  useArt(
    ref,
    (q) => {
      const path = q('[data-flow]')[0] as SVGPathElement
      const token = q('[data-token]')[0]
      const lit = q('[data-lit]')
      const boxes = q('[data-box]')
      const chips = q('[data-receipt]')
      const valor = q('[data-valor]')[0]
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 })
      const n = { v: 250 }
      tl.set(path, { drawSVG: '0%' })
        .set(lit, { opacity: 0 })
        .set(boxes, { y: 0 })
        .set(chips, { autoAlpha: 0, y: 8 })
        .set(token, { autoAlpha: 0 })
        .to(path, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut' })
        .set(token, { autoAlpha: 1 })
        .fromTo(
          token,
          { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 0 } },
          { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 2.6, ease: 'none' },
        )
      // Cada mini-cartão acende (borda + ícone vinho) e sobe 4px quando o token chega a ele
      // (início, meio e fim do caminho).
      ;[0, 1.3, 2.6].forEach((t, k) => {
        tl.to(boxes[k].querySelectorAll('[data-lit]'), { opacity: 1, duration: 0.3 }, 0.9 + t).to(
          boxes[k],
          { y: -4, duration: 0.3, ease: 'power2.out' },
          0.9 + t,
        )
      })
      tl.to(chips, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out' }, 1.4)
        .fromTo(
          n,
          { v: 250 },
          { v: 0, duration: 0.8, ease: 'power2.out', onUpdate: () => (valor.textContent = brl(n.v)) },
          1.6,
        )
        .to(token, { autoAlpha: 0, duration: 0.3 }, '>+0.4')
        .to({}, { duration: 1.2 })
        .to([...lit, path, ...chips], { opacity: 0, duration: 0.35 })
        .to(boxes, { y: 0, duration: 0.35 }, '<')
        .set(chips, { autoAlpha: 0, opacity: 1 })
        .set(path, { opacity: 1 })
      return tl
    },
    [wide],
  )
  return (
    <ArtPanel panelRef={ref}>
      <Stage w={L.w} h={L.h}>
        <svg viewBox={`0 0 ${L.w} ${L.h}`} className="absolute inset-0 size-full" fill="none">
          <path data-flow d={L.path} stroke={VINHO(0.45)} strokeWidth={1.5} strokeLinecap="round" />
          <circle data-token r="6" fill="#954B6E" style={{ filter: 'drop-shadow(0 0 6px rgb(149 75 110 / 0.7))', opacity: 0 }} />
        </svg>
        {passos.map((p, i) => {
          const Icon = FLOW_ICONS[i]
          return (
            <div
              key={p}
              data-depth={1 + i * 0.4}
              className="absolute"
              style={{ left: L.cards[i].x, top: L.cards[i].y, width: L.cw }}
            >
              <div data-box className={clsx(FRAG, 'relative flex h-11 items-center gap-2.5 px-2.5')}>
                <span data-lit className="absolute inset-0 rounded-[12px] border-[1.5px] border-vinho" />
                <span className="relative grid size-7 place-items-center overflow-hidden rounded-[8px] bg-superficie text-vinho">
                  <Icon className="size-4" strokeWidth={ICON_STROKE} />
                  <span data-lit className="absolute inset-0 grid place-items-center bg-vinho text-white">
                    <Icon className="size-4" strokeWidth={ICON_STROKE} />
                  </span>
                </span>
                <span className="font-display text-[12px] font-semibold text-vinho-profundo">{p}</span>
              </div>
            </div>
          )
        })}
        {[
          { k: A.custo, v: brl(0), valor: true },
          { k: A.advogado, v: A.naoPrecisa, valor: false },
        ].map((c, i) => (
          <div key={c.k} data-depth="2.2" className="absolute" style={{ left: L.chips[i].x, top: L.chips[i].y }}>
            <div data-receipt className={clsx(FRAG, 'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] whitespace-nowrap')}>
              <span className="text-texto-secundario">{c.k} ·</span>
              <span {...(c.valor ? { 'data-valor': '' } : {})} className="font-display font-semibold text-confirma tabular-nums">
                {c.v}
              </span>
            </div>
          </div>
        ))}
      </Stage>
    </ArtPanel>
  )
}
