import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://vercel.com/');

    await page.getByRole('link', { name: 'Start deploying'}).click();

    await expect(page.locator('h1.geist-text.h3')).toHaveText('Import Git Repository');
})