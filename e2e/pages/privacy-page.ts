import { Page, expect } from '@playwright/test';

export class PrivacyPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/privacy');
    await expect(this.page.getByRole('heading', { name: /Política de Privacidad/i })).toBeVisible();
  }

  async goBackHome() {
    // Click en el botón "Volver al inicio"
    await this.page.getByRole('link', { name: /Volver al inicio/i }).click();
  }

  async assertNavBarVisible() {
    await expect(this.page.getByRole('link', { name: 'GlamRent', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Browse', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'How it works', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Featured', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'FAQ', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Become a lender', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Admin', exact: true })).toBeVisible();
  }
}