import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:3000/');
  }

  async loginAsAdmin(username: string, password: string) {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Espera explícita a que la página navegue al dashboard
    await Promise.all([
      this.page.waitForURL(/\/admin$/i), 
      this.page.getByRole('button', { name: 'Sign in' }).click(),
    ]);

    // Confirmar que el dashboard se cargó
    await expect(this.page.getByRole('heading', { name: /Admin dashboard/i })).toBeVisible();
  }
}
