/**
 * Screenshot de cada seção (e rodapé) em várias larguras.
 * Uso: node scripts/shoot-sections.mjs <url> <saida-dir> [larguras=1280,360]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const [url, outDir, widthsArg = '1280,360'] = process.argv.slice(2)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
await fs.mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widthsArg.split(',').map(Number)) {
  const page = await browser.newPage({
    viewport: { width: w, height: w < 768 ? 780 : 900 },
    deviceScaleFactor: 1,
  })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  // Rola até o fim para carregar imagens lazy e disparar gatilhos.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  const ids = await page.$$eval('main > section, body footer', (els) =>
    els.map((e, i) => e.id || `footer${i}`),
  )
  for (const [i, id] of ids.entries()) {
    const el = page.locator('main > section, body footer').nth(i)
    await el.screenshot({ path: path.join(outDir, `${w}-${String(i).padStart(2, '0')}-${id}.png`) })
  }
  console.log(
    `${w}px: ${ids.length} seções, overflow-x ${overflow}px${errors.length ? ' ERROS: ' + errors.join(' | ') : ''}`,
  )
  await page.close()
}
await browser.close()
