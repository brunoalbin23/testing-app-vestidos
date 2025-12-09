import { Page, expect } from '@playwright/test';

export class AdminLoginPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL(/\/admin\/login$/i);
    await expect(this.page.getByRole('heading', { name: /Iniciar sesión administrador/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Iniciar sesión/i })).toBeVisible();
  }

  async loginAsAdmin(username: string, password: string) {
    await this.assertIsVisible();

    await this.page.getByLabel(/Usuario/i).fill(username);
    await this.page.getByLabel(/Contraseña/i).fill(password);

    await Promise.all([
      this.page.waitForURL(/\/admin$/i),
      this.page.getByRole('button', { name: /Iniciar sesión/i }).click(),
    ]);
  }
}

