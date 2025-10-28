import { Page, expect } from '@playwright/test';

export class PrivacyPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/privacy');
    await expect(this.page.getByRole('heading', { name: /Política de Privacidad/i })).toBeVisible();
  }
}