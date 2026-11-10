/**
 * Screenshots com cada item de uma lista no centro da tela (para seções com item ativo, ex. #dores).
 * Uso: node scripts/shoot-items.mjs <url> <saida-dir> --items='[data-dor-item]' --idx=0,2 [--w=1440]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const [url, outDir, ...flags] = process.argv.slice(2)
const opt = (k, d) => flags.find((f) => f.startsWith(`--${k}=`))?.split('=').slice(1).join('=') ?? d
const sel = opt('items', '[data-dor-item]')
const idx = opt('idx', '0').split(',').map(Number)
const widths = opt('w', '1440').split(',').map(Number)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await fs.mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 768 ? 844 : 900 } })
  await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(4200)
  for (const i of idx) {
    await page.evaluate(
      async ([sel, i]) => {
        const el = document.querySelectorAll(sel)[i]
        const r = el.getBoundingClientRect()
        const target = r.top + scrollY + r.height / 2 - innerHeight / 2
        const from = scrollY
        const steps = Math.max(1, Math.ceil(Math.abs(target - from) / 400))
        for (let s = 1; s <= steps; s++) {
          const y = from + ((target - from) * s) / steps
          if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true })
          else window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 40))
        }
      },
      [sel, i],
    )
    await page.waitForTimeout(1300)
    const file = path.join(outDir, `${w}-item-${i + 1}.png`)
    await page.screenshot({ path: file })
    console.log(file)
  }
  await page.close()
}
await browser.close()
