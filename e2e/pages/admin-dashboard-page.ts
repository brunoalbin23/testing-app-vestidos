import { Page, expect } from '@playwright/test';

export class AdminDashboardPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
<<<<<<< HEAD
    await expect(this.page).toHaveURL(/\/admin$/i);
    await expect(this.page.getByRole('heading', { name: /Export/i })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /Estadísticas del Dashboard/i })).toBeVisible();
=======
    await expect(this.page.getByRole('heading', { name: /Admin dashboard/i })).toBeVisible();
>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)
  }

  async logout() {
    // Confirmar que el dashboard está visible antes de desloguear
    await this.assertIsVisible();

<<<<<<< HEAD
    await Promise.all([
      this.page.waitForURL(/\/admin\/login$/i),
      this.page.getByRole('button', { name: /Cerrar sesión/i }).click(),
    ]);
=======
    const signOutButton = this.page.getByRole('button', { name: 'Sign out' });
    await signOutButton.click();

    // Confirmar que volvió al login
    await expect(this.page).toHaveURL('http://localhost:3000/admin/login');
>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)
  }
}
