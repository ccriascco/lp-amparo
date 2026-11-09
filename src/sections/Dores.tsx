import clsx from 'clsx'
import { BookOpen, Eye, FileX2, Footprints, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { dores } from '../content/copy'

const ICONS = [Eye, FileX2, Footprints, TrendingUp, BookOpen]

/** `#dores` — lista de `PainCard` (DESIGN.md §6.9): linhas com divisória, sem sombra. */
export function Dores() {
  return (
    <section
      id="dores"
      aria-labelledby="dores-title"
      className={clsx(SECTION_Y, 'pt-0 md:pt-0 lg:pt-0')}
    >
      <Container>
        <div className="max-w-[760px]">
          <SectionHeading id="dores-title">{dores.h2}</SectionHeading>
          <p className="mt-6 lead text-texto-secundario">{dores.intro}</p>
        </div>

        <ul className="mt-12 grid md:grid-cols-2 md:gap-x-12">
          {dores.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <li
                key={item.title}
                className={clsx(
                  'flex gap-5 border-t border-borda py-8',
                  i === 0 && 'md:col-span-2',
                )}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-superficie text-vinho">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-texto-secundario">{item.text}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 border-t border-borda pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[40ch] lead font-semibold text-texto">{dores.fecho}</p>
          <Button variant="ghost" href={dores.fechoButton.href}>
            {dores.fechoButton.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
