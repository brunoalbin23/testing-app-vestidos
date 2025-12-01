import { Page, expect } from '@playwright/test';

export class AdminDashboardPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page.getByRole('heading', { name: /Export|Admin dashboard/i })).toBeVisible();
  }

  async logout() {
    // Confirmar que el dashboard está visible antes de desloguear
    await this.assertIsVisible();

    // Buscar el botón de cerrar sesión (puede estar en un form)
    const signOutButton = this.page.getByRole('button', { name: /Cerrar sesión|Sign out/ });
    await signOutButton.click();

    // Confirmar que volvió al login
    await expect(this.page).toHaveURL('http://localhost:3000/admin/login');
  }
}