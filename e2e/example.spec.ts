import { test, expect } from '@playwright/test';

test('La página de inicio carga correctamente', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/GlamRent/i);
});