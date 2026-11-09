const cache = new Map<number, Intl.NumberFormat>()

/** Formata em pt-BR: `1492` → `1.492`, `64.3` (1 casa) → `64,3`. */
export function formatNumber(value: number, decimals = 0): string {
  let nf = cache.get(decimals)
  if (!nf) {
    nf = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    cache.set(decimals, nf)
  }
  return nf.format(value)
}

/** Formata o número digitado na calculadora (vírgula decimal, sem separador de milhar). */
export function formatCalc(value: string): string {
  return value.replace('.', ',')
}
