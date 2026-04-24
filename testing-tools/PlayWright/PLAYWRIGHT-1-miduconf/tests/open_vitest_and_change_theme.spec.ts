import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://vitest.dev/');
  await page.goto('https://vitest.dev/guide/');
  await page.getByRole('switch', { name: 'Switch to dark theme' }).click();
  await page.getByRole('switch', { name: 'Switch to light theme' }).click();
});