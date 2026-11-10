import { PeopleScatter } from '../components/ui/PeopleScatter'
import { contexto } from '../content/copy'

/**
 * Fotos espalhadas com a frase de fecho do COPY 3.2c (§6.26, padrão Gaia), como seção própria logo
 * depois de `#contexto` (ajustes 3 do cliente, 10/11/2026). A nuvem rosada do palco esmaece no topo
 * para o branco, separando-a do shell rosado de `#contexto`.
 */
export function Pessoas() {
  return (
    <section id="pessoas" aria-labelledby="pessoas-title" className="bg-branco">
      <PeopleScatter phrase={contexto.fecho} centerSlot="contexto" headingId="pessoas-title" />
    </section>
  )
}
