import { BellOff, KeyRound, Lock, MapPin, Trash2, UserCheck } from 'lucide-react'
import { RichText } from '../components/ui/RichText'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { seguranca } from '../content/copy'

const ICONS = [MapPin, BellOff, KeyRound, Lock, UserCheck, Trash2]

/** `#seguranca` — fundo `superficie`, texto sticky à esquerda e grade 2×3 sem cartões. */
export function Seguranca() {
  return (
    <section id="seguranca" aria-labelledby="seguranca-title" className="bg-superficie">
      <Container className={`${SECTION_Y} grid gap-14 lg:grid-cols-12 lg:gap-8`}>
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading id="seguranca-title">{seguranca.h2}</SectionHeading>
          <p className="mt-6 max-w-[44ch] lead text-texto-secundario">
            <RichText parts={seguranca.text} />
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {seguranca.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <li key={item.title}>
                <span className="grid size-11 place-items-center rounded-full bg-white text-vinho">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-[1.25rem] leading-tight font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-texto-secundario">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
