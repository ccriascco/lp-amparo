import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { contexto } from '../content/copy'

/**
 * `#contexto` — provisório: os números foram para `#numeros` (item 2).
 * O manifesto com o `PeopleScatter` (§6.26) entra no item 3.
 */
export function Contexto() {
  return (
    <section id="contexto" aria-labelledby="contexto-title" className={SECTION_Y}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading id="contexto-title" className="max-w-[16ch]">
              {contexto.h2}
            </SectionHeading>
          </div>
          <p className="max-w-[52ch] lead text-texto-secundario lg:col-span-5">{contexto.text}</p>
        </div>
      </Container>
    </section>
  )
}
