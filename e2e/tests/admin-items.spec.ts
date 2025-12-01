import { test } from '../fixtures/admin-fixture';
import { expect } from '@playwright/test';

test('crear articulo desde admin', async ({ adminPage, page }) => {
  const newItem = {
    name: 'Vestido Test E2E ' + Date.now(),
    category: 'dress',
    pricePerDay: '45',
    sizes: 'S, M, L',
    color: 'azul',
    style: 'casual',
    description: 'Un vestido de prueba E2E',
    images: '/images/dresses/test.jpg',
    alt: 'Test dress',
    stock: '10'
  };

  await adminPage.assertIsVisible();
  await page.waitForTimeout(1000);

  // Abrir formulario de creación
  await page.getByRole('button', { name: /Agregar Artículo/i }).click();
  await page.waitForTimeout(500);

  // Rellenar el formulario
  await page.fill('#name', newItem.name);
  await page.selectOption('#category', newItem.category);
  await page.fill('#pricePerDay', newItem.pricePerDay);
  await page.fill('#sizes', newItem.sizes);
  await page.fill('#color', newItem.color);
  await page.fill('#style', newItem.style);
  await page.fill('#images', newItem.images);
  await page.fill('#alt', newItem.alt);
  await page.fill('#description', newItem.description);
  await page.fill('#stock', newItem.stock);

  // Enviar formulario
  await page.getByRole('button', { name: /Crear Artículo/i }).click();
  await page.waitForTimeout(1000);

  // Verificar que aparece en la tabla
  await expect(page.getByText(newItem.name)).toBeVisible();
});

test('editar articulo desde admin', async ({ adminPage, page }) => {
  const itemName = 'Vestido para Editar ' + Date.now();
  const updatedName = 'Vestido Editado ' + Date.now();
  
  // Primero crear un artículo
  await adminPage.assertIsVisible();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: /Agregar Artículo/i }).click();
  await page.waitForTimeout(500);

  await page.fill('#name', itemName);
  await page.selectOption('#category', 'dress');
  await page.fill('#pricePerDay', '50');
  await page.fill('#sizes', 'M');
  await page.fill('#color', 'negro');
  await page.fill('#style', 'formal');
  await page.fill('#images', '/images/dresses/edit.jpg');
  await page.fill('#alt', 'edit test');
  await page.fill('#description', 'Description');
  await page.fill('#stock', '5');

  await page.getByRole('button', { name: /Crear Artículo/i }).click();
  await page.waitForTimeout(1000);

  // Ahora editar
  const row = page.locator('tbody tr').filter({ hasText: itemName }).first();
  await row.getByRole('button', { name: /Editar/i }).click();
  await page.waitForTimeout(500);

  // Cambiar nombre y precio
  await page.fill('#name', updatedName);
  await page.fill('#pricePerDay', '75');

  // Actualizar
  await page.getByRole('button', { name: /Actualizar Artículo/i }).click();
  await page.waitForTimeout(1000);

  // Verificar cambios
  await expect(page.getByText(updatedName)).toBeVisible();
  await expect(page.getByText(itemName)).not.toBeVisible();
});

test('eliminar articulo desde admin', async ({ adminPage, page }) => {
  const itemName = 'Vestido para Eliminar ' + Date.now();
  
  // Primero crear un artículo
  await adminPage.assertIsVisible();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: /Agregar Artículo/i }).click();
  await page.waitForTimeout(500);

  await page.fill('#name', itemName);
  await page.selectOption('#category', 'dress');
  await page.fill('#pricePerDay', '60');
  await page.fill('#sizes', 'L');
  await page.fill('#color', 'rojo');
  await page.fill('#style', 'party');
  await page.fill('#images', '/images/dresses/delete.jpg');
  await page.fill('#alt', 'delete test');
  await page.fill('#description', 'To be deleted');
  await page.fill('#stock', '3');

  await page.getByRole('button', { name: /Crear Artículo/i }).click();
  await page.waitForTimeout(1000);

  // Verificar que existe
  await expect(page.getByText(itemName)).toBeVisible();

  // Configurar para aceptar confirm
  await page.evaluate(() => (window.confirm = () => true));

  // Eliminar
  const row = page.locator('tbody tr').filter({ hasText: itemName }).first();
  await row.getByRole('button', { name: /Eliminar/i }).click();
  await page.waitForTimeout(1000);

  // Verificar eliminación
  await expect(page.getByText(itemName)).not.toBeVisible();
});
