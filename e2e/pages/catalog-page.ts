import { expect, Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertIsVisible() {
    await expect(this.page).toHaveURL('http://localhost:3000/search');
    await expect(this.page.getByRole('heading', { name: /Browse catalog/i })).toBeVisible();
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

  async assertFilterExists(name: string) {
    await expect(this.page.locator(`select[name="${name}"]`)).toBeVisible();
  }

  async assertCategorieOptions(expectedCategories: string[]) {
    const options = await this.page
      .locator('select[name="category"] option')
      .allTextContents();

    for (const categories of expectedCategories) {
      expect(options).toContain(categories);
    }
  }

  async assertSizeOptions(expectedSizes: string[]) {
    const options = await this.page
      .locator('select[name="size"] option')
      .allTextContents();

    for (const size of expectedSizes) {
      expect(options).toContain(size);
    }
  }

  async assertColorOptions(expectedColor: string[]) {
    const options = await this.page
      .locator('select[name="color"] option')
      .allTextContents();

    for (const color of expectedColor) {
      expect(options).toContain(color);
    }
  }

  async assertStyleOptions(expectedStyle: string[]) {
    const options = await this.page
      .locator('select[name="style"] option')
      .allTextContents();

    for (const style of expectedStyle) {
      expect(options).toContain(style);
    }
  }

  async selectCategory(value: string) {
    await this.page.locator('select[name="category"]').selectOption(value);
  }

  async selectSize(value: string) {
    await this.page.locator('select[name="size"]').selectOption(value);
  }

  async selectColor(value: string) {
    await this.page.locator('select[name="color"]').selectOption(value);
  }

  async selectStyle(value: string) {
    await this.page.locator('select[name="style"]').selectOption(value);
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async assertResultsVisible() {
    const results = this.page.locator('.product-card, .item-card');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  }
}