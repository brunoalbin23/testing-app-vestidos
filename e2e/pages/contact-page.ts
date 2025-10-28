import { Page, expect } from '@playwright/test';

export class ContactPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/contact');
    await expect(this.page.getByRole('heading', { name: /contact/i })).toBeVisible();
  }
}