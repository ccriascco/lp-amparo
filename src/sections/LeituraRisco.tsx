import { Chip } from '../components/ui/Chip'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { leituraRisco } from '../content/copy'

/**
 * `#leitura-risco` (COPY 3.7) — ESQUELETO PROVISÓRIO: só o cabeçalho, para a âncora já existir
 * (header, rodapé, Dores e Benefícios apontam para cá). A seção completa entra na etapa 7.
 */
export function LeituraRisco() {
  return (
    <section id="leitura-risco" aria-labelledby="leitura-risco-title" className={SECTION_Y}>
      <Container className="flex flex-col items-center text-center">
        <Chip>{leituraRisco.chip}</Chip>
        <SectionHeading id="leitura-risco-title" className="mt-5 max-w-[18ch]">
          {leituraRisco.h2}
        </SectionHeading>
        <p data-appear className="mt-6 max-w-[56ch] lead text-pretty text-texto-secundario">
          {leituraRisco.sub}
        </p>
      </Container>
    </section>
  )
}
