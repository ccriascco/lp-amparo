// Confere a linha do tempo de #leitura-risco no desktop: linha, setas e marcos acompanhando o scroll
// nos dois sentidos (indo e voltando). Uso: node scripts/check-timeline.mjs <url>
import { chromium } from 'playwright-core'
const url = process.argv[2] ?? 'http://localhost:5173/'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const at = async (p) => {
  await page.evaluate(async (p) => {
    const el = document.querySelector('[data-tl-pin]')
    const top = el.getBoundingClientRect().top + scrollY
    const y = top + (el.offsetHeight - innerHeight) * p
    const from = scrollY
    for (let i = 1; i <= 20; i++) {
      window.__lenis.scrollTo(from + ((y - from) * i) / 20, { immediate: true, force: true })
      await new Promise((r) => setTimeout(r, 30))
    }
  }, p)
  await page.waitForTimeout(900)
  return page.evaluate(() => ({
    on: [...document.querySelectorAll('[data-tl-item]')].map((i) => (i.hasAttribute('data-on') ? 1 : 0)).join(''),
    linha: (() => { const m = /inset\(0px ([\d.]+)%/.exec(document.querySelector('[data-tl-fill]').style.clipPath); return m ? Math.round(100 - +m[1]) + '%' : '100%' })(),
    setas: [...document.querySelectorAll('[data-tl-chev]')].map((c) => (c.hasAttribute('data-on') ? 1 : 0)).join(''),
    sticky: Math.round(document.querySelector('[data-tl-pin] > div').getBoundingClientRect().top),
  }))
}
for (const [label, p] of [['ida 0.1', 0.1], ['ida 0.3', 0.3], ['ida 0.55', 0.55], ['ida 0.75', 0.75], ['ida fim', 1], ['volta 0.75', 0.75], ['volta 0.55', 0.55], ['volta 0.3', 0.3], ['volta 0.1', 0.1], ['acima da seção', -0.4]])
  console.log(label.padEnd(16), JSON.stringify(await at(p)))
console.log('erros:', errors.length ? errors : 'nenhum')
await browser.close()
