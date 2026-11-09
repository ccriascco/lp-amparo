import clsx from 'clsx'
import {
  Bell,
  Calculator,
  Camera,
  FileText,
  House,
  Settings,
  ShieldPlus,
  Siren,
  TriangleAlert,
  User,
  UserPlus,
} from 'lucide-react'
import { app } from '../../content/copy'

const QUICK_ICONS = [Camera, Siren, Calculator, UserPlus]

/**
 * Réplica da tela inicial atual do app (`inicio-celular.png`, 1170×2532 → 390×844),
 * desenhada em 390×845. Decorativa: o `PhoneFrame` que a contém recebe o rótulo acessível.
 */
export function HomeScreen({ className }: { className?: string }) {
  const t = app.home
  return (
    <div className={clsx('relative h-full w-full overflow-hidden bg-white font-sans', className)}>
      {/* Cabeçalho em gradiente (= header do app) */}
      <header
        className="relative h-[150px] rounded-b-[21px] px-[32px] pt-[32px] text-white"
        style={{ background: 'var(--grad-vinho)' }}
      >
        <div className="flex items-center justify-between">
          <span className="grid size-[48px] place-items-center rounded-full bg-white/20 text-[14px] font-bold tracking-[0.02em]">
            {t.initials}
          </span>
          <div className="flex gap-[12px]">
            {[Bell, Calculator, Settings].map((Icon, i) => (
              <span
                key={i}
                className="grid size-[40px] place-items-center rounded-full bg-white/20"
              >
                <Icon
                  className="size-[18px]"
                  strokeWidth={i === 1 ? 2.4 : 2}
                  fill={i === 1 ? 'none' : 'currentColor'}
                />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-[9px] text-[21px] leading-tight font-bold">{t.greeting}</p>
        <p className="mt-[3px] text-[13.5px] leading-snug text-white/80">{t.subtitle}</p>
      </header>

      {/* Ocorrências da semana */}
      <section className="absolute top-[172px] right-[32px] left-[32px]">
        <div className="flex items-baseline justify-between">
          <p className="text-[17px] text-texto">{t.ocorrencias}</p>
          <p className="text-[13.5px] text-texto-secundario">{t.periodo}</p>
        </div>
        <div className="mt-[16px] grid grid-cols-7 gap-[7.5px]">
          {t.days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-[7px]">
              <span className="h-[7.5px] w-full rounded-full bg-superficie" />
              <span className="text-[11.5px] leading-none text-texto-secundario">{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOS com halo (centro em y = 341) */}
      <div className="absolute top-[258px] left-1/2 grid size-[166px] -translate-x-1/2 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full bg-sos/8" />
        <span aria-hidden className="absolute inset-[6px] rounded-full bg-sos/14" />
        <span aria-hidden className="absolute inset-[10px] rounded-full bg-sos/22" />
        <span
          data-home-sos
          className="relative grid size-[140px] place-items-center rounded-full bg-sos text-white"
        >
          <span className="flex flex-col items-center">
            <TriangleAlert className="size-[33px]" strokeWidth={2.25} />
            <span className="mt-[1px] text-[33px] leading-none font-bold tracking-[0.01em]">
              {t.sos}
            </span>
          </span>
        </span>
      </div>

      {/* Leitura de risco */}
      <section className="absolute top-[449px] right-[32px] left-[32px] h-[136px] rounded-[14px] border border-borda/70 bg-white px-[20px] pt-[16px] shadow-[0_4px_14px_-8px_rgb(75_42_63/0.18)]">
        <div className="flex items-center gap-[12px]">
          <span className="grid size-[32px] place-items-center rounded-full bg-superficie text-vinho">
            <TriangleAlert className="size-[15px]" strokeWidth={2} />
          </span>
          <p className="text-[20px] leading-none font-semibold text-texto">{t.risco.title}</p>
          <span className="rounded-full bg-superficie px-[8px] py-[3px] text-[11px] leading-none font-bold text-vinho">
            {t.risco.badge}
          </span>
        </div>
        <div className="mt-[14px] grid grid-cols-3 gap-[8px]">
          {t.risco.levels.map((l, i) => {
            const on = i === t.risco.active
            return (
              <div key={l} className="flex flex-col items-center">
                <span
                  className={clsx(
                    'text-[13.5px] leading-none',
                    on ? 'font-bold text-vinho uppercase' : 'text-texto',
                  )}
                >
                  {l}
                </span>
                <span
                  className={clsx(
                    'mt-[10px] w-full rounded-full',
                    on ? 'h-[7px] bg-vinho' : 'h-[3.5px] bg-superficie',
                  )}
                />
              </div>
            )
          })}
        </div>
        <p className="mt-[13px] text-[13.5px] font-bold text-vinho">{t.risco.link}</p>
      </section>

      {/* Ações rápidas (a 4ª é cortada pela borda, como no app) */}
      <section className="absolute top-[608px] left-[32px] w-[460px]">
        <p className="text-[13.5px] text-[#3b3b3b]">{t.quickTitle}</p>
        <div className="mt-[14px] flex gap-[28px]">
          {t.quick.map((label, i) => {
            const Icon = QUICK_ICONS[i]
            return (
              <div key={label} className="flex w-[72px] shrink-0 flex-col items-center">
                <span className="grid size-[72px] place-items-center rounded-full bg-superficie text-vinho">
                  <Icon className="size-[23px]" strokeWidth={1.75} />
                </span>
                <span className="mt-[9px] w-[90px] text-center text-[12px] leading-[1.15] text-[#3b3b3b]">
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Barra de navegação flutuante */}
      <nav className="absolute bottom-[25px] left-1/2 flex h-[55px] w-[250px] -translate-x-1/2 items-center justify-around rounded-full border border-borda/60 bg-white px-[10px] shadow-[0_8px_24px_-12px_rgb(75_42_63/0.22)]">
        <span className="grid size-[40px] place-items-center rounded-full bg-superficie text-vinho">
          <House className="size-[20px]" strokeWidth={2.4} />
        </span>
        {[FileText, ShieldPlus, User].map((Icon, i) => (
          <span key={i} className="grid size-[40px] place-items-center text-vinho/45">
            <Icon
              className="size-[22px]"
              fill="currentColor"
              fillOpacity={0.9}
              stroke="white"
              strokeWidth={1.5}
            />
          </span>
        ))}
      </nav>
    </div>
  )
}
