import { test, expect } from '@playwright/test';
import { AdminDashboardPage } from '../pages/admin-dashboard-page';
import { HomePage } from '../pages/home-page';

const test_admin = test.extend({
  adminPage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = (await import('../pages/login-page')).LoginPage;
    const dashboard = new AdminDashboardPage(page);

    // Login
    await homePage.goto();
    const lp = new loginPage(page);
    await lp.loginAsAdmin('admin', 'admin123');

    await use(dashboard);
  },
});

test('crear articulo desde admin', async ({ adminPage, page }) => {
  // Mock responses: POST to create, GET to list
  const newItem = {
    id: 9999,
    name: 'Test Item E2E',
    category: 'dress',
    pricePerDay: 42,
    sizes: ['S','M'],
    color: 'testcolor',
    style: 'test-style',
    description: 'Descripción test',
    images: ['/images/dresses/test.jpg'],
    alt: 'Alt test',
    stock: 5
  };

  await page.route('**/api/admin/items', (route, request) => {
    if (request.method() === 'POST') {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ item: newItem }) });
    } else {
      // GET
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [newItem] }) });
    }
  });

  await adminPage.assertIsVisible();

  // Abrir formulario de creación
  await page.getByRole('button', { name: /Agregar Artículo/i }).click();

  // Rellenar el formulario
  await page.fill('#name', newItem.name);
  await page.selectOption('#category', newItem.category);
  await page.fill('#pricePerDay', String(newItem.pricePerDay));
  await page.fill('#sizes', newItem.sizes.join(', '));
  await page.fill('#color', newItem.color);
  await page.fill('#images', newItem.images.join(', '));
  await page.fill('#alt', newItem.alt);
  await page.fill('#description', newItem.description);
  await page.fill('#stock', String(newItem.stock));

  // Enviar
  await Promise.all([
    page.waitForResponse('**/api/admin/items'),
    page.getByRole('button', { name: /Crear Artículo/i }).click(),
  ]);

  // Ahora el listado debería mostrar el item
  await expect(page.getByText(newItem.name)).toBeVisible();
});

test('editar articulo desde admin', async ({ adminPage, page }) => {
  const existing = {
    id: 1001,
    name: 'Item to Edit',
    category: 'dress',
    pricePerDay: 10,
    sizes: ['S'],
    color: 'black',
    style: 'evening',
    description: 'old',
    images: ['/images/dresses/old.jpg'],
    alt: 'old alt',
    stock: 2
  };

  const updated = { ...existing, name: 'Item Edited E2E', pricePerDay: 12 };

  // GET initial items
  await page.route('**/api/admin/items', (route, request) => {
    if (request.method() === 'GET') {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [existing] }) });
    } else {
      route.continue();
    }
  });

  await adminPage.assertIsVisible();

  // Ensure table shows existing
  await expect(page.getByText(existing.name)).toBeVisible();

  // Click Editar on that row
  const row = page.locator('tbody tr').filter({ hasText: existing.name }).first();
  await row.getByRole('button', { name: /Editar/i }).click();

  // Intercept PUT and subsequent GET
  await page.route(`**/api/admin/items/${existing.id}`, (route, request) => {
    if (request.method() === 'PUT') {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ item: updated }) });
    } else {
      route.continue();
    }
  });
  await page.route('**/api/admin/items', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [updated] }) });
  });

  // Update fields
  await page.fill('#name', updated.name);
  await page.fill('#pricePerDay', String(updated.pricePerDay));

  // Submit
  await Promise.all([
    page.waitForResponse(`**/api/admin/items/${existing.id}`),
    page.getByRole('button', { name: /Actualizar Artículo/i }).click(),
  ]);

  await expect(page.getByText(updated.name)).toBeVisible();
});

test('eliminar articulo desde admin', async ({ adminPage, page }) => {
  const itemToDelete = {
    id: 2002,
    name: 'Item To Delete',
    category: 'dress',
    pricePerDay: 20,
    sizes: ['M'],
    color: 'red',
    images: ['/images/dresses/del.jpg'],
    alt: 'del',
  };

  await page.route('**/api/admin/items', (route, request) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [itemToDelete] }) });
  });

  await adminPage.assertIsVisible();
  await expect(page.getByText(itemToDelete.name)).toBeVisible();

  // Accept confirm dialogs
  await page.evaluate(() => (window.confirm = () => true));

  // Intercept delete and subsequent get
  await page.route(`**/api/admin/items/${itemToDelete.id}`, (route, request) => {
    if (request.method() === 'DELETE') {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    } else {
      route.continue();
    }
  });
  await page.route('**/api/admin/items', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [] }) });
  });

  const row = page.locator('tbody tr').filter({ hasText: itemToDelete.name }).first();
  await row.getByRole('button', { name: /Eliminar/i }).click();

  // After deletion, item should not be visible
  await expect(page.getByText(itemToDelete.name)).toHaveCount(0);
});
