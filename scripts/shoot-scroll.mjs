/**
 * Screenshots de uma seção em pontos do scroll (para seções fixas/sticky e animações no scroll).
 * Pula o preloader, rola com o Lenis desligado (scroll nativo) e espera as animações assentarem.
 *
 * Uso:
 *   node scripts/shoot-scroll.mjs <url> <saida-dir> --sel=#numeros [--w=1440,390]
 *        [--at=0,0.5,1]   progresso da seção (0 = topo da seção no topo da tela; 1 = fim da seção no fim da tela)
 *        [--wait=900]     espera depois de cada rolagem (ms)
 *        [--reduce]       prefers-reduced-motion
 *        [--full]         só a seção inteira (screenshot do elemento)
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const [url, outDir, ...flags] = process.argv.slice(2)
if (!url || !outDir) throw new Error('uso: node scripts/shoot-scroll.mjs <url> <saida-dir> --sel=css')
const opt = (k, d) => flags.find((f) => f.startsWith(`--${k}=`))?.split('=')[1] ?? d
const sel = opt('sel', 'main > section')
const widths = opt('w', '1440,390').split(',').map(Number)
const at = opt('at', '0').split(',').map(Number)
const wait = Number(opt('wait', '900'))
const reduce = flags.includes('--reduce')
const full = flags.includes('--full')
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await fs.mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widths) {
  const page = await browser.newPage({
    viewport: { width: w, height: w < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: reduce ? 'reduce' : 'no-preference',
  })
  await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(reduce ? 300 : 4200) // timeline do hero
  const tag = path.basename(sel.replace(/[^\w-]/g, '')) || 'sec'

  // Rola em passos até a seção, para disparar os gatilhos "once" no caminho.
  const scrollTo = async (y) => {
    await page.evaluate(async (y) => {
      const lenis = window.__lenis
      const from = window.scrollY
      const steps = Math.max(1, Math.ceil(Math.abs(y - from) / 500))
      for (let i = 1; i <= steps; i++) {
        const yy = from + ((y - from) * i) / steps
        if (lenis) lenis.scrollTo(yy, { immediate: true, force: true })
        else window.scrollTo(0, yy)
        await new Promise((r) => setTimeout(r, 40))
      }
    }, y)
    await page.waitForTimeout(wait)
  }

  if (full) {
    await page.locator(sel).first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait)
    await page.locator(sel).first().screenshot({ path: path.join(outDir, `${w}-${tag}-full.png`) })
  } else {
    for (const p of at) {
      const y = await page.evaluate(
        ([sel, p]) => {
          const el = document.querySelector(sel)
          const r = el.getBoundingClientRect()
          const top = r.top + window.scrollY
          return Math.max(0, top + (r.height - innerHeight) * p)
        },
        [sel, p],
      )
      await scrollTo(y)
      const file = path.join(outDir, `${w}-${tag}-${String(Math.round(p * 100)).padStart(3, '0')}.png`)
      await page.screenshot({ path: file })
    }
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  console.log(`${w}px ${sel} overflow-x ${overflow}px${errors.length ? ' ERROS: ' + errors.join(' | ') : ''}`)
  await page.close()
}
await browser.close()
