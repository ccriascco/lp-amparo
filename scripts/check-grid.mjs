/**
 * Confere a regra do grid de 1280px (pedido do cliente): rola a página inteira e lista o
 * conteúdo visível (texto, imagem, ícone, botão) que sai da faixa central de 1280px.
 * Uso: node scripts/check-grid.mjs <url> [larguras=1920,2560]
 */
import { chromium } from 'playwright-core'

const [url = 'http://localhost:5173/', widthsArg = '1920,2560'] = process.argv.slice(2)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widthsArg.split(',').map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: 1200 } })
  await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(4200)
  const found = new Map()
  const H = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < H; y += 600) {
    await page.evaluate((y) => window.__lenis?.scrollTo(y, { immediate: true, force: true }) ?? scrollTo(0, y), y)
    await page.waitForTimeout(250)
    const hits = await page.evaluate(() => {
      const min = (innerWidth - 1280) / 2 - 1
      const max = innerWidth - min
      const out = []
      for (const el of document.querySelectorAll('main *, footer *')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.bottom < 0 || r.top > innerHeight) continue
        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || +cs.opacity === 0) continue
        if (el.closest('[aria-hidden="true"]') && !el.closest('[data-hero-stage]')) continue
        const isContent =
          ['IMG', 'BUTTON', 'A', 'H1', 'H2', 'H3', 'P', 'LI'].includes(el.tagName) ||
          (el.tagName === 'svg' && r.width < 64)
        if (!isContent) continue
        // conteúdo recortado por um ancestral (carrossel, marquee, palco) não conta como "encostado"
        let clipped = false
        for (let a = el.parentElement; a; a = a.parentElement) {
          if (/(hidden|clip|auto)/.test(getComputedStyle(a).overflowX)) {
            const ar = a.getBoundingClientRect()
            if (ar.left >= min && ar.right <= max) clipped = true
            break
          }
        }
        if (clipped) continue
        if (r.left < min || r.right > max) {
          const sec = el.closest('section,footer')?.id || el.closest('section,footer')?.tagName || '-'
          out.push(`${sec} ${el.tagName}.${String(el.className).slice(0, 40)} [${Math.round(r.left)}–${Math.round(r.right)}]`)
        }
      }
      return out
    })
    hits.forEach((h) => found.set(h.replace(/\[.*\]/, ''), h))
  }
  console.log(`\n${w}px — faixa ${(w - 1280) / 2}–${(w + 1280) / 2}px: ${found.size} fora`)
  ;[...found.values()].slice(0, 40).forEach((h) => console.log('  ' + h))
  await page.close()
}
await browser.close()
