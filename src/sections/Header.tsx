import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import logoBranco from '../assets/brand/amparo-logo-horizontal-branco.svg'
import logoVinho from '../assets/brand/amparo-logo-horizontal.svg'
import { Button } from '../components/ui/Button'
import { cta, nav } from '../content/copy'
import { APP_URL } from '../lib/config'
import { getLenis, gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Header que se transforma (DESIGN §6.2 e §7.11, padrão Gardance/Eduzz): no topo ocupa a largura
 * do container, transparente; a partir de 80px vira uma pílula compacta centralizada de vidro.
 * Sobre seções escuras usa `.glass` com textos brancos.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const sheetId = useId()
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const dark = overDark || open

  // Folha aberta: trava o scroll, foca o primeiro link e fecha com Esc.
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prev
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useGSAP(() => {
    // Pílula compacta a partir de 80px de scroll.
    ScrollTrigger.create({
      start: 80,
      end: 'max',
      onToggle: (self) => setCompact(self.isActive),
    })
    // Tom escuro sobre seções escuras.
    const active = new Set<Element>()
    gsap.utils.toArray<HTMLElement>('[data-header-dark]').forEach((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 48px',
        end: 'bottom 48px',
        onToggle: (self) => {
          if (self.isActive) active.add(el)
          else active.delete(el)
          setOverDark(active.size > 0)
        },
      }),
    )
  })

  const pill = compact || open

  return (
    <header data-header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-4">
      <div
        data-header-pill
        className={clsx(
          'relative mx-auto flex items-center justify-between gap-4 rounded-full border transition-[max-width,height,background-color,border-color,box-shadow,padding] duration-500 ease-amparo',
          pill
            ? 'h-16 max-w-[920px] pr-2 pl-5 md:pl-6'
            : 'h-16 max-w-[1280px] pr-2 pl-5 md:h-[72px] md:pr-3 md:pl-7',
          dark
            ? 'on-dark border-white/25 text-white glass'
            : pill
              ? 'border-white/60 text-texto shadow-float glass-light'
              : 'border-transparent bg-transparent text-texto max-lg:border-white/60 max-lg:glass-light',
        )}
      >
        <a
          href="#inicio"
          className="relative flex h-11 shrink-0 items-center"
          aria-label="Amparo, voltar ao início"
        >
          <img
            src={logoVinho}
            alt=""
            width={90}
            height={30}
            className={clsx(
              'w-auto transition-[height,opacity] duration-500 ease-amparo',
              pill ? 'h-[26px]' : 'h-[30px]',
              dark && 'opacity-0',
            )}
          />
          <img
            src={logoBranco}
            alt=""
            width={90}
            height={30}
            className={clsx(
              'absolute top-1/2 left-0 w-auto -translate-y-1/2 transition-[height,opacity] duration-500 ease-amparo',
              pill ? 'h-[26px]' : 'h-[30px]',
              !dark && 'opacity-0',
            )}
          />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul
            className={clsx(
              'flex items-center transition-[gap] duration-500 ease-amparo',
              pill ? 'gap-0' : 'gap-4',
            )}
          >
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={clsx(
                    'group relative inline-flex h-11 items-center px-2.5 font-semibold whitespace-nowrap transition-[color,font-size] duration-250',
                    pill ? 'text-[0.875rem]' : 'text-[0.9375rem]',
                    dark
                      ? 'text-white/85 hover:text-white'
                      : 'text-texto-secundario hover:text-vinho',
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-2.5 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-amparo group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener"
            className={clsx(
              'hidden h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-bold transition-colors duration-250 sm:inline-flex',
              dark ? 'text-white hover:bg-white/10' : 'text-vinho hover:bg-superficie',
            )}
          >
            {nav.entrar}
          </a>
          <div className="hidden sm:block">
            <Button
              href={APP_URL}
              target="_blank"
              rel="noopener"
              size="sm"
              variant={dark ? 'on-dark' : 'primary'}
              className="hover:scale-[1.03]"
            >
              {cta.acessar}
            </Button>
          </div>
          <button
            ref={menuButton}
            type="button"
            className={clsx(
              'grid size-11 place-items-center rounded-full transition-colors duration-250 lg:hidden',
              dark ? 'bg-white/15 text-white' : 'bg-superficie text-vinho-profundo hover:bg-borda',
            )}
            aria-expanded={open}
            aria-controls={sheetId}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Folha de tela cheia (mobile) */}
      <div
        id={sheetId}
        hidden={!open}
        className="on-dark fixed inset-0 -z-10 overflow-y-auto overscroll-contain bg-vinho-profundo/95 px-5 pt-28 pb-10 text-white backdrop-blur-lg lg:hidden"
      >
        <nav aria-label="Seções">
          <ul className="flex flex-col gap-1">
            {nav.links.map((l, i) => (
              <li key={l.href}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-white/10 py-3 display-m"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          href={APP_URL}
          target="_blank"
          rel="noopener"
          variant="on-dark"
          block
          className="mt-8"
        >
          {cta.acessar}
        </Button>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener"
          className="mt-3 flex min-h-12 items-center justify-center font-bold text-white/85"
        >
          {nav.entrar}
        </a>
      </div>
    </header>
  )
}
