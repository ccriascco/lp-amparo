/**
 * Header normal (topo) e compacto (depois de rolar), com recorte ampliado do logo.
 * Uso: node scripts/shoot-header.mjs <url> <saida-dir> [larguras=1440,390]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const [url, outDir, widthsArg = '1440,390'] = process.argv.slice(2)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
await fs.mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widthsArg.split(',').map(Number)) {
  const page = await browser.newPage({
    viewport: { width: w, height: w < 768 ? 844 : 900 },
    deviceScaleFactor: 2,
  })
  await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(4200)
  for (const [state, y] of [
    ['normal', 0],
    ['compacto', 400],
  ]) {
    await page.evaluate((y) => {
      const l = window.__lenis
      if (l) l.scrollTo(y, { immediate: true, force: true })
      else window.scrollTo(0, y)
    }, y)
    await page.waitForTimeout(900)
    await page.screenshot({
      path: path.join(outDir, `header-${state}-${w}.png`),
      clip: { x: 0, y: 0, width: w, height: 110 },
    })
    const logo = await page.locator('header a[href="#inicio"]').first().boundingBox()
    if (logo)
      await page.screenshot({
        path: path.join(outDir, `logo-${state}-${w}.png`),
        clip: { x: logo.x - 8, y: logo.y - 8, width: logo.width + 16, height: logo.height + 16 },
      })
  }
  console.log(`${w}px ok`)
  await page.close()
}
await browser.close()
