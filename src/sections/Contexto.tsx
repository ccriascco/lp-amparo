import { PeopleScatter } from '../components/ui/PeopleScatter'
import { Container, SectionHeading } from '../components/ui/Section'
import { contexto } from '../content/copy'

/**
 * `#contexto` — manifesto (COPY 3.2c, DESIGN §9 e §6.26, padrão Gaia "é sobre pessoas"):
 * H2 + texto centralizados e, em seguida, a frase de fecho com as fotos em volta.
 */
export function Contexto() {
  return (
    <section
      id="contexto"
      aria-labelledby="contexto-title"
      style={{ background: 'var(--grad-secao)' }}
    >
      <Container className="pt-20 pb-4 text-center md:pt-28 lg:pb-0">
        <div className="mx-auto max-w-[760px]">
          <SectionHeading id="contexto-title">{contexto.h2}</SectionHeading>
          <p data-appear className="mx-auto mt-6 max-w-[52ch] lead text-texto-secundario">
            {contexto.text}
          </p>
        </div>
      </Container>
      <PeopleScatter phrase={contexto.fecho} centerSlot="contexto" />
    </section>
  )
}
