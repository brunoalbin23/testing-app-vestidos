import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

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
}