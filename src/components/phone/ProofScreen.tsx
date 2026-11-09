import { ChevronLeft, Lock, ShieldCheck } from 'lucide-react'
import { app, cofre } from '../../content/copy'
import { AppHeader, AppNav } from './AppChrome'

/** Réplica de `prova-verificada.png` (390×845). Decorativa. */
export function ProofScreen() {
  const t = app.prova
  return (
    <div className="relative h-full w-full bg-white font-sans">
      <AppHeader />
      <div className="px-[35px]">
        <ChevronLeft className="mt-[30px] size-[24px] text-vinho" strokeWidth={2} />
        <p className="mt-[14px] text-[20px] leading-tight font-bold text-texto">{t.title}</p>
        <p className="mt-[6px] text-[13.5px] text-[#3b3b3b]">{t.date}</p>

        <div className="mt-[22px] rounded-[14px] border border-confirma/25 p-[22px]">
          <span className="grid size-[38px] place-items-center rounded-full bg-confirma/12 text-confirma">
            <Lock className="size-[17px]" strokeWidth={2.25} />
          </span>
          <p className="mt-[12px] text-[18px] leading-tight font-semibold text-texto">
            {t.guardado}
          </p>
          <p className="mt-[6px] text-[13px] leading-[1.45] text-[#3b3b3b]">{t.guardadoText}</p>
        </div>

        <div className="mt-[16px] rounded-[14px] border border-confirma/25 p-[22px]">
          <span className="grid size-[38px] place-items-center rounded-full bg-confirma/12 text-confirma">
            <ShieldCheck className="size-[18px]" strokeWidth={2.25} />
          </span>
          <p className="mt-[12px] text-[18px] leading-tight font-semibold text-texto">
            {t.verificada}
          </p>
          <p className="mt-[6px] text-[13px] leading-[1.45] text-[#3b3b3b]">{t.verificadaText}</p>
          <div className="mt-[14px] rounded-[10px] bg-superficie/70 px-[16px] py-[12px]">
            <p className="text-[11px] text-vinho-profundo/80">{t.hashLabel}</p>
            <p className="mt-[4px] text-[14.5px] text-texto tabular-nums">{cofre.hash}</p>
            <p className="mt-[4px] text-[11px] text-vinho-profundo/80">{t.registrado}</p>
          </div>
        </div>
      </div>
      <AppNav />
    </div>
  )
}
