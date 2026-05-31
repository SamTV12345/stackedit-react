import { chromium } from 'playwright'

const base = 'http://localhost:4173/stackedit-react/'
const errors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
page.on('pageerror', e => errors.push('pageerror: ' + e.message))

await page.goto(base + '#/app', { waitUntil: 'networkidle' })
await page.waitForSelector('.monaco-editor', { timeout: 20000 })
await page.waitForTimeout(800)

// Open via the global shortcut while the editor has focus.
await page.locator('.monaco-editor .view-lines').click()
await page.keyboard.press('Control+Shift+P')
const listbox = page.getByRole('listbox')
await listbox.waitFor({ timeout: 5000 })
console.log('palette opened:', await listbox.isVisible())
console.log('command count:', await listbox.locator('[role="option"]').count())

await page.screenshot({ path: 'smoke-palette.png' })

// Navigate to the "toggle outline" command (index 4) and run it (locale-agnostic).
for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowDown')
await page.keyboard.press('Enter')
await page.waitForTimeout(300)

const outlineVisible = await page.locator('nav').filter({ has: page.locator('ul') }).first().isVisible().catch(() => false)
console.log('outline toggled open by command:', outlineVisible)
console.log('palette closed after run:', !(await page.getByRole('listbox').isVisible().catch(() => false)))

await browser.close()
console.log('ERRORS:', errors.length)
errors.forEach(e => console.log('  - ' + e))
