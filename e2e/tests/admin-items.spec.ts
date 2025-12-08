import { test } from '../fixtures/admin-fixture';
import { expect } from '@playwright/test';

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

  // Tallas
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

  // Esperar que aparezca en la tabla
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

  // Abrir el formulario de edición del primer artículo de la tabla
  await page.getByRole('button', { name: /Editar/i }).first().click();
  await page.waitForTimeout(500);

  // Rellenar formulario con nuevos datos
  await page.fill('#name', updatedData.name);
  await page.selectOption('#category', updatedData.category);
  await page.fill('#pricePerDay', updatedData.pricePerDay);

  // Tallas
  const allSizes = ["XS","S","M","L","XL"];
  for (const size of allSizes) {
    const checkbox = page.locator(`input[type="checkbox"]`, { hasText: size });
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

  // Verificar que se actualizó en la tabla
  await page.waitForSelector(`tbody tr:has-text("${updatedData.name}")`, { timeout: 5000 });
  await expect(page.getByText(updatedData.name)).toBeVisible();
});


test('eliminar articulo desde admin', async ({ adminPage, page }) => {
  await adminPage.assertIsVisible();
  await page.waitForTimeout(500);

  // Tomamos el primer artículo de la tabla
  const firstRow = page.locator('tbody tr').first();
  const itemName = await firstRow.locator('td').first().textContent();

  // Click en eliminar
  await firstRow.getByRole('button', { name: /Eliminar/i }).click();

  // Confirmar diálogo de eliminación si hay
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // Esperar que desaparezca de la tabla
  await page.waitForSelector(`tbody tr:has-text("${itemName}")`, { state: 'detached', timeout: 5000 });
  await expect(page.locator(`tbody tr:has-text("${itemName}")`)).toHaveCount(0);
});