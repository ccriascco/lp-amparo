import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { BrandDrop } from './BrandDrop'

type NotificationCardProps = {
  title: string
  text: string
  time: string
  className?: string
  style?: CSSProperties
}

/**
 * Notificação do sistema (DESIGN §6.23, padrão Eduzz): `.glass-light`, ícone do app (gota em
 * quadrado vinho), título, linha e horário à direita.
 */
export function NotificationCard({ title, text, time, className, style }: NotificationCardProps) {
  return (
    <div
      data-notif
      style={style}
      className={clsx(
        'flex w-[280px] items-start gap-3 rounded-card px-4 py-3 shadow-float glass-light',
        className,
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-vinho text-white">
        <BrandDrop className="h-[18px] w-auto" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-baseline justify-between gap-3">
          <span className="truncate text-[0.8125rem] leading-tight font-bold text-texto">
            {title}
          </span>
          <span className="shrink-0 text-xs font-semibold text-texto-secundario">{time}</span>
        </span>
        <span className="mt-0.5 block truncate text-[0.875rem] leading-snug text-texto-secundario">
          {text}
        </span>
      </span>
    </div>
  )
}
