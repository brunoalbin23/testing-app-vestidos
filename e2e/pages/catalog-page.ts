import { Page, expect } from '@playwright/test';

export class CatalogPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/search');
    await expect(this.page.getByRole('heading', { name: /Browse catalog/i })).toBeVisible();
  }
}