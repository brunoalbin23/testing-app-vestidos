import { Page, expect } from '@playwright/test';

export class FaqPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/faq');
    await expect(this.page.getByRole('heading', { name: /Preguntas Frecuentes/i })).toBeVisible();
  }

  async goBackHome() {
    // Click en el botón "Volver al inicio"
    await this.page.getByRole('link', { name: /Volver al inicio/i }).click();
  }
}