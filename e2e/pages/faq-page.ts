import { Page, expect } from '@playwright/test';

export class FaqPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/faq');
    await expect(this.page.getByRole('heading', { name: /faq/i })).toBeVisible();
  }
}