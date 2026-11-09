import clsx from 'clsx'
import { useRef, useState } from 'react'
import { DisguisePhone } from '../components/demo/DisguisePhone'
import { InteractiveCalculator } from '../components/demo/InteractiveCalculator'
import { RichText } from '../components/ui/RichText'
import { Container, SectionHeading } from '../components/ui/Section'
import { disfarce } from '../content/copy'
import { useDisfarceMotion } from '../motion/useDisfarceMotion'

/** `#disfarce` — a "camada de fora" (DESIGN.md §9 Modo Disfarce, §7.2). */
export function Disfarce() {
  const [step, setStep] = useState(0)
  const root = useRef<HTMLElement>(null)
  useDisfarceMotion(root, setStep)

  return (
    <section
      ref={root}
      id="disfarce"
      aria-labelledby="disfarce-title"
      data-header-dark
      className="px-3 md:px-4"
    >
      <div
        data-shell-open
        className="on-dark overflow-hidden rounded-[28px] bg-vinho-profundo text-white/80 md:rounded-shell"
      >
        <Container className="py-24 md:py-32">
          <div className="max-w-[760px]">
            <SectionHeading id="disfarce-title" light>
              {disfarce.h2}
            </SectionHeading>
            <p className="mt-6 max-w-[52ch] lead">
              <RichText parts={disfarce.text} strongClassName="font-bold text-white" />
            </p>
          </div>

          {/* Palco fixado no desktop; no mobile o celular fica "grudado" ao lado dos passos */}
          <div
            data-disfarce-stage
            className="mt-14 grid grid-cols-[108px_1fr] gap-5 sm:grid-cols-[150px_1fr] sm:gap-8 lg:mt-16 lg:min-h-[640px] lg:grid-cols-2 lg:items-center lg:gap-16"
          >
            <div className="lg:flex lg:justify-center">
              <div className="sticky top-24 lg:static">
                <DisguisePhone step={step} className="w-full lg:w-[290px]" />
              </div>
            </div>

            <ol className="flex flex-col">
              {disfarce.steps.map((s, i) => (
                <li
                  key={s.strong}
                  data-disfarce-step
                  aria-current={i === step ? 'step' : undefined}
                  className={clsx(
                    'relative border-l-2 py-6 pl-5 transition-colors duration-500 max-lg:min-h-[46svh] lg:py-5 lg:pl-7',
                    i === step ? 'border-white text-white' : 'border-white/15 text-white/40',
                  )}
                >
                  <p className="font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em] md:text-[1.625rem]">
                    {s.strong}
                  </p>
                  <p className="mt-2 max-w-[38ch]">{s.rest.trim()}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Calculadora que funciona de verdade */}
          <div className="mt-20 flex flex-col items-center border-t border-white/10 pt-16 text-center md:mt-28">
            <InteractiveCalculator />
            <p className="mt-2 max-w-[44ch] text-small text-white/70">{disfarce.note}</p>
          </div>
        </Container>
      </div>
    </section>
  )
}
