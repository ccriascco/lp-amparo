import clsx from 'clsx'
import { Calculator, Check } from 'lucide-react'
import { comecar, cta } from '../../content/copy'
import { APP_URL } from '../../lib/config'
import { gsap } from '../../lib/gsap'
import { PhoneFrame } from './PhoneFrame'
import { Picture } from './TintedPhoto'

const C = comecar.cards

/**
 * Cartões interativos dos 4 passos de `#comecar` (seção 8). O markup é sempre o ESTADO FINAL de
 * cada animação (seletor em "Criar conta", código completo com a chave ligada, guardiãs que
 * aceitaram, checklist completo): é o que aparece com movimento reduzido. `cardLoop` cria a
 * animação em laço de cada um, pausada; quem chama decide quando tocar.
 */
export function StepCard({ i, phoneClassName }: { i: number; phoneClassName?: string }) {
  if (i === 0) return <WelcomeCard className={phoneClassName} />
  if (i === 1) return <DisfarceCard />
  if (i === 2) return <RedeCard />
  return <ProntoCard />
}

const CARD = 'w-[340px] max-w-full rounded-card-lg bg-white p-6 text-left shadow-float'

/** 1) Crie sua conta: tela de boas-vindas do app (boas-vindas.png) num celular. */
function WelcomeCard({ className }: { className?: string }) {
  const b = C.boasVindas
  // Mesmo formato dos outros cartões do palco (340px, branco; pedido do cliente: em 1920 o celular
  // ficava grande demais): o celular fica dentro do cartão, cortado em cima, mostrando da foto até o
  // seletor "Criar conta / Entrar".
  return (
    <div className={clsx(CARD, 'relative h-[300px] overflow-hidden p-0', className)}>
    {/* Invólucro absoluto: o PhoneFrame tem `relative` próprio. Mostra a metade de baixo da tela
        (título, texto e o seletor), com a base da moldura cortada pelo cartão. */}
    <div className="absolute -bottom-5 left-1/2 w-[240px] -translate-x-1/2">
    <PhoneFrame label={`${b.title}. ${b.text}`}>
      <div className="relative h-full w-full bg-white">
        <Picture
          slot="boas-vindas-foto"
          sizes="280px"
          className="absolute inset-x-0 top-0 h-[600px] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-[300px] rounded-t-[36px] bg-white px-7 pt-6">
          <div className="flex justify-center gap-2">
            <span className="h-2 w-8 rounded-full bg-vinho" />
            {[0, 1, 2].map((k) => (
              <span key={k} className="size-2 rounded-full bg-borda" />
            ))}
          </div>
          <p className="mt-5 font-display text-[30px] leading-tight font-semibold text-texto">
            {b.title}
          </p>
          <p className="mt-2 text-[17px] leading-snug text-texto-secundario">{b.text}</p>
          {/* Seletor "Criar conta / Entrar": a pílula branca desliza entre as opções */}
          <div className="relative mt-6 grid h-14 grid-cols-2 rounded-full bg-superficie p-1.5">
            <span
              data-cm-pill
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-white shadow-card"
            />
            {b.opcoes.map((o) => (
              <span
                key={o}
                className="relative grid place-items-center text-[17px] font-bold text-vinho-profundo"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
    </div>
    </div>
  )
}

/** 2) Modo Disfarce: 4 bolinhas do código e a chave do ícone de calculadora. */
function DisfarceCard() {
  const d = C.disfarce
  return (
    <div className={CARD}>
      <p className="font-display text-xl leading-tight font-semibold text-texto">{d.title}</p>
      <p className="mt-1 text-[0.9375rem] text-texto-secundario">{d.sub}</p>
      <div aria-hidden className="mt-6 flex justify-center gap-5">
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="relative size-5 rounded-full border-2 border-vinho/30">
            <span data-cm-dot className="absolute -inset-0.5 rounded-full bg-vinho" />
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-card bg-superficie p-3">
        <span className="grid size-9 place-items-center rounded-sm bg-white text-vinho">
          <Calculator aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <span className="flex-1 text-[0.9375rem] font-bold text-texto">{d.icone}</span>
        <span aria-hidden className="relative h-7 w-12 shrink-0 rounded-full bg-borda">
          <span data-cm-switch className="absolute inset-0 rounded-full bg-vinho" />
          <span
            data-cm-knob
            className="absolute top-1 left-1 size-5 rounded-full bg-white shadow-card"
            style={{ transform: 'translateX(20px)' }}
          />
        </span>
      </div>
    </div>
  )
}

/** 3) Rede de apoio: guardiãs entrando de baixo e aceitando o convite. */
function RedeCard() {
  const r = C.rede
  return (
    <div className={CARD}>
      <p className="font-display text-xl leading-tight font-semibold text-texto">{r.title}</p>
      <div className="mt-4 h-[212px] overflow-hidden">
        <ul data-cm-list className="space-y-2">
          {r.guardias.map((g) => (
            <li
              key={g.name}
              data-cm-row
              className="flex items-center gap-3 rounded-card border border-borda bg-white p-3"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-superficie text-sm font-bold text-vinho">
                {g.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-texto">{g.name}</span>
                <span className="grid text-sm">
                  <span data-cm-sent className="col-start-1 row-start-1 text-texto-secundario opacity-0">
                    {r.enviado}
                  </span>
                  <span
                    data-cm-ok
                    className="col-start-1 row-start-1 inline-flex items-center gap-1 font-bold text-confirma"
                  >
                    {r.aceitou}
                    <Check aria-hidden className="size-3.5" strokeWidth={3} />
                  </span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** 4) Pronto: checklist, barra completa e o botão real de acesso. */
function ProntoCard() {
  const p = C.pronto
  return (
    <div className={CARD}>
      <p className="font-display text-xl leading-tight font-semibold text-texto">{p.title}</p>
      <ul className="mt-4 space-y-3">
        {p.itens.map((t) => (
          <li key={t} className="flex items-center gap-3">
            <span aria-hidden className="relative size-6 shrink-0 rounded-full border-2 border-borda">
              <span
                data-cm-check
                className="absolute -inset-0.5 grid place-items-center rounded-full bg-confirma text-white"
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
            </span>
            <span className="font-bold text-texto">{t}</span>
          </li>
        ))}
      </ul>
      <div aria-hidden className="mt-5 h-1.5 overflow-hidden rounded-full bg-superficie">
        <span data-cm-bar className="block h-full origin-left rounded-full bg-vinho" />
      </div>
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener"
        className="relative mt-5 flex h-12 items-center justify-center overflow-hidden rounded-full bg-vinho font-bold text-white transition-[background-color,scale] duration-200 hover:bg-vinho-profundo active:scale-[0.97]"
      >
        <span
          aria-hidden
          data-cm-shine
          className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent"
        />
        <span className="relative">{cta.acessar}</span>
      </a>
    </div>
  )
}

/** Animação em laço de cada cartão (pausada). Começa sempre do estado "vazio" do passo. */
export function cardLoop(i: number, el: HTMLElement): gsap.core.Timeline {
  const q = gsap.utils.selector(el)
  const tl = gsap.timeline({ paused: true, repeat: -1 })
  const swap = { duration: 0.5, ease: 'power3.inOut' }

  if (i === 0) {
    // A pílula desliza entre "Criar conta" e "Entrar" a cada 1,6s.
    const pill = q('[data-cm-pill]')
    tl.set(pill, { xPercent: 0 })
      .to(pill, { xPercent: 100, ...swap }, 1.1)
      .to(pill, { xPercent: 0, ...swap }, 2.7)
      .to({}, { duration: 0 }, 3.2)
  } else if (i === 1) {
    // As 4 bolinhas enchem uma a uma (0,35s), a chave liga, pausa e recomeça.
    const dots = q('[data-cm-dot]')
    const on = q('[data-cm-switch]')
    const knob = q('[data-cm-knob]')
    tl.set(dots, { scale: 0 })
      .set(on, { opacity: 0 })
      .set(knob, { x: 0 })
      .to(dots, { scale: 1, duration: 0.25, ease: 'back.out(2)', stagger: 0.35 }, 0.4)
      .to(on, { opacity: 1, duration: 0.3 }, '+=0.25')
      .to(knob, { x: 20, duration: 0.3, ease: 'power2.out' }, '<')
      .to({}, { duration: 1.6 })
      .to(dots, { scale: 0, duration: 0.3 })
      .to(on, { opacity: 0, duration: 0.3 }, '<')
      .to(knob, { x: 0, duration: 0.3 }, '<')
      .to({}, { duration: 0.3 })
  } else if (i === 2) {
    // Guardiãs entram de baixo, uma a uma; ~1s depois o status vira "Aceitou ✓".
    // No fim a lista sobe e sai, e o laço recomeça.
    const list = q('[data-cm-list]')
    const rows = q('[data-cm-row]')
    const sent = q('[data-cm-sent]')
    const ok = q('[data-cm-ok]')
    tl.set(list, { y: 0, autoAlpha: 1 })
      .set(rows, { y: 48, autoAlpha: 0 })
      .set(sent, { opacity: 1 })
      .set(ok, { opacity: 0 })
    rows.forEach((r, k) => {
      const at = 0.3 + k * 1.1
      tl.to(r, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, at)
        .to(sent[k], { opacity: 0, duration: 0.25 }, at + 1)
        .to(ok[k], { opacity: 1, duration: 0.25 }, at + 1)
    })
    tl.to(list, { y: -48, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '+=1.4')
  } else {
    // Checklist marca item a item, a barra enche e um brilho passa pelo botão.
    const checks = q('[data-cm-check]')
    const bar = q('[data-cm-bar]')
    const shine = q('[data-cm-shine]')
    tl.set(checks, { scale: 0 })
      .set(bar, { scaleX: 0 })
      .set(shine, { xPercent: -100 })
      .to(checks, { scale: 1, duration: 0.35, ease: 'back.out(2.2)', stagger: 0.45 }, 0.3)
      .to(bar, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0.5)
      .to(shine, { xPercent: 400, duration: 1.1, ease: 'power2.inOut' }, '+=0.1')
      .to({}, { duration: 1.6 })
      .to([checks, bar], { opacity: 0, duration: 0.3 })
      .set(checks, { opacity: 1, scale: 0 })
      .set(bar, { opacity: 1, scaleX: 0 })
  }
  return tl
}

/** Classes do celular do passo 1 conforme o lugar (palco ou bloco empilhado). */
export const PHONE_STAGE = ''
export const PHONE_STACK = ''
