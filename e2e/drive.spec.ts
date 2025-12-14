import { test, expect } from '@playwright/test'

test.describe('Drive e2e', () => {
  test('loads the app and fetches /folders API', async ({ page }) => {
    const foldersResponse = page.waitForResponse(
      (r) => r.url().startsWith('http://localhost:3000/folders') && r.status() === 200,
    )
    await page.goto('/')
    const resp = await foldersResponse
    expect(resp.ok()).toBeTruthy()
  })

  test('searches "res", shows dropdown and selecting resume.pdf updates header path', async ({
    page,
  }) => {
    await page.goto('/')

    const search = page.getByPlaceholder('Search...')
    await search.fill('res')

    const searchResp = page.waitForResponse(
      (r) => r.url().startsWith('http://localhost:3000/folders/search') && r.status() === 200,
    )
    await search.press('Enter')
    const sr = await searchResp
    expect(sr.ok()).toBeTruthy()

    const item = page.locator('text=resume.pdf')
    await expect(item).toBeVisible()

    const folderResp = page.waitForResponse(
      (r) => r.url().startsWith('http://localhost:3000/folder/') && r.status() === 200,
    )
    await item.click()
    const fr = await folderResp
    expect(fr.ok()).toBeTruthy()

    const buttonsContainingResume = page.locator('button', { hasText: 'resume' })
    expect(await buttonsContainingResume.count()).toBeGreaterThan(0)
  })
})
