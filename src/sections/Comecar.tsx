import { Check, Plus, Smartphone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../components/ui/Button'
import { LeadText } from '../components/ui/RichText'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { app, comecar, cta } from '../content/copy'
import { APP_URL } from '../lib/config'

const c = app.cadastro

/** Mini fragmentos codados das telas de cadastro do app (DESIGN.md §9 Como começar). */
const MINI: ReactNode[] = [
  <div key="1" className="w-full max-w-[220px]">
    <p className="text-[0.8125rem] font-bold text-vinho">{c.emailLabel}</p>
    <p className="mt-2 rounded-full border border-borda bg-white px-4 py-2.5 text-[0.8125rem] text-texto-secundario">
      {c.emailPlaceholder}
    </p>
  </div>,
  <div key="2" className="w-full max-w-[220px]">
    <p className="flex items-center gap-2.5 rounded-card border border-vinho bg-white px-3.5 py-2.5 text-[0.8125rem] font-semibold">
      <span className="grid size-4 place-items-center rounded-full border-2 border-vinho">
        <span className="size-1.5 rounded-full bg-vinho" />
      </span>
      {c.disfarce}
    </p>
    <p className="mt-3 flex items-center justify-between px-1 text-[0.8125rem] text-texto-secundario">
      {c.codigo}
      <span className="flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-vinho" />
        ))}
      </span>
    </p>
  </div>,
  <div key="3" className="w-full max-w-[220px]">
    <p className="text-[0.75rem] font-semibold text-vinho">{c.guardiaPrincipal}</p>
    <p className="mt-2 flex items-center justify-center gap-2 rounded-full border-[1.5px] border-dashed border-vinho/40 bg-white py-2.5 text-[0.8125rem] font-bold text-vinho">
      <Plus className="size-4" strokeWidth={2.5} aria-hidden /> {c.adicionarGuardia}
    </p>
  </div>,
  <div key="4" className="flex flex-col items-center">
    <span className="grid size-12 place-items-center rounded-full bg-confirma/12 text-confirma">
      <Check className="size-6" strokeWidth={2.75} aria-hidden />
    </span>
    <p className="mt-3 text-[0.9375rem] font-bold">{c.pronto}</p>
  </div>,
]

/** `#comecar` — 4 cartões de passo com mini-UI e linha de progresso (ref. Finexa). */
export function Comecar() {
  return (
    <section id="comecar" aria-labelledby="comecar-title" className={SECTION_Y}>
      <Container>
        <SectionHeading id="comecar-title">{comecar.h2}</SectionHeading>

        <div data-steps className="relative mt-12 md:mt-16">
          {/* Linha de progresso: vertical no mobile, horizontal no desktop (§7.6) */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[11px] w-px bg-borda lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          >
            <div data-progress-fill className="size-full origin-top bg-vinho lg:origin-left" />
          </div>

          <ol className="grid gap-6 lg:grid-cols-4 lg:gap-4">
            {comecar.steps.map((s, i) => (
              <li key={s.strong} className="relative pl-10 lg:pt-10 lg:pl-0">
                <span
                  aria-hidden
                  className="absolute top-0 left-0 grid size-[23px] place-items-center rounded-full border border-borda bg-white lg:top-0"
                >
                  <span className="size-2 rounded-full bg-vinho" />
                </span>
                <div className="rounded-card-lg border border-borda bg-white p-4">
                  <div
                    aria-hidden
                    className="grid h-[150px] place-items-center rounded-card bg-superficie p-4"
                  >
                    {MINI[i]}
                  </div>
                  <div className="px-2 pt-5 pb-3">
                    <p className="caption text-vinho">{c.etapas[i]}</p>
                    <p className="mt-2 text-texto-secundario">
                      <LeadText
                        item={s}
                        strongClassName="block font-display text-[1.25rem] leading-tight font-semibold tracking-[-0.01em] text-texto mb-1.5"
                      />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />}>
            {cta.acessar}
          </Button>
        </div>
      </Container>
    </section>
  )
}
