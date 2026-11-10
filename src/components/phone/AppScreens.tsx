import clsx from 'clsx'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Calculator,
  CalendarDays,
  Camera,
  Check,
  ChevronLeft,
  Clock,
  EyeOff,
  FileCheck2,
  FileText,
  FolderLock,
  Heart,
  Lock,
  MapPin,
  NotebookPen,
  Radar,
  Scale,
  Send,
  Settings,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  UserPlus,
  X,
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
function PhotoHeader({
  height,
  children,
  close,
}: {
  height: number
  children?: ReactNode
  /** Botão "X" no lugar da foto (telas abertas por cima, como Conteúdo e direitos). */
  close?: boolean
}) {
  return (
    <header
      className="absolute inset-x-0 top-0 rounded-b-[22px] text-white"
      style={{ background: 'var(--grad-vinho)', height }}
    >
      {close ? (
        <span className="absolute top-[45px] left-[34px] grid size-[46px] place-items-center rounded-full bg-white/20">
          <X className="size-[22px]" strokeWidth={2.2} />
        </span>
      ) : (
        <img
          src={avatar}
          alt=""
          width={45}
          height={45}
          className="absolute top-[45px] left-[34px] size-[45px] rounded-full"
        />
      )}
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
      {children && <div className="absolute top-[104px] right-[34px] left-[34px]">{children}</div>}
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

/** Prova verificada (`prova-verificada.png`). */
export function ProvaScreen() {
  const t = app.prova
  const greenCard = 'rounded-[12px] border border-confirma/25 bg-white'
  return (
    <Screen>
      <PhotoHeader height={121} />
      <ChevronLeft
        className="absolute top-[150px] left-[30px] size-[26px] text-vinho"
        strokeWidth={2}
      />
      <p className="absolute top-[193px] left-[34px] text-[22.5px] leading-tight font-bold text-texto">
        {t.title}
      </p>
      <p className="absolute top-[230px] left-[34px] text-[13px] text-[#3b3b3b]">{t.date}</p>

      <div className={clsx('absolute top-[273px] right-[34px] left-[34px] h-[159px]', greenCard)}>
        <span className="absolute top-[24px] left-[24px] grid size-[38px] place-items-center rounded-full bg-confirma/12 text-confirma">
          <Lock className="size-[17px]" strokeWidth={2} />
        </span>
        <p className="absolute top-[72px] left-[24px] text-[19px] leading-tight font-semibold text-texto">
          {t.guardado}
        </p>
        <p className="absolute top-[100px] right-[24px] left-[24px] text-[13px] leading-[1.45] text-[#3b3b3b]">
          {t.guardadoText}
        </p>
      </div>

      <div className={clsx('absolute top-[449px] right-[34px] left-[34px] h-[250px]', greenCard)}>
        <span className="absolute top-[24px] left-[24px] grid size-[38px] place-items-center rounded-full bg-confirma/12 text-confirma">
          <ShieldCheck className="size-[18px]" strokeWidth={2} />
        </span>
        <p className="absolute top-[72px] left-[24px] text-[19px] leading-tight font-semibold text-texto">
          {t.verificada}
        </p>
        <p className="absolute top-[100px] right-[22px] left-[24px] text-[13px] leading-[1.45] text-[#3b3b3b]">
          {t.verificadaText}
        </p>
        <div className="absolute top-[147px] right-[24px] left-[24px] h-[80px] rounded-[10px] bg-superficie/70 px-[16px] pt-[12px]">
          <p className="text-[11.5px] leading-none text-texto-secundario">{t.hashLabel}</p>
          <p className="mt-[8px] text-[13px] leading-none text-texto tabular-nums">
            a3f9c2e7 · 8b41d05a · 6ec73912
          </p>
          <p className="mt-[9px] text-[11.5px] leading-none text-texto-secundario">
            {t.registrado}
          </p>
        </div>
      </div>
      <AppNav />
    </Screen>
  )
}

/** Tela inicial com a leitura de risco (`home-leitura-risco.png`). */
export function HomeRiscoScreen() {
  const t = app.homeRisco
  const icons = [Camera, UserPlus, FolderLock, MapPin]
  return (
    <Screen>
      <PhotoHeader height={183}>
        <p className="text-[21px] leading-tight font-bold">{t.greeting}</p>
        <p className="mt-[4px] text-[13px] leading-snug text-white/85">{t.subtitle}</p>
      </PhotoHeader>
      <p className="absolute top-[186px] left-[34px] text-[13px] text-[#3b3b3b]">{t.quickTitle}</p>
      <QuickRow top={218} items={t.quick.map((label, i) => ({ icon: icons[i], label }))} />
      <Dots top={336} />

      <div className={clsx('absolute top-[366px] right-[34px] left-[34px] h-[189px]', card)}>
        <span className="absolute top-[24px] left-[24px] grid size-[38px] place-items-center rounded-full bg-superficie text-vinho">
          <ShieldCheck className="size-[18px]" strokeWidth={2} />
        </span>
        <p className="absolute top-[74px] left-[24px] text-[19.5px] leading-tight font-bold text-texto">
          {t.cardTitle}
        </p>
        <p className="absolute top-[102px] right-[20px] left-[24px] text-[13px] leading-[1.45] text-[#3b3b3b]">
          {t.cardText}
        </p>
        <p className="absolute top-[150px] left-[24px] text-[13px] font-bold text-vinho">
          {t.cardLink}
        </p>
      </div>

      {/* Atalhos em cartões (o 3º é cortado pela borda, como no app) */}
      {[...t.atalhos, ''].map((label, i) => {
        const Icon = [FolderLock, BookOpen, FileText][i]
        return (
          <div
            key={i}
            className={clsx('absolute top-[583px] h-[120px] w-[154px] px-[16px] pt-[16px]', card)}
            style={{ left: 34 + i * 167 }}
          >
            <span className="grid size-[34px] place-items-center rounded-full bg-superficie text-vinho">
              <Icon className="size-[16px]" strokeWidth={2} />
            </span>
            <p className="mt-[10px] max-w-[110px] text-[13px] leading-[1.3] text-texto">{label}</p>
            {label && (
              <ArrowRight className="absolute right-[16px] bottom-[14px] size-[14px] text-vinho" />
            )}
          </div>
        )
      })}
      <Dots top={720} />
      <AppNav />
    </Screen>
  )
}

/** Central de conteúdo e direitos (`conteudo-direitos.png`). */
export function DireitosScreen() {
  const t = app.direitosTela
  const icons = [Scale, FileCheck2, Radar]
  const tops = [213, 402, 613]
  const heights = [176, 198, 200]
  return (
    <Screen>
      <PhotoHeader height={190} close>
        <p className="text-[22.5px] leading-tight font-bold">{t.title}</p>
        <p className="mt-[8px] text-[13px] leading-[1.45] text-white/85">{t.subtitle}</p>
      </PhotoHeader>
      {t.cards.map((c, i) => {
        const Icon = icons[i]
        return (
          <div
            key={c.title}
            className={clsx('absolute right-[34px] left-[34px] px-[24px] pt-[24px]', card)}
            style={{ top: tops[i], height: heights[i] }}
          >
            <span className="grid size-[38px] place-items-center rounded-full bg-superficie text-vinho">
              <Icon className="size-[18px]" strokeWidth={2} />
            </span>
            <p className="mt-[14px] text-[18.5px] leading-[1.25] font-semibold whitespace-pre-line text-texto">
              {/* quebras nos mesmos pontos da tela do app */}
              {c.title.replace('uma ', 'uma\n').replace('eletrônico ', 'eletrônico\n')}
            </p>
            <p className="mt-[6px] text-[13px] leading-[1.45] text-[#3b3b3b]">{c.text}</p>
            {i < 2 && <p className="mt-[4px] text-[13px] font-bold text-vinho">{t.lerMais}</p>}
          </div>
        )
      })}
      {/* O 3º cartão some sob a barra, como no app */}
      <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-t from-white via-white/90 to-transparent" />
      <AppNav />
    </Screen>
  )
}

/**
 * Tela inicial (`home-leitura-risco.png`) já rolada até a leitura de risco (#dores, item 4; pedido
 * do cliente): header compacto, fim das ações rápidas, card "Leitura de risco" em Médio com o link
 * "Ver como chegamos nisso", atalhos e barra. O card leva `data-risk-card` para o destaque animado
 * (contorno vinho + scale 1.03) quando o item fica ativo; `highlight` deixa o destaque fixo
 * (celular e movimento reduzido).
 */
export function RiscoFocoScreen({ highlight = true }: { highlight?: boolean }) {
  const t = app.comoChegamos
  const h = app.homeRisco
  const icons = [Camera, UserPlus, FolderLock, MapPin]
  return (
    <Screen>
      {/* Header compacto (a tela rolou) */}
      <header
        className="absolute inset-x-0 top-0 z-10 flex h-[112px] items-end justify-between rounded-b-[22px] px-[34px] pb-[18px] text-white"
        style={{ background: 'var(--grad-vinho)' }}
      >
        <img src={avatar} alt="" width={40} height={40} className="size-[40px] rounded-full" />
        <div className="flex gap-[12px]">
          {[Bell, Calculator, Settings].map((Icon, i) => (
            <span key={i} className="grid size-[36px] place-items-center rounded-full bg-white/20">
              <Icon
                className="size-[17px]"
                strokeWidth={i === 1 ? 2.4 : 2}
                fill={i === 1 ? 'none' : 'currentColor'}
              />
            </span>
          ))}
        </div>
      </header>

      {/* Fim das ações rápidas, saindo por baixo do header */}
      <QuickRow top={66} items={h.quick.map((label, i) => ({ icon: icons[i], label }))} />
      <Dots top={184} />

      {/* Card de leitura de risco em Médio */}
      <section
        data-risk-card
        className={clsx(
          'absolute top-[214px] right-[34px] left-[34px] h-[212px] origin-center rounded-[14px] border-[1.5px] bg-white px-[22px] pt-[22px]',
          highlight
            ? 'border-vinho/45 shadow-[0_10px_30px_-12px_rgb(149_75_110/0.45)]'
            : 'border-borda/70 shadow-[0_4px_14px_-8px_rgb(75_42_63/0.18)]',
        )}
      >
        <div className="flex items-center gap-[12px]">
          <span className="grid size-[36px] place-items-center rounded-full bg-superficie text-vinho">
            <TriangleAlert className="size-[17px]" strokeWidth={2} />
          </span>
          <p className="text-[20px] leading-none font-semibold text-texto">{t.riscoTitle}</p>
          <span className="rounded-full bg-superficie px-[8px] py-[3px] text-[11px] leading-none font-bold text-vinho">
            {t.riscoBadge}
          </span>
        </div>
        <div className="mt-[22px] grid grid-cols-3 gap-[8px]">
          {t.levels.map((l, i) => {
            const on = i === t.active
            return (
              <div key={l} className="flex flex-col items-center">
                <span
                  className={clsx(
                    'text-[14px] leading-none',
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
        <p className="mt-[20px] text-[13px] leading-[1.45] text-[#3b3b3b]">{t.medioText}</p>
        <p className="mt-[14px] text-[13px] font-bold text-vinho">{h.cardLink}</p>
      </section>

      {/* Atalhos em cartões (o 3º cortado pela borda) */}
      {[...h.atalhos, ''].map((label, i) => {
        const Icon = [FolderLock, BookOpen, FileText][i]
        return (
          <div
            key={i}
            className={clsx('absolute top-[452px] h-[120px] w-[154px] px-[16px] pt-[16px]', card)}
            style={{ left: 34 + i * 167 }}
          >
            <span className="grid size-[34px] place-items-center rounded-full bg-superficie text-vinho">
              <Icon className="size-[16px]" strokeWidth={2} />
            </span>
            <p className="mt-[10px] max-w-[110px] text-[13px] leading-[1.3] text-texto">{label}</p>
            {label && (
              <ArrowRight className="absolute right-[16px] bottom-[14px] size-[14px] text-vinho" />
            )}
          </div>
        )
      })}
      <Dots top={590} />
      <div className={clsx('absolute top-[620px] right-[34px] left-[34px] h-[140px]', card)} />
      <AppNav />
    </Screen>
  )
}
