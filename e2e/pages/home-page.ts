import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly howItWorksSection: Locator;
  readonly featuredSection: Locator;
  readonly productCards: Locator;
  readonly priceTags: Locator;;
  readonly firstItemDetailsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.howItWorksSection = page.getByRole('heading', { name: /how it works/i });
    this.featuredSection = page.locator('section#featured');
    this.productCards = this.featuredSection.locator('div.group.rounded-2xl');
    this.priceTags = this.featuredSection.locator('div.absolute.bottom-3.left-3 > span');
    this.firstItemDetailsButton = page.getByRole('link', { name: 'View details' }).first();
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

  async assertPriceBoxProportionate() {
    const productCount = await this.productCards.count();
    expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {
      const product = this.productCards.nth(i);
      const priceTag = product.locator('div.absolute.bottom-3.left-3 > span');

      const productBox = await product.boundingBox();
      const priceBox = await priceTag.boundingBox();

      if (productBox && priceBox) {
        const heightRatio = priceBox.height / productBox.height;
        const aspectRatio = priceBox.height / priceBox.width;

        //No debe ocupar más del 30% del alto del producto
        expect(heightRatio, `El recuadro del precio del producto #${i + 1} ocupa demasiado espacio (${(heightRatio * 100).toFixed(1)}%)`)
          .toBeLessThanOrEqual(0.3);

        //No debe estar deformado verticalmente (más alto que ancho * 2)
        expect(aspectRatio, `El recuadro del precio del producto #${i + 1} está deformado (aspect ratio = ${aspectRatio.toFixed(2)})`)
          .toBeLessThanOrEqual(2);
      } else {
        throw new Error(`No se pudo obtener el tamaño del recuadro del producto #${i + 1}`);
      }
    }
  }

  async clickFirstItemDetails() {
    await this.firstItemDetailsButton.click();
  }
}
