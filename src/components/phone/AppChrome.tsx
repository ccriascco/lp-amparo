import clsx from 'clsx'
import { Bell, Calculator, FileText, House, Settings, ShieldPlus, User } from 'lucide-react'
import { app } from '../../content/copy'

/** Cabeçalho em gradiente das telas internas do app (iniciais + 3 ícones). */
export function AppHeader({
  height = 121,
  children,
}: {
  height?: number
  children?: React.ReactNode
}) {
  return (
    <header
      className="relative rounded-b-[21px] px-[32px] pt-[32px] text-white"
      style={{ background: 'var(--grad-vinho)', height }}
    >
      <div className="flex items-center justify-between">
        <span className="grid size-[48px] place-items-center rounded-full bg-white/20 text-[14px] font-bold tracking-[0.02em]">
          {app.home.initials}
        </span>
        <div className="flex gap-[12px]">
          {[Bell, Calculator, Settings].map((Icon, i) => (
            <span key={i} className="grid size-[40px] place-items-center rounded-full bg-white/20">
              <Icon
                className="size-[18px]"
                strokeWidth={i === 1 ? 2.4 : 2}
                fill={i === 1 ? 'none' : 'currentColor'}
              />
            </span>
          ))}
        </div>
      </div>
      {children}
    </header>
  )
}

/** Barra de navegação flutuante do app. */
export function AppNav({ active = 0 }: { active?: number }) {
  const icons = [House, FileText, ShieldPlus, User]
  return (
    <nav className="absolute bottom-[25px] left-1/2 flex h-[55px] w-[250px] -translate-x-1/2 items-center justify-around rounded-full border border-borda/60 bg-white px-[10px] shadow-[0_8px_24px_-12px_rgb(75_42_63/0.22)]">
      {icons.map((Icon, i) =>
        i === active ? (
          <span
            key={i}
            className="grid size-[40px] place-items-center rounded-full bg-superficie text-vinho"
          >
            <Icon className="size-[20px]" strokeWidth={2.4} />
          </span>
        ) : (
          <span key={i} className={clsx('grid size-[40px] place-items-center text-vinho/45')}>
            <Icon
              className="size-[22px]"
              fill="currentColor"
              fillOpacity={0.9}
              stroke="white"
              strokeWidth={1.5}
            />
          </span>
        ),
      )}
    </nav>
  )
}
