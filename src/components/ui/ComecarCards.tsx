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

/**
 * 1) Crie sua conta: mockup "clean" da tela de boas-vindas (pedido do cliente, como a referência):
 * sem cartão por trás, moldura fina e translúcida, foto ocupando a tela, título e texto em branco e o
 * seletor "Criar conta / Entrar" em vidro. A pílula branca desliza; os rótulos escuros vão dentro
 * dela (recortados), então a cor de cada rótulo acompanha a pílula.
 */
function WelcomeCard({ className }: { className?: string }) {
  const b = C.boasVindas
  const labels = (dark: boolean) =>
    b.opcoes.map((o) => (
      <span
        key={o}
        className={clsx('grid w-1/2 place-items-center text-[17px] font-bold', dark ? 'text-vinho-profundo' : 'text-white')}
      >
        {o}
      </span>
    ))
  return (
    <div
      className={clsx(
        'w-[180px] [&_.shadow-phone]:bg-[rgb(30_20_26/0.55)] [&_.shadow-phone]:p-[1.8cqw] [&_.shadow-phone]:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] [&_.shadow-phone]:ring-1 [&_.shadow-phone]:ring-white/25 [&_.shadow-phone]:backdrop-blur-md [&_.shadow-phone>div:first-child]:rounded-[14.4cqw]',
        className,
      )}
    >
      <PhoneFrame label={`${b.title}. ${b.text}`}>
        <div className="relative h-full w-full bg-vinho-profundo">
          <Picture
            slot="boas-vindas-foto"
            sizes="180px"
            className="absolute inset-0 size-full object-cover object-[50%_20%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgb(75 42 63 / 0) 35%, rgb(75 42 63 / 0.55) 62%, rgb(43 24 36 / 0.92) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-center">
            <p className="font-display text-[36px] leading-[1.1] font-semibold text-white">{b.title}</p>
            <p className="mx-auto mt-3 max-w-[300px] text-[17px] leading-snug text-white/80">{b.text}</p>
            {/* Seletor em vidro: base com rótulos brancos + pílula branca com rótulos escuros */}
            <div className="relative mt-8 h-[60px] rounded-full border border-white/30 bg-white/15 p-1.5 backdrop-blur-md">
              <div className="flex h-full">{labels(false)}</div>
              <span
                data-cm-pill
                className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] overflow-hidden rounded-full bg-white shadow-card"
              >
                <span data-cm-pill-inner className="absolute inset-y-0 left-0 flex w-[calc(200%+0px)]">
                  {labels(true)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </PhoneFrame>
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
    const inner = q('[data-cm-pill-inner]')
    tl.set(pill, { xPercent: 0 })
      .set(inner, { xPercent: 0 })
      .to(pill, { xPercent: 100, ...swap }, 1.1)
      .to(inner, { xPercent: -50, ...swap }, 1.1)
      .to(pill, { xPercent: 0, ...swap }, 2.7)
      .to(inner, { xPercent: 0, ...swap }, 2.7)
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
