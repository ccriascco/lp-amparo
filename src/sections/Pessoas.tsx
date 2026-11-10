import { PeopleScatter } from '../components/ui/PeopleScatter'
import { contexto } from '../content/copy'

/**
 * Fotos espalhadas com a frase de fecho do COPY 3.2c (§6.26, padrão Gaia), como seção própria logo
 * depois de `#contexto`. Pedido do cliente (10/11/2026): fundo próprio com divisória clara (shell
 * rosado recuado, raio 32px) em vez de o fundo esmaecer no branco.
 * `overflow-clip` (e não `overflow-hidden`) para o palco `sticky` continuar funcionando.
 */
export function Pessoas() {
  return (
    <section id="pessoas" aria-labelledby="pessoas-title" className="bg-branco py-3 md:py-4">
      <div
        className="mx-3 overflow-clip rounded-[24px] md:mx-4 md:rounded-shell"
        style={{ background: 'var(--grad-rosa)' }}
      >
        <PeopleScatter phrase={contexto.fecho} centerSlot="contexto" headingId="pessoas-title" />
      </div>
    </section>
  )
}
