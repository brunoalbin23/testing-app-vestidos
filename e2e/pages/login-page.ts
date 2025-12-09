import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async loginAsAdmin(username: string, password: string) {
    // Navegar directamente a /admin/login en lugar de usar el link
    await this.page.goto('http://localhost:3000/admin/login');
    
    // Esperar a que los inputs sean visibles
    await this.page.waitForSelector('#username', { timeout: 5000 });
    await this.page.waitForSelector('#password', { timeout: 5000 });
    
    // Rellenar usando IDs
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);

    // Espera explícita a que la página navegue al dashboard
    await Promise.all([
      this.page.waitForURL(/\/admin$/i), 
      this.page.getByRole('button', { name: 'Iniciar sesión' }).click(),
    ]);

    // Confirmar que el dashboard se cargó
    await expect(this.page.getByRole('heading', { name: /Export/i })).toBeVisible();
  }
}