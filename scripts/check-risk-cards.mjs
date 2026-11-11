// Confere a animação dos cartões de nível (#leitura-risco): entrada, laços só com a lista visível
// e parallax das camadas no hover. Uso: node scripts/check-risk-cards.mjs <url>
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
const go = (sel, block = 'center') =>
  page.evaluate(([sel, block]) => {
    const el = document.querySelector(sel)
    const r = el.getBoundingClientRect()
    const y = r.top + scrollY - (block === 'center' ? (innerHeight - r.height) / 2 : 0)
    window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y)
  }, [sel, block])
const snap = () =>
  page.evaluate(() => ({
    pulse: getComputedStyle(document.querySelector('[data-rl-pulse]')).transform,
    wave: getComputedStyle(document.querySelector('[data-rl-wave]')).transform,
    float: getComputedStyle(document.querySelector('[data-rl-float]')).transform,
    layer: getComputedStyle(document.querySelector('[data-rl-layer]')).opacity,
    gauge: document.querySelector('[data-rl-gauge]').style.strokeDasharray,
  }))
await go('[data-rl-card]')
await page.waitForTimeout(2200)
const a = await snap()
await page.waitForTimeout(700)
const b = await snap()
console.log('entrada: camada opacidade', a.layer, '| medidor', a.gauge)
console.log('na tela, laços andando:', a.pulse !== b.pulse && a.wave !== b.wave && a.float !== b.float)
await go('footer', 'top')
await page.waitForTimeout(500)
const c = await snap()
await page.waitForTimeout(700)
const d = await snap()
console.log('fora da tela, laços parados:', c.pulse === d.pulse && c.wave === d.wave && c.float === d.float)
await go('[data-rl-card]')
await page.waitForTimeout(600)
const before = await page.$$eval('[data-rl-card]:first-child [data-rl-layer], li:first-child [data-rl-layer] > div', (els) => els.map((e) => getComputedStyle(e).translate))
await page.locator('[data-rl-card]').first().hover()
await page.waitForTimeout(700)
const after = await page.$$eval('li:first-child [data-rl-layer] > div', (els) => els.map((e) => getComputedStyle(e).translate))
console.log('hover: translate das camadas', JSON.stringify(after), '(antes', JSON.stringify(before.slice(0, after.length)) + ')')
await page.screenshot({ path: 'screenshots/leitura-risco-5/1440-hover-baixo.png', clip: await page.locator('[data-rl-card]').first().boundingBox() })
console.log('erros:', errors.length ? errors : 'nenhum')
await browser.close()
