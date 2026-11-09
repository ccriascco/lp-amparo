import clsx from 'clsx'
import { Check, MapPin, RefreshCw, X } from 'lucide-react'
import { app, sos } from '../../content/copy'

/** Réplica de `alerta-enviado.png` (390×845). Decorativa. */
export function AlertScreen() {
  const t = app.alerta
  return (
    <div className="relative h-full w-full bg-white px-[35px] pt-[47px] font-sans">
      <div className="flex justify-end">
        <span className="flex h-[34px] items-center gap-[6px] rounded-full border border-borda px-[14px] text-[13px] font-bold text-texto">
          <X className="size-[14px]" strokeWidth={2.5} />
          {t.sair}
        </span>
      </div>

      <div className="mt-[24px] rounded-[14px] border border-confirma/30 bg-white p-[24px] pt-[22px]">
        <span className="grid size-[38px] place-items-center rounded-full bg-confirma/12 text-confirma">
          <Check className="size-[18px]" strokeWidth={2.5} />
        </span>
        <p className="mt-[14px] text-[19px] leading-tight font-semibold text-texto">{t.title}</p>
        <p className="mt-[6px] text-[13px] leading-[1.45] text-[#3b3b3b]">{t.text}</p>
      </div>

      {/* Mapa estilizado */}
      <div className="relative mt-[22px] h-[171px] overflow-hidden rounded-[14px] bg-[#ececec]">
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 320 171"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g stroke="#fff" strokeWidth="7">
            {[18, 58, 98, 138].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="320" y2={y + 8} />
            ))}
            {[30, 92, 154, 216, 278].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x - 12} y2="171" />
            ))}
          </g>
          <line x1="250" y1="0" x2="290" y2="171" stroke="#fff" strokeWidth="14" />
          <rect x="44" y="26" width="34" height="26" fill="#c8e2c4" />
        </svg>
        <MapPin
          className="absolute top-1/2 left-1/2 size-[30px] -translate-x-1/2 -translate-y-1/2 text-vinho"
          strokeWidth={2.25}
        />
      </div>

      <div className="mt-[24px] rounded-[14px] border border-borda/70 bg-white px-[24px] py-[20px]">
        <p className="text-[19px] leading-tight font-semibold text-texto">{sos.avisadasTitle}</p>
        <ul className="mt-[12px] space-y-[12px] text-[13.5px]">
          {sos.avisadas.map((p) => (
            <li key={p.name} className="flex justify-between">
              <span className="text-[#3b3b3b]">{p.name}</span>
              <span
                className={clsx(p.confirmed ? 'font-bold text-confirma' : 'text-texto-secundario')}
              >
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-[22px] flex gap-[10px] text-[11.5px] leading-[1.4] text-[#3b3b3b]">
        <RefreshCw className="mt-[1px] size-[16px] shrink-0" strokeWidth={2} />
        {t.reenvio}
      </p>

      <span className="absolute right-[35px] bottom-[60px] left-[35px] grid h-[41px] place-items-center rounded-full border-[1.5px] border-vinho text-[15px] font-bold text-vinho">
        {t.cancelar}
      </span>
    </div>
  )
}
