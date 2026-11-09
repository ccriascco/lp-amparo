import { RichText } from '../components/ui/RichText'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { StatCard } from '../components/ui/StatCard'
import { projeto } from '../content/copy'

/** `#projeto` — texto, métricas da IA (com ressalva), stack e equipe. */
export function Projeto() {
  const [acuracia, recall] = projeto.metrics
  return (
    <section id="projeto" aria-labelledby="projeto-title" className={SECTION_Y}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading id="projeto-title" className="max-w-[18ch]">
              {projeto.h2}
            </SectionHeading>
            <p className="mt-6 max-w-[58ch] text-texto-secundario">{projeto.text}</p>
          </div>
          <div className="self-end rounded-card-lg border border-borda p-6 md:p-8 lg:col-span-5">
            <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.015em]">
              {projeto.diferenteTitle}
            </h3>
            <p className="mt-3 text-texto-secundario">
              <RichText parts={projeto.diferente} strongClassName="font-bold text-texto" />
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3 md:gap-4" data-counters>
          <StatCard stat={acuracia} />
          <StatCard stat={recall} variant="destaque" />
          <StatCard
            stat={{ value: 0, label: projeto.model.rest.replace(/^,\s*/, '') }}
            valueText={projeto.model.strong}
          />
        </div>
        <p className="mt-4 max-w-[70ch] text-small text-texto-secundario">{projeto.ressalva}</p>

        <div className="mt-14 grid gap-10 border-t border-borda pt-10 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-texto">Stack</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {projeto.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-borda px-3.5 py-1.5 caption text-vinho-profundo"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-texto">Equipe</h3>
            <ul className="mt-4 space-y-1.5 text-texto-secundario">
              {projeto.equipe.map((n) => (
                <li key={n}>{n}</li>
              ))}
              <li className="pt-2 text-texto">
                {projeto.orientacao.label}:{' '}
                <strong className="font-bold text-vinho">{projeto.orientacao.name}</strong>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
