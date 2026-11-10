import { Container } from '../components/ui/Section'
import { StatsBand } from '../components/ui/StatsBand'
import { numeros } from '../content/copy'

/** `#numeros` — faixa de números logo após o hero (COPY 3.2a, DESIGN §6.24 e §9). */
export function Numeros() {
  return (
    <section
      id="numeros"
      aria-labelledby="numeros-title"
      data-counters
      className="bg-branco pt-16 pb-12 md:pt-20 md:pb-14"
    >
      <Container>
        <StatsBand
          id="numeros-title"
          title={numeros.title}
          stats={numeros.stats}
          source={numeros.source}
        />
      </Container>
    </section>
  )
}
