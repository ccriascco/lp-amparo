import clsx from 'clsx'
import {
  Bell,
  Calculator,
  CalendarDays,
  Camera,
  Check,
  Clock,
  EyeOff,
  FileText,
  FolderLock,
  Heart,
  Lock,
  MapPin,
  NotebookPen,
  Scale,
  Send,
  Settings,
  Trash2,
  TriangleAlert,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import avatar from '../../assets/app-screens/avatar-marina.webp'
import { app } from '../../content/copy'
import { AppNav } from './AppChrome'

/*
 * Telas do app usadas nos celulares do hero, desenhadas em 390×845 ("px do app") a partir de
 * `home-sos.png`, `rede-de-apoio.png` e `ocorrencias.png` (452×970 → fator 0,863).
 * Decorativas: o `PhoneFrame` que as contém recebe o rótulo acessível (ou `decorative`).
 */

/** Cabeçalho em gradiente com a foto da Marina e os 3 ícones (bell, calculadora, ajustes). */
function PhotoHeader({ height, children }: { height: number; children: ReactNode }) {
  return (
    <header
      className="absolute inset-x-0 top-0 rounded-b-[22px] text-white"
      style={{ background: 'var(--grad-vinho)', height }}
    >
      <img
        src={avatar}
        alt=""
        width={45}
        height={45}
        className="absolute top-[45px] left-[34px] size-[45px] rounded-full"
      />
      <div className="absolute top-[48px] right-[34px] flex gap-[12px]">
        {[Bell, Calculator, Settings].map((Icon, i) => (
          <span key={i} className="grid size-[38px] place-items-center rounded-full bg-white/20">
            <Icon
              className="size-[18px]"
              strokeWidth={i === 1 ? 2.4 : 2}
              fill={i === 1 ? 'none' : 'currentColor'}
            />
          </span>
        ))}
      </div>
      <div className="absolute top-[104px] right-[34px] left-[34px]">{children}</div>
    </header>
  )
}

/** Fileira de atalhos redondos (a 4ª é cortada pela borda da tela, como no app). */
function QuickRow({
  top,
  items,
}: {
  top: number
  items: { icon: LucideIcon; label: ReactNode }[]
}) {
  return (
    <div className="absolute left-[40px] flex w-[460px] gap-[26px]" style={{ top }}>
      {items.map(({ icon: Icon, label }, i) => (
        <div key={i} className="flex w-[69px] shrink-0 flex-col items-center">
          <span className="grid size-[69px] place-items-center rounded-full bg-superficie text-vinho">
            <Icon className="size-[23px]" strokeWidth={1.75} />
          </span>
          <span className="mt-[9px] w-[92px] text-center text-[12px] leading-[1.2] text-[#2b2b2b]">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Paginação dos atalhos (pílula ativa + 2 pontos). */
function Dots({ top }: { top: number }) {
  return (
    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[5px]" style={{ top }}>
      <span className="h-[5px] w-[17px] rounded-full bg-vinho" />
      <span className="size-[5px] rounded-full bg-borda" />
      <span className="size-[5px] rounded-full bg-borda" />
    </div>
  )
}

const Screen = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={clsx('relative h-full w-full overflow-hidden bg-white font-sans', className)}>
    {children}
  </div>
)

const card =
  'rounded-[12px] border border-borda/70 bg-white shadow-[0_4px_14px_-8px_rgb(75_42_63/0.18)]'

/** Tela inicial (`home-sos.png`). */
export function HomeSosScreen() {
  const t = app.homeSos
  const icons = [Camera, UserPlus, FolderLock, MapPin]
  return (
    <Screen>
      <PhotoHeader height={183}>
        <p className="text-[21px] leading-tight font-bold">{t.greeting}</p>
        <p className="mt-[4px] text-[13px] leading-snug text-white/85">{t.subtitle}</p>
      </PhotoHeader>

      {/* Ocorrências dos últimos 7 dias */}
      <section className="absolute top-[204px] right-[34px] left-[34px]">
        <div className="flex items-baseline justify-between">
          <p className="text-[16.5px] font-semibold text-texto">{t.ocorrencias}</p>
          <p className="text-[13px] text-texto-secundario">{t.periodo}</p>
        </div>
        <div className="mt-[14px] grid grid-cols-7 gap-[7px]">
          {t.days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-[6px]">
              <span
                className={clsx(
                  'h-[7px] w-full rounded-full',
                  t.marked.includes(i) ? 'bg-vinho' : 'bg-superficie',
                )}
              />
              <span className="text-[11.5px] leading-none text-texto-secundario">{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pedido de ajuda */}
      <div className="absolute top-[286px] right-[24px] left-[24px] text-center">
        <p className="text-[21.5px] leading-tight font-bold text-texto">{t.ajudaTitle}</p>
        <p className="mx-auto mt-[9px] max-w-[300px] text-[13px] leading-[1.45] text-[#3b3b3b]">
          {t.ajudaText}
        </p>
      </div>

      {/* SOS com halo (centro em x 195, y 481) */}
      <div className="absolute top-[374px] left-1/2 grid size-[190px] -translate-x-1/2 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full bg-sos/8" />
        <span aria-hidden className="absolute inset-[7px] rounded-full bg-sos/12" />
        <span aria-hidden className="absolute inset-[12px] rounded-full bg-sos/20" />
        <span
          data-home-sos
          className="relative grid size-[162px] place-items-center rounded-full bg-sos text-white"
        >
          <span className="flex flex-col items-center">
            <TriangleAlert className="size-[36px]" strokeWidth={2.1} />
            <span className="mt-[2px] text-[35px] leading-none font-bold tracking-[0.01em]">
              {t.sos}
            </span>
          </span>
        </span>
      </div>

      <p className="absolute top-[566px] left-[34px] text-[13px] text-[#3b3b3b]">{t.quickTitle}</p>
      <QuickRow top={598} items={t.quick.map((label, i) => ({ icon: icons[i], label }))} />
      <Dots top={718} />
      {/* Cartão seguinte, quase todo atrás da barra (como no app) */}
      <div className={clsx('absolute top-[748px] right-[34px] left-[34px] h-[80px]', card)} />
      <AppNav />
    </Screen>
  )
}

/** Rede de apoio (`rede-de-apoio.png`). */
export function RedeScreen() {
  const t = app.redeTela
  const icons = [Send, Clock, Lock, Heart]
  return (
    <Screen>
      <PhotoHeader height={209}>
        <p className="text-[22.5px] leading-tight font-bold">{t.title}</p>
        <p className="mt-[8px] text-[13px] leading-[1.45] text-white/85">{t.subtitle}</p>
      </PhotoHeader>

      {app.rede.map((g, i) => (
        <div
          key={g.name}
          className={clsx('absolute right-[34px] left-[34px] h-[97px] px-[20px] pt-[15px]', card)}
          style={{ top: 231 + i * 109.5 }}
        >
          <p className="flex items-center gap-[7px] text-[19px] leading-none text-texto">
            {g.name}
            {g.principal && <Heart className="size-[14px] fill-vinho text-vinho" />}
          </p>
          <p className="mt-[8px] text-[13px] leading-none font-bold text-vinho">{g.group}</p>
          <p className="mt-[9px] text-[13px] leading-none text-[#3b3b3b]">{g.status}</p>
          <span
            className={clsx(
              'absolute top-1/2 right-[20px] grid size-[31px] -translate-y-1/2 place-items-center rounded-full',
              g.confirmed ? 'bg-confirma/12 text-confirma' : 'bg-superficie text-vinho/45',
            )}
          >
            {g.confirmed ? (
              <Check className="size-[15px]" strokeWidth={2.4} />
            ) : (
              <Clock className="size-[17px] fill-current text-vinho/45" stroke="white" />
            )}
          </span>
        </div>
      ))}

      <div className="absolute top-[570px] right-[34px] left-[34px] grid h-[41px] place-items-center rounded-full bg-vinho text-[15.5px] font-bold text-white">
        {t.button}
      </div>

      <QuickRow
        top={637}
        items={t.quick.map(([a, b], i) => ({
          icon: icons[i],
          label: (
            <>
              <span className="block font-semibold">{a}</span>
              {b && <span className="block text-texto-secundario">{b}</span>}
            </>
          ),
        }))}
      />
      <AppNav />
    </Screen>
  )
}

/** Ocorrências (`ocorrencias.png`). */
export function OcorrenciasScreen() {
  const t = app.ocorrenciasTela
  const icons = [Scale, EyeOff, NotebookPen, Trash2]
  return (
    <Screen>
      <PhotoHeader height={209}>
        <p className="text-[22.5px] leading-tight font-bold">{t.title}</p>
        <p className="mt-[8px] max-w-[290px] text-[13px] leading-[1.45] text-white/85">
          {t.subtitle}
        </p>
      </PhotoHeader>

      <div className={clsx('absolute top-[231px] right-[34px] left-[34px] h-[119px]', card)}>
        <span className="absolute top-1/2 left-[23px] grid size-[62px] -translate-y-1/2 place-items-center rounded-full bg-superficie text-[26px] font-bold text-vinho">
          {t.count}
        </span>
        <div className="absolute top-[18px] right-[16px] left-[100px]">
          <p className="text-[16px] leading-tight font-bold text-texto">{t.countTitle}</p>
          <p className="mt-[6px] text-[11.5px] leading-[1.4] text-[#3b3b3b]">{t.countText}</p>
        </div>
      </div>

      <div className="absolute top-[374px] right-[34px] left-[34px] grid h-[41px] place-items-center rounded-full bg-vinho text-[15.5px] font-bold text-white">
        {t.button}
      </div>

      <QuickRow top={443} items={t.quick.map((label, i) => ({ icon: icons[i], label }))} />
      <Dots top={589} />

      <p className="absolute top-[616px] left-[34px] text-[19px] text-texto">{t.ultimos}</p>
      <div className={clsx('absolute top-[653px] right-[34px] left-[34px] h-[68px]', card)}>
        <span className="absolute top-1/2 left-[22px] grid size-[38px] -translate-y-1/2 place-items-center rounded-full bg-superficie text-vinho">
          <FileText className="size-[18px]" strokeWidth={1.75} />
        </span>
        <div className="absolute top-[14px] left-[76px]">
          <p className="text-[15px] leading-none font-bold text-texto">{t.registro.title}</p>
          <p className="mt-[8px] flex items-center gap-[10px] text-[12.5px] leading-none text-vinho">
            <span className="flex items-center gap-[4px]">
              <CalendarDays className="size-[13px]" strokeWidth={2} />
              {t.registro.date}
            </span>
            <span className="flex items-center gap-[4px]">
              <Clock className="size-[13px]" strokeWidth={2} />
              {t.registro.time}
            </span>
          </p>
        </div>
        <span className="absolute top-1/2 right-[20px] grid size-[31px] -translate-y-1/2 place-items-center rounded-full bg-confirma/12 text-confirma">
          <Check className="size-[15px]" strokeWidth={2.4} />
        </span>
      </div>
      <div className={clsx('absolute top-[745px] right-[34px] left-[34px] h-[80px]', card)} />
      <AppNav />
    </Screen>
  )
}
