import { test } from '../fixtures/admin-fixture';
import { expect } from '@playwright/test';

test.describe.serial('CRUD artículos admin', () => {

  test('crear articulo desde admin', async ({ adminPage, page }) => {
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

    await page.getByRole('button', { name: /Agregar Artículo/i }).click();
    await page.waitForTimeout(500);

    await page.fill('#name', newItem.name);
    await page.selectOption('#category', newItem.category);
    await page.fill('#pricePerDay', newItem.pricePerDay);

    for (const size of newItem.sizes) {
      await page.getByRole('checkbox', { name: size, exact: true }).check();
    }

    await page.selectOption('#color', newItem.color);
    await page.selectOption('#style', newItem.style);

    await page.fill('#images', newItem.images);
    await page.fill('#alt', newItem.alt);
    await page.fill('#description', newItem.description);
    await page.fill('#stock', newItem.stock);

    await page.getByRole('button', { name: /Crear Artículo/i }).click();

    await page.waitForSelector(`tbody tr:has-text("${newItem.name}")`, { timeout: 5000 });
    await expect(page.getByText(newItem.name)).toBeVisible();
  });

  test('editar articulo desde admin', async ({ adminPage, page }) => {
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

    const targetRow = page.locator('tbody tr', {
      has: page.locator('td', { hasText: /^Vestido Test E2E/ })
    }).first();

    await expect(targetRow).toBeVisible();
    await targetRow.getByRole('button', { name: /Editar/i }).click();
    await page.waitForTimeout(500);

    await page.fill('#name', updatedData.name);
    await page.selectOption('#category', updatedData.category);
    await page.fill('#pricePerDay', updatedData.pricePerDay);

    const allSizes = ["XS", "S", "M", "L", "XL"];
    for (const size of allSizes) {
      const checkbox = page.getByRole('checkbox', { name: size, exact: true });
      if (updatedData.sizes.includes(size)) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    }

    await page.selectOption('#color', updatedData.color);
    await page.selectOption('#style', updatedData.style);

    await page.fill('#images', updatedData.images);
    await page.fill('#alt', updatedData.alt);
    await page.fill('#description', updatedData.description);
    await page.fill('#stock', updatedData.stock);

    await page.getByRole('button', { name: /Actualizar Artículo/i }).click();

    await page.waitForSelector(`tbody tr:has-text("${updatedData.name}")`, { timeout: 5000 });
    await expect(page.getByText(updatedData.name)).toBeVisible();
  });

  test('eliminar articulo desde admin', async ({ adminPage, page }) => {
    await adminPage.assertIsVisible();

    // Listener global PARA ESTE TEST: si aparece un popup → aceptar
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    // Buscar la fila del artículo editado
    const editedRow = page.locator('tbody tr', {
      has: page.locator('td', { hasText: /^Vestido Editado/ })
    }).first();

    await expect(editedRow).toBeVisible();

    // Obtener el nombre exacto del artículo (para verificar luego)
    const itemName = await editedRow.locator('td:nth-child(2)').innerText();

    // Hacer click en "Eliminar"
    await editedRow.getByRole('button', { name: /Eliminar/i }).click();

    // 🔥 Como estamos usando popup (dialog), NO usamos el botón Confirmar.
    // El listener already aceptó el popup.

    // Esperar a que desaparezca de la tabla
    await expect(page.locator(`tbody tr:has-text("${itemName}")`)).toHaveCount(0);
  });
  
});
