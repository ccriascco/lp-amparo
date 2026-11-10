import { House, Ribbon, ShieldOff, UsersRound } from 'lucide-react'
import { Container } from '../components/ui/Section'
import { StatsBand } from '../components/ui/StatsBand'
import { numeros } from '../content/copy'

/** Ícones na ordem dos números: feminicídios, dentro de casa, companheiros, medidas descumpridas. */
const ICONS = [Ribbon, House, UsersRound, ShieldOff]

/**
 * `#numeros` — faixa de números em cartões, logo depois do marquee (COPY 3.2a). A fonte saiu daqui
 * e foi para o rodapé (ajuste do cliente, 10/11/2026).
 */
export function Numeros() {
  return (
    <section
      id="numeros"
      aria-labelledby="numeros-title"
      data-counters
      className="bg-branco pt-14 pb-16 md:pt-20 md:pb-20"
    >
      <Container>
        <StatsBand
          id="numeros-title"
          title={numeros.title}
          stats={numeros.stats}
          icons={ICONS}
          highlight={3}
        />
      </Container>
    </section>
  )
}
