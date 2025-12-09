import { Page, expect } from '@playwright/test';

export class FaqPage {
  constructor(private page: Page) {}

  questionItems = this.page.locator('.space-y-6 > div');

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/faq');
    await expect(this.page.getByRole('heading', { name: /Preguntas Frecuentes/i })).toBeVisible();
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
  }

  async countQuestions() {
    return await this.questionItems.count();
  }
}