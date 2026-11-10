import { PeopleScatter } from '../components/ui/PeopleScatter'
import { contexto } from '../content/copy'

/**
 * Fotos espalhadas com a frase de fecho do COPY 3.2c (§6.26, padrão Gaia), como seção própria logo
 * depois de `#contexto`. Pedidos do cliente (10/11/2026): fundo próprio em tela cheia, com divisória
 * clara, e **parado** — só as fotos e o texto se movem (a abertura do fundo por `clip-path` foi
 * retirada por travar a rolagem).
 */
export function Pessoas() {
  return (
    <section id="pessoas" aria-labelledby="pessoas-title" className="bg-branco pt-3 md:pt-4">
      <div className="relative overflow-clip" style={{ background: 'var(--grad-rosa)' }}>
        <PeopleScatter phrase={contexto.fecho} centerSlot="contexto" headingId="pessoas-title" />
        {/* A base do Manifesto se dissolve no branco dos Benefícios (~160px), por cima do palco,
            para não sobrar a borda da nuvem rosada */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40"
          style={{
            background:
              'linear-gradient(180deg, rgb(255 255 255 / 0) 0%, rgb(255 255 255 / 0.55) 45%, rgb(255 255 255 / 0.9) 75%, #ffffff 100%)',
          }}
        />
      </div>
    </section>
  )
}
