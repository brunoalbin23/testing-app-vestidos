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
    const optionsText = await this.page.locator('select[name="category"] option').allTextContents();
    const options = optionsText.map((s) => s.trim());

    for (const category of expectedCategories) {
      const found = options.some(opt => opt.toLowerCase() === category.toLowerCase());
      expect(found).toBe(true);
    }
  }

  async assertSizeOptions(expectedSizes: string[]) {
    const optionsText = await this.page.locator('select[name="size"] option').allTextContents();
    const options = optionsText.map((s) => s.trim());

    for (const size of expectedSizes) {
      const found = options.some(opt => opt.toLowerCase() === size.toLowerCase());
      expect(found).toBe(true);
    }
  }

  async assertColorOptions(expectedColor: string[]) {
    const optionsText = await this.page.locator('select[name="color"] option').allTextContents();
    const options = optionsText.map((s) => s.trim());

    for (const color of expectedColor) {
      const found = options.some(opt => opt.toLowerCase() === color.toLowerCase());
      expect(found).toBe(true);
    }
  }

  async assertStyleOptions(expectedStyle: string[]) {
    const optionsText = await this.page.locator('select[name="style"] option').allTextContents();
    const options = optionsText.map((s) => s.trim());

    for (const style of expectedStyle) {
      const found = options.some(opt => opt.toLowerCase() === style.toLowerCase());
      expect(found).toBe(true);
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