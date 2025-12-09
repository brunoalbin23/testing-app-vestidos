import { Page, expect } from '@playwright/test';

export class AdminDashboardPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL(/\/admin$/i);
    await expect(this.page.getByRole('heading', { name: /Export/i })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /Estadísticas del Dashboard/i })).toBeVisible();
  }

  async logout() {
    // Confirmar que el dashboard está visible antes de desloguear
    await this.assertIsVisible();

    await Promise.all([
      this.page.waitForURL(/\/admin\/login$/i),
      this.page.getByRole('button', { name: /Cerrar sesión/i }).click(),
    ]);
  }
}