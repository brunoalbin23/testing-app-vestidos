// pages/AdminFormPage.ts
import { Page } from '@playwright/test';

export class AdminFormPage {
  constructor(private page: Page) {}

  async fillName(value: string) {
    await this.page.fill('#name', value);
  }

  async selectCategory(value: string) {
    await this.page.selectOption('#category', value);
  }

  async fillPrice(value: string) {
    await this.page.fill('#pricePerDay', value);
  }

  async selectSizes(sizes: string[], allSizes?: string[]) {

    // Si pasan allSizes significa que es edición (uncheck los demás)
    if (allSizes) {
      for (const size of allSizes) {
        const checkbox = this.page.getByRole('checkbox', { name: size, exact: true });
        if (sizes.includes(size)) await checkbox.check();
        else await checkbox.uncheck();
      }
      return;
    }

    // Si NO pasan allSizes → es creación (solo check los indicados)
    for (const size of sizes) {
      await this.page.getByRole('checkbox', { name: size, exact: true }).check();
    }
  }

  async selectColor(value: string) {
    await this.page.selectOption('#color', value);
  }

  async selectStyle(value: string) {
    await this.page.selectOption('#style', value);
  }

  async fillImages(path: string) {
    await this.page.fill('#images', path);
  }

  async fillAlt(text: string) {
    await this.page.fill('#alt', text);
  }

  async fillDescription(text: string) {
    await this.page.fill('#description', text);
  }

  async fillStock(value: string) {
    await this.page.fill('#stock', value);
  }

  async submitCreate() {
    await this.page.getByRole('button', { name: /Crear Artículo/i }).click();
  }

  async submitUpdate() {
    await this.page.getByRole('button', { name: /Actualizar Artículo/i }).click();
  }
}
