import clsx from 'clsx'
import { Check, Heart, Lock, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'
import { HashScramble } from '../components/demo/HashScramble'
import { NetworkGraph } from '../components/demo/NetworkGraph'
import { RiskLevels } from '../components/demo/RiskLevels'
import { SOSDemo } from '../components/demo/SOSDemo'
import { BulletList } from '../components/ui/BulletList'
import { ConcentricRings } from '../components/ui/ConcentricRings'
import { LeadText, RichText } from '../components/ui/RichText'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { TintedPhoto } from '../components/ui/TintedPhoto'
import { app, cofre, rede, risco, sos } from '../content/copy'
import { pulseRings } from '../motion/pulseRings'

/** `#sos` — texto (5) + SOSDemo e "Quem foi avisada" (7). */
export function Sos() {
  const visual = useRef<HTMLDivElement>(null)
  return (
    <section id="sos" aria-labelledby="sos-title" className={clsx(SECTION_Y, 'overflow-x-clip')}>
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="sos-title" pillar={sos.pillar}>
            {sos.h2}
          </SectionHeading>
          <p className="mt-6 max-w-[52ch] text-texto-secundario">{sos.text}</p>
          <BulletList items={sos.bullets} />
        </div>

        <div
          ref={visual}
          className="relative flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-12 lg:col-span-7"
        >
          <div className="relative grid place-items-center">
            <ConcentricRings
              r={110}
              className="absolute top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <SOSDemo onComplete={() => pulseRings(visual.current)} />
          </div>

          {/* Fragmento real da tela "Alerta enviado" */}
          <div className="relative w-full max-w-[300px] rounded-card-lg border border-borda bg-white p-6 shadow-float">
            <span className="grid size-9 place-items-center rounded-full bg-confirma/12 text-confirma">
              <Check className="size-[18px]" strokeWidth={2.75} aria-hidden />
            </span>
            <p className="mt-3 font-display text-[1.25rem] font-semibold">{app.alerta.title}</p>
            <p className="mt-1 text-small text-texto-secundario">{app.alerta.text}</p>
            <p className="mt-5 border-t border-borda pt-4 text-[0.9375rem] font-bold">
              {sos.avisadasTitle}
            </p>
            <ul className="mt-3 space-y-2.5 text-small">
              {sos.avisadas.map((p) => (
                <li key={p.name} className="flex justify-between gap-4">
                  <span>{p.name}</span>
                  <span
                    className={clsx(
                      p.confirmed ? 'font-bold text-confirma' : 'text-texto-secundario',
                    )}
                  >
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** `#cofre` — visual hash/prova (7) + texto (5). */
export function Cofre() {
  const t = app.prova
  return (
    <section id="cofre" aria-labelledby="cofre-title" className={SECTION_Y}>
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative order-2 lg:order-1 lg:col-span-7">
          <div className="relative overflow-hidden rounded-card-lg bg-superficie p-6 sm:p-10 md:p-14">
            {/* Tipos de violência (tela "Nova ocorrência") */}
            <ul className="flex flex-wrap gap-2" aria-label="Tipos de violência no registro">
              {app.tipos.map((tipo, i) => (
                <li
                  key={tipo}
                  className={clsx(
                    'rounded-full border px-3 py-1.5 caption',
                    i === 1
                      ? 'border-vinho bg-white text-vinho'
                      : 'border-borda bg-white/70 text-vinho-profundo',
                  )}
                >
                  {tipo}
                </li>
              ))}
            </ul>

            <div className="relative mt-8 max-w-[440px] rounded-card-lg border border-confirma/25 bg-white p-6 shadow-float md:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-full bg-confirma/12 text-confirma">
                  <ShieldCheck className="size-5" strokeWidth={2.25} aria-hidden />
                </span>
                <span className="text-small text-texto-secundario">{t.title}</span>
              </div>
              <p className="mt-4 font-display text-[1.375rem] font-semibold">{t.verificada}</p>
              <p className="mt-1 text-small text-texto-secundario">{t.verificadaText}</p>
              <div className="mt-5 rounded-card bg-superficie/70 px-4 py-3.5">
                <p className="text-xs text-vinho-profundo/80">{t.hashLabel}</p>
                <HashScramble
                  text={cofre.hash}
                  className="mt-1 block text-[1.0625rem] text-texto"
                />
                <p className="mt-1 text-xs text-vinho-profundo/80">{t.registrado}</p>
              </div>
              <p
                data-hash-badge
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-confirma/12 px-3 py-1.5 text-[0.875rem] font-bold text-confirma"
              >
                <Check className="size-4" strokeWidth={3} aria-hidden /> {cofre.badge}
              </p>
            </div>

            <div className="relative mt-4 ml-auto flex max-w-[300px] items-center gap-3 rounded-card border border-borda bg-white p-4 shadow-float md:-mt-8 md:mr-0">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-confirma/12 text-confirma">
                <Lock className="size-4" strokeWidth={2.25} aria-hidden />
              </span>
              <span>
                <span className="block text-[0.9375rem] font-bold">{t.guardado}</span>
                <span className="block text-[0.8125rem] text-texto-secundario">
                  {t.guardadoText}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <SectionHeading id="cofre-title" pillar={cofre.pillar}>
            {cofre.h2}
          </SectionHeading>
          <p className="mt-6 max-w-[52ch] text-texto-secundario">{cofre.text}</p>
          <BulletList items={cofre.bullets} />
        </div>
      </Container>
    </section>
  )
}

/** `#rede` — texto (5) + rede sobre ArchPhoto (7). */
export function Rede() {
  return (
    <section id="rede" aria-labelledby="rede-title" data-rede className={SECTION_Y}>
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="rede-title" pillar={rede.pillar}>
            {rede.h2}
          </SectionHeading>
          <p className="mt-6 max-w-[52ch] text-texto-secundario">{rede.text}</p>
          <BulletList items={rede.bullets} />
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative ml-auto w-[78%] max-w-[440px] md:w-[62%]">
            <div data-reveal-photo className="relative aspect-[3/4] overflow-hidden arch">
              <TintedPhoto
                slot="rede-duas-mulheres"
                overlay="soft"
                parallax
                sizes="(min-width: 1024px) 440px, 62vw"
                className="absolute inset-0 arch"
              />
            </div>
          </div>
          <div className="relative -mt-40 w-[86%] max-w-[380px] rounded-card-lg border border-borda bg-white/95 p-4 shadow-float backdrop-blur md:absolute md:bottom-8 md:left-0 md:mt-0 md:w-[54%]">
            <NetworkGraph />
            <p className="mt-1 text-center caption text-texto-secundario">
              <Heart
                className="mr-1 inline size-3.5 fill-vinho align-[-2px] text-vinho"
                aria-hidden
              />
              {app.cadastro.guardiaPrincipal}: {app.rede[0].name}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** `#risco` — painel `superficie`: RiskLevels (7) + texto (5). */
export function Risco() {
  return (
    <section id="risco" aria-labelledby="risco-title" className="px-3 md:px-4">
      <div className="rounded-[28px] bg-superficie md:rounded-shell">
        <Container className={clsx(SECTION_Y, 'grid items-center gap-14 lg:grid-cols-12 lg:gap-8')}>
          <div className="order-2 flex justify-center lg:order-1 lg:col-span-7 lg:justify-start">
            <RiskLevels />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <SectionHeading id="risco-title" pillar={risco.pillar}>
              {risco.h2}
            </SectionHeading>
            <p className="mt-6 max-w-[52ch] text-texto-secundario">
              <RichText parts={risco.text} strongClassName="font-bold text-texto" />
            </p>
            <p className="mt-6 rounded-card border border-borda bg-white p-5 text-texto-secundario">
              <LeadText item={risco.highlight} strongClassName="font-bold text-vinho" />
            </p>
            <p className="mt-6 text-small text-texto-secundario">{risco.note}</p>
          </div>
        </Container>
      </div>
    </section>
  )
}
