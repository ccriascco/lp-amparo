import { StatCard } from '../components/ui/StatCard'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { contexto } from '../content/copy'

/** `#contexto` — bento de números ao estilo Finexa (DESIGN.md §9). */
export function Contexto() {
  const [s1, s2, s3, s4] = contexto.stats
  return (
    <section id="contexto" aria-labelledby="contexto-title" data-counters className={SECTION_Y}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading id="contexto-title" className="max-w-[16ch]">
              {contexto.h2}
            </SectionHeading>
          </div>
          <p className="max-w-[52ch] lead text-texto-secundario lg:col-span-5">{contexto.text}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-4 lg:grid-cols-4">
          <StatCard stat={s1} variant="foto" photo="contexto" />
          <StatCard stat={s2} />
          <StatCard stat={s3} />
          <StatCard stat={s4} variant="destaque" />
        </div>
        <p className="mt-4 text-right text-small text-texto-secundario">{contexto.source}</p>
      </Container>
    </section>
  )
}
