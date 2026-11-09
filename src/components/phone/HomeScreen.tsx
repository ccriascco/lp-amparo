import clsx from 'clsx'
import {
  Bell,
  Calculator,
  Camera,
  FileText,
  FolderLock,
  House,
  MapPin,
  Settings,
  ShieldPlus,
  TriangleAlert,
  User,
  UserPlus,
} from 'lucide-react'
import avatar from '../../assets/app-screens/avatar-marina.webp'
import { app } from '../../content/copy'

const QUICK_ICONS = [Camera, UserPlus, FolderLock, MapPin]

/**
 * Réplica da tela inicial do app (DESIGN.md §6.5, `home-sos.png`), desenhada em 390×845.
 * Decorativa: o `PhoneFrame` que a contém recebe o rótulo acessível.
 */
export function HomeScreen({ className }: { className?: string }) {
  const t = app.home
  return (
    <div className={clsx('relative h-full w-full overflow-hidden bg-white font-sans', className)}>
      {/* Cabeçalho em gradiente (= header do app) */}
      <header
        className="relative h-[183px] rounded-b-[20px] px-[35px] pt-[46px] text-white"
        style={{ background: 'var(--grad-vinho)' }}
      >
        <div className="flex items-center justify-between">
          <img
            src={avatar}
            alt=""
            width={46}
            height={46}
            className="size-[46px] rounded-full object-cover ring-[2.5px] ring-white/35"
            draggable={false}
          />
          <div className="flex gap-[11px]">
            {[Bell, Calculator, Settings].map((Icon, i) => (
              <span
                key={i}
                className="grid size-[38px] place-items-center rounded-full bg-white/20"
              >
                <Icon
                  className="size-[22px]"
                  strokeWidth={2.25}
                  fill="currentColor"
                  fillOpacity={i === 1 ? 0 : 1}
                />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-[16px] text-[21px] leading-tight font-bold">{t.greeting}</p>
        <p className="mt-[5px] text-[13.5px] leading-snug text-white/85">{t.subtitle}</p>
      </header>

      {/* Ocorrências dos últimos 7 dias */}
      <section className="px-[35px] pt-[24px]">
        <div className="flex items-baseline justify-between">
          <p className="text-[16px] font-semibold text-texto">{t.ocorrencias}</p>
          <p className="text-[13.5px] text-texto-secundario">{t.periodo}</p>
        </div>
        <div className="mt-[12px] grid grid-cols-7 gap-[8px]">
          {t.days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-[7px]">
              <span
                className={clsx(
                  'h-[6.5px] w-full rounded-full',
                  d.on ? 'bg-vinho' : 'bg-superficie',
                )}
              />
              <span className="text-[11.5px] leading-none text-texto-secundario">{d.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pedido de ajuda */}
      <section className="px-[30px] pt-[27px] text-center">
        <p className="text-[22px] leading-tight font-bold text-texto">{t.helpTitle}</p>
        <p className="mx-auto mt-[10px] max-w-[310px] text-[13.5px] leading-[1.45] text-[#3b3b3b]">
          {t.helpText}
        </p>
      </section>

      {/* SOS com halo */}
      <div className="relative mx-auto mt-[8px] grid size-[208px] place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full bg-sos/10" />
        <span aria-hidden className="absolute inset-[9px] rounded-full bg-sos/15" />
        <span aria-hidden className="absolute inset-[16px] rounded-full bg-sos/20" />
        <span
          data-home-sos
          className="relative grid size-[175px] place-items-center rounded-full bg-sos text-white"
        >
          <span className="flex flex-col items-center">
            <TriangleAlert className="size-[40px]" strokeWidth={2.25} />
            <span className="mt-[2px] text-[42px] leading-none font-bold tracking-[0.01em]">
              {t.sos}
            </span>
          </span>
        </span>
      </div>

      {/* Ações rápidas (a 4ª é cortada pela borda, como no app) */}
      <section className="pt-[4px] pl-[35px]">
        <p className="text-[13.5px] text-[#3b3b3b]">{t.quickTitle}</p>
        <div className="mt-[12px] flex gap-[22px]">
          {t.quick.map((label, i) => {
            const Icon = QUICK_ICONS[i]
            return (
              <div key={label} className="flex w-[73px] shrink-0 flex-col items-center">
                <span className="grid size-[73px] place-items-center rounded-full bg-superficie text-vinho">
                  <Icon className="size-[23px]" strokeWidth={1.75} />
                </span>
                <span className="mt-[8px] w-[90px] text-center text-[11.5px] leading-[1.25] text-texto">
                  {label}
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-[10px] flex justify-center gap-[5px] pr-[35px]">
          <span className="h-[5.5px] w-[18px] rounded-full bg-vinho" />
          <span className="size-[5.5px] rounded-full bg-borda" />
          <span className="size-[5.5px] rounded-full bg-borda" />
        </div>
      </section>

      {/* Cartão parcialmente coberto pela barra inferior */}
      <div className="absolute top-[756px] right-[35px] left-[35px] h-[60px] rounded-[14px] border border-borda/40 bg-white" />

      {/* Barra de navegação flutuante */}
      <nav className="absolute bottom-[24px] left-1/2 flex h-[56px] w-[253px] -translate-x-1/2 items-center justify-around rounded-full border border-borda/60 bg-white px-[10px] shadow-[0_8px_24px_-10px_rgb(75_42_63/0.25)]">
        <span className="grid size-[42px] place-items-center rounded-full bg-superficie text-vinho">
          <House className="size-[21px]" strokeWidth={2.4} />
        </span>
        {[FileText, ShieldPlus, User].map((Icon, i) => (
          <span key={i} className="grid size-[42px] place-items-center text-vinho/55">
            <Icon
              className="size-[23px]"
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
