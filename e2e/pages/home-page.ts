import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly howItWorksSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.howItWorksSection = page.getByRole('heading', { name: /how it works/i });
  }

  async goto() {
    await this.page.goto('http://localhost:3000/');
  }

  async goToAdminLogin() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }

  async goToFaq() {
    await this.page.getByRole('link', { name: 'FAQ' }).click();
  }

  async goToTerms() {
    await this.page.getByRole('link', { name: 'Terms' }).click();
  }

  async goToPrivacy() {
    await this.page.getByRole('link', { name: 'Privacy' }).click();
  }

  async goToContact() {
    await this.page.getByRole('link', { name: 'Contact' }).click();
  }

  async subscribeToNewsletter(email: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Subscribe' }).click();
  }

  async clickBecomeLender() {
    await this.page.getByRole('link', { name: 'Become a lender' }).click();
  }

  async goToBrowse() {
    await this.page.getByRole('link', { name: 'Browse', exact: true }).click();
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

  async assertHowItWorksVisible() {
    await expect(this.howItWorksSection).toBeVisible();

    const howItWorksContainer = this.page.locator('section:has(h2:has-text("How it works"))');

    // Buscar solo los cards que contienen un heading de paso (Browse, Rent, Return)
    const cards = howItWorksContainer.locator('div.grid div.rounded-2xl.border:has(h3)');
    await expect(cards).toHaveCount(3);

    const titles = ['Browse', 'Rent', 'Return'];
    for (const title of titles) {
      await expect(howItWorksContainer.getByRole('heading', { name: new RegExp(title, 'i') })).toBeVisible();
    }

    await expect(howItWorksContainer.getByText(/catálogo completo/i)).toBeVisible();
    await expect(howItWorksContainer.getByText(/Seleccioná las fechas/i)).toBeVisible();
    await expect(howItWorksContainer.getByText(/Devuelve la prenda/i)).toBeVisible();
  }

}
