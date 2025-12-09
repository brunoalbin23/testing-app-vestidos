
import { expect, Page } from '@playwright/test';

export class AdminListPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    await expect(this.page.getByRole('button', { name: /Agregar Artículo/i })).toBeVisible();
  }

  async clickAddArticle() {
    await this.page.getByRole('button', { name: /Agregar Artículo/i }).click();
  }

  getRowByNameStartsWith(text: string) {
    return this.page.locator('tbody tr', {
      has: this.page.locator('td', { hasText: new RegExp(`^${text}`) })
    }).first();
  }

  async assertRowVisibleByExactName(name: string) {
    await this.page.waitForSelector(`tbody tr:has-text("${name}")`, { timeout: 5000 });
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async waitRowToDisappear(name: string) {
    await expect(this.page.locator(`tbody tr:has-text("${name}")`)).toHaveCount(0);
  }
}
