import { test } from '../fixtures/admin-fixture';
import { expect } from '@playwright/test';
import { AdminListPage } from '../pages/admin-list-page';
import { AdminFormPage } from '../pages/admin-form-page';

test.describe.serial('CRUD artículos admin', () => {

  test('crear articulo desde admin', async ({ adminPage, page }) => {
    const list = new AdminListPage(page);
    const form = new AdminFormPage(page);

    const newItem = {
      name: 'Vestido Test E2E ' + Date.now(),
      category: 'dress',
      pricePerDay: '45',
      sizes: ['S'],
      color: 'Blue',
      style: 'Daytime',
      description: 'Un vestido de prueba E2E',
      images: '/images/dresses/azulves.png',
      alt: 'Test dress',
      stock: '10'
    };

    await adminPage.assertIsVisible();
    await page.waitForTimeout(500);

    await list.clickAddArticle();
    await page.waitForTimeout(500);

    await form.fillName(newItem.name);
    await form.selectCategory(newItem.category);
    await form.fillPrice(newItem.pricePerDay);
    await form.selectSizes(newItem.sizes);
    await form.selectColor(newItem.color);
    await form.selectStyle(newItem.style);
    await form.fillImages(newItem.images);
    await form.fillAlt(newItem.alt);
    await form.fillDescription(newItem.description);
    await form.fillStock(newItem.stock);

    await form.submitCreate();

    await list.assertRowVisibleByExactName(newItem.name);
  });

  test('editar articulo desde admin', async ({ adminPage, page }) => {
    const list = new AdminListPage(page);
    const form = new AdminFormPage(page);

    const updatedData = {
      name: 'Vestido Editado ' + Date.now(),
      category: 'jacket',
      pricePerDay: '55',
      sizes: ['M', 'L'],
      color: 'Red',
      style: 'Evening',
      description: 'Vestido editado para prueba E2E',
      images: '/images/dresses/editado.png',
      alt: 'Vestido editado',
      stock: '5'
    };

    await adminPage.assertIsVisible();
    await page.waitForTimeout(500);

    const targetRow = list.getRowByNameStartsWith('Vestido Test E2E');
    await expect(targetRow).toBeVisible();

    await targetRow.getByRole('button', { name: /Editar/i }).click();
    await page.waitForTimeout(500);

    await form.fillName(updatedData.name);
    await form.selectCategory(updatedData.category);
    await form.fillPrice(updatedData.pricePerDay);

    const allSizes = ["XS", "S", "M", "L", "XL"];
    await form.selectSizes(updatedData.sizes, allSizes);

    await form.selectColor(updatedData.color);
    await form.selectStyle(updatedData.style);
    await form.fillImages(updatedData.images);
    await form.fillAlt(updatedData.alt);
    await form.fillDescription(updatedData.description);
    await form.fillStock(updatedData.stock);

    await form.submitUpdate();

    await list.assertRowVisibleByExactName(updatedData.name);
  });

  test('eliminar articulo desde admin', async ({ adminPage, page }) => {
    const list = new AdminListPage(page);

    await adminPage.assertIsVisible();

    page.once('dialog', async dialog => { await dialog.accept(); });

    const editedRow = list.getRowByNameStartsWith('Vestido Editado');
    await expect(editedRow).toBeVisible();

    const itemName = await editedRow.locator('td:nth-child(2)').innerText();

    await editedRow.getByRole('button', { name: /Eliminar/i }).click();

    await list.waitRowToDisappear(itemName);
  });

});