import { ArrowUpRight } from 'lucide-react'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { TintedPhoto, type ImageSlot } from '../components/ui/TintedPhoto'
import { direitos, ui } from '../content/copy'
import { APP_URL } from '../lib/config'

/**
 * `#direitos` — 4 `PhotoCard` com topo em pílula (DESIGN.md §6.21, §9 Direitos):
 * grid de 4 colunas no desktop, 2 no tablet e rolagem com snap no mobile.
 */
export function Direitos() {
  return (
    <section id="direitos" aria-labelledby="direitos-title" className={SECTION_Y}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading id="direitos-title" className="max-w-[18ch]">
              {direitos.h2}
            </SectionHeading>
          </div>
          <p className="max-w-[52ch] text-texto-secundario lg:col-span-5">{direitos.text}</p>
        </div>

        <ul className="-mx-5 mt-12 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {direitos.cards.map((c) => (
            <li
              key={c.title}
              className="w-[72vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none"
            >
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener"
                className="group arch relative block aspect-[3/5] overflow-hidden"
                data-reveal-photo
              >
                <TintedPhoto
                  slot={c.image as ImageSlot}
                  parallax
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 72vw"
                  className="arch absolute inset-0 transition-transform duration-500 ease-amparo group-hover:scale-[1.02]"
                />
                <span className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-6">
                  <span
                    aria-hidden
                    className="mb-auto grid size-11 place-items-center self-end rounded-full text-white glass"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                  <span className="mt-4 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em] text-white">
                    {c.title}
                  </span>
                  <span className="mt-2 text-small text-white/85">{c.text}</span>
                  <span className="sr-only"> — {ui.lerNoApp}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <p className="font-bold text-texto">{direitos.violenciasLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {direitos.violencias.map((v) => (
              <li
                key={v}
                className="rounded-full border border-borda px-3.5 py-1.5 caption text-vinho-profundo"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
