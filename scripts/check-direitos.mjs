// Confere as ilustrações de #direitos: laços andando com o cartão na tela, parados fora dela,
// e hover (parallax dos fragmentos). Uso: node scripts/check-direitos.mjs <url>
import { chromium } from 'playwright-core'
const url = process.argv[2] ?? 'http://localhost:5173/'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const b = await chromium.launch({ executablePath: CHROME })
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
const errs = []
p.on('pageerror', (e) => errs.push(e.message))
await p.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
await p.goto(url, { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
const SEL = ['[data-seg]', '[data-check]', '[data-flag]', '[data-agressor]', '[data-token]', '[data-dr-list]']
const snap = () =>
  p.evaluate((SEL) => SEL.map((s) => [...document.querySelectorAll(`#direitos ${s}`)].map((e) => getComputedStyle(e).transform + getComputedStyle(e).opacity).join('|')), SEL)
const go = (y) => p.evaluate((y) => window.__lenis.scrollTo(y, { immediate: true, force: true }), y)
const top = await p.evaluate(() => document.querySelector('#direitos').getBoundingClientRect().top + scrollY)
for (const [label, y] of [['linha de cima', top + 420], ['linha de baixo', top + 1000]]) {
  await go(y); await p.waitForTimeout(700)
  const a = await snap(); await p.waitForTimeout(900); const c = await snap()
  console.log(label.padEnd(15), SEL.map((s, i) => `${s}:${a[i] !== c[i] ? 'anda' : 'parado'}`).join('  '))
}
await go(0); await p.waitForTimeout(800)
const d = await snap(); await p.waitForTimeout(900); const e = await snap()
console.log('fora da tela    ', SEL.map((s, i) => `${s}:${d[i] !== e[i] ? 'anda' : 'parado'}`).join('  '))
await go(top + 420); await p.waitForTimeout(600)
const card = p.locator('#direitos [data-dr-card]').first()
const bx = await card.boundingBox()
await p.mouse.move(bx.x + bx.width - 10, bx.y + bx.height - 10); await p.waitForTimeout(700)
console.log('hover parallax  ', await p.evaluate(() => [...document.querySelectorAll('#direitos [data-dr-card]')][0].querySelector('[data-depth]').style.transform))
console.log('erros:', errs.length ? errs : 'nenhum')
await b.close()
