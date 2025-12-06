import { Page, expect } from '@playwright/test';

export class NewsletterPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL(/\/\?newsletter=success$/);
  }
}