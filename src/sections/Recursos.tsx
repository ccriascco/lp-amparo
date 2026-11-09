import clsx from 'clsx'
import {
  BookOpen,
  Calculator,
  Check,
  Clock,
  FolderLock,
  Siren,
  TriangleAlert,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { HomeScreen } from '../components/phone/HomeScreen'
import { Initials } from '../components/ui/FloatCard'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { Container, SECTION_Y, SectionHeading } from '../components/ui/Section'
import { a11y, app, cofre, direitos, recursos } from '../content/copy'

const byId = Object.fromEntries(recursos.items.map((i) => [i.id, i]))

/** `#recursos` — H2 centralizado + BentoGrid (DESIGN.md §6.10). */
export function Recursos() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className={SECTION_Y}>
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <SectionHeading id="recursos-title">{recursos.h2}</SectionHeading>
          <p className="mx-auto mt-6 max-w-[52ch] lead text-texto-secundario">{recursos.sub}</p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
          {/* Cartão alto central com o celular (primeiro no mobile) */}
          <div className="relative min-h-[420px] overflow-hidden rounded-card-lg bg-superficie md:col-span-2 lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:min-h-0">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 50% at 50% 30%, rgb(149 75 110 / 0.16) 0%, transparent 70%)',
              }}
            />
            <PhoneFrame
              label={a11y.altHome}
              className="absolute top-10 left-1/2 w-[250px] -translate-x-1/2 lg:top-12 lg:w-[290px]"
            >
              <HomeScreen />
            </PhoneFrame>
          </div>

          <Card id="sos" icon={Siren} className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <MiniSOS />
          </Card>
          <Card
            id="cofre"
            icon={FolderLock}
            className="lg:col-span-4 lg:col-start-9 lg:row-start-1"
          >
            <div className="rounded-card border border-borda bg-white p-4">
              <p className="flex items-center gap-2 text-[0.875rem] font-bold text-confirma">
                <Check className="size-4" strokeWidth={3} aria-hidden /> {cofre.badge}
              </p>
              <p className="mt-2 text-[0.8125rem] tracking-wide text-texto-secundario tabular-nums">
                {cofre.hash}
              </p>
            </div>
          </Card>
          <Card id="rede" icon={Users} className="lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <div className="flex items-center">
              {app.rede.map((p, i) => (
                <span key={p.name} className={clsx('relative', i > 0 && '-ml-3')}>
                  <Initials className="size-12 border-2 border-white text-[0.875rem]">
                    {p.initials}
                  </Initials>
                  <span
                    className={clsx(
                      'absolute -right-0.5 -bottom-0.5 grid size-5 place-items-center rounded-full border-2 border-white',
                      p.confirmed
                        ? 'bg-confirma text-white'
                        : 'bg-superficie text-texto-secundario',
                    )}
                  >
                    {p.confirmed ? (
                      <Check className="size-3" strokeWidth={3} />
                    ) : (
                      <Clock className="size-3" strokeWidth={2.5} />
                    )}
                  </span>
                </span>
              ))}
            </div>
          </Card>
          <Card
            id="risco"
            icon={TriangleAlert}
            className="lg:col-span-4 lg:col-start-9 lg:row-start-2"
          >
            <div className="grid grid-cols-3 gap-2 rounded-card border border-borda bg-white p-4">
              {app.home.risco.levels.map((l, i) => (
                <span key={l} className="flex flex-col items-center gap-2">
                  <span
                    className={clsx(
                      'text-[0.8125rem]',
                      i === 1 ? 'font-bold text-vinho' : 'text-texto-secundario',
                    )}
                  >
                    {l}
                  </span>
                  <span
                    className={clsx(
                      'w-full rounded-full',
                      i === 1 ? 'h-1.5 bg-vinho' : 'h-1 bg-superficie',
                    )}
                  />
                </span>
              ))}
            </div>
          </Card>
          <Card
            id="direitos"
            icon={BookOpen}
            className="md:col-span-1 lg:col-span-6 lg:row-start-3"
          >
            <ul className="flex flex-wrap gap-2">
              {direitos.violencias.map((v) => (
                <li
                  key={v}
                  className="rounded-full border border-borda bg-white px-3 py-1.5 caption text-vinho-profundo"
                >
                  {v}
                </li>
              ))}
            </ul>
          </Card>
          <Card
            id="disfarce"
            icon={Calculator}
            dark
            className="md:col-span-1 lg:col-span-6 lg:row-start-3"
          >
            <div className="flex items-center gap-3">
              <span className="font-sans text-[2rem] leading-none text-white tabular-nums">
                1907
              </span>
              <span className="ml-auto flex gap-2" aria-hidden>
                {['7', '8', '9'].map((k) => (
                  <span
                    key={k}
                    className="grid size-10 place-items-center rounded-full bg-calc-cinza text-white"
                  >
                    {k}
                  </span>
                ))}
                <span className="grid size-10 place-items-center rounded-full bg-calc-laranja text-white">
                  =
                </span>
              </span>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}

function Card({
  id,
  icon: Icon,
  dark,
  className,
  children,
}: {
  id: string
  icon: LucideIcon
  dark?: boolean
  className?: string
  children: ReactNode
}) {
  const item = byId[id]
  return (
    <a
      href={item.href}
      className={clsx(
        'group flex flex-col justify-between gap-8 rounded-card-lg border p-6 md:p-7',
        dark ? 'on-dark border-calc-cinza bg-calc-preto' : 'border-borda bg-white',
        className,
      )}
    >
      <div>
        <span className="grid size-10 place-items-center rounded-full bg-vinho text-white">
          <Icon className="size-[18px]" strokeWidth={2} aria-hidden />
        </span>
        <h3
          className={clsx(
            'mt-5 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em]',
            dark ? 'text-white' : 'text-texto',
          )}
        >
          {item.title}
        </h3>
        <p className={clsx('mt-2 max-w-[36ch]', dark ? 'text-white/75' : 'text-texto-secundario')}>
          {item.text}
        </p>
      </div>
      {/* Só a mini-ilustração reage ao hover (§7.7) */}
      <div className="transition-transform duration-300 ease-amparo group-hover:scale-[1.02]">
        {children}
      </div>
    </a>
  )
}

function MiniSOS() {
  return (
    <div className="flex items-center gap-4">
      <span className="relative grid size-16 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-sos/30 transition-transform duration-500 ease-amparo group-hover:scale-125 group-hover:opacity-0"
        />
        <span className="grid size-14 place-items-center rounded-full bg-sos text-[0.8125rem] font-bold text-white">
          SOS
        </span>
      </span>
      <span className="text-small text-texto-secundario">{app.alerta.title}</span>
    </div>
  )
}
