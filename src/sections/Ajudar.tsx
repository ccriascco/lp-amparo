import { CopyLinkButton } from '../components/demo/CopyLinkButton'
import { Container, SectionHeading } from '../components/ui/Section'
import { TintedPhoto } from '../components/ui/TintedPhoto'
import { ajudar } from '../content/copy'

/** `#ajudar` — ArchPhoto (5) + texto e "Copiar link" (7) sobre `superficie`. */
export function Ajudar() {
  return (
    <section id="ajudar" aria-labelledby="ajudar-title" className="px-3 md:px-4">
      <div className="rounded-[28px] bg-superficie md:rounded-shell">
        <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="mx-auto w-full max-w-[400px] lg:col-span-5 lg:mx-0">
            <div data-reveal-photo className="arch relative aspect-[3/4] overflow-hidden">
              <TintedPhoto
                slot="ajudar"
                overlay="soft"
                parallax
                sizes="(min-width: 1024px) 400px, 90vw"
                className="arch absolute inset-0"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="ajudar-title">{ajudar.h2}</SectionHeading>
            <p className="mt-6 max-w-[48ch] lead text-texto-secundario">{ajudar.text}</p>
            <div className="mt-8">
              <CopyLinkButton />
            </div>
            <p className="mt-4 max-w-[44ch] text-small text-texto-secundario">{ajudar.tip}</p>
          </div>
        </Container>
      </div>
    </section>
  )
}
