import { Page, expect } from '@playwright/test';

export class TermsPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/terms');
    await expect(this.page.getByRole('heading', { name: /terms/i })).toBeVisible();
  }
}