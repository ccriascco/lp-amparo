import { Accordion } from '../components/ui/Accordion'
import { EmergencyBar } from '../components/ui/EmergencyBar'
import { RichText } from '../components/ui/RichText'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { faq, ui } from '../content/copy'

/** `#faq` — EmergencyBar compacta no topo + Accordion. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={SECTION_Y}>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title">{ui.faqTitle}</SectionHeading>
        </div>
        <div className="lg:col-span-8">
          <EmergencyBar compact />
          <div className="mt-8">
            <Accordion
              items={faq.items.map((f) => ({
                q: f.q,
                a: <RichText parts={f.a} strongClassName="font-bold text-texto" />,
              }))}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
