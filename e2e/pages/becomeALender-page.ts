import { Page, expect } from '@playwright/test';

export class BecomeALenderPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/become-a-lender');
    await expect(this.page.getByRole('heading', { name: /become a lender/i })).toBeVisible();
  }
}