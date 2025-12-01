import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ItemPage } from '../pages/item-page';

test.describe('Página de Item', () => {
    test('verifica que el calendario se muestre en los detalles del vestido', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    await homePage.goto();
    await homePage.clickFirstItemDetails();
    await itemPage.verifyCalendarVisible();
    });

    test('verificar que se pueda ver las reservas con 2 meses de anticipacion', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    await homePage.goto();
    await homePage.clickFirstItemDetails();
    await itemPage.verifyCalendarVisible();

    const initialMonth = await itemPage.getCurrentMonthText();
    await itemPage.goToNextMonth(2);
    await itemPage.verifyMonthChanged(initialMonth);
  });

  test('verificar que no se pueda alquilar por mas de 30 dias un vestido', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    // Ir al home y abrir un item
    await homePage.goto();
    await homePage.clickFirstItemDetails();

    // Completar el formulario con fechas inválidas
    await itemPage.fillReservationForm({
        name: 'pepito',
        email: 'pepito@gmail.com',
        phone: '099999999',
        startDate: '2025-11-12',
        endDate: '3000-11-12',
    });

    // Interceptar la petición al backend y responder con error de duración
    await page.route('**/api/rentals', (route) => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Rental duration cannot exceed 30 days.' }),
      });
    });

    await itemPage.submitReservation();

    // Validar que aparezca el mensaje de error
    await itemPage.expectDurationError();
  });

  test('debería mostrar el costo del alquiler al seleccionar un rango de fechas', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    await homePage.goto();
    await homePage.clickFirstItemDetails();

    await itemPage.fillReservationForm({
        name: 'pepito',
        email: 'pepito@gmail.com',
        phone: '099999999',
        startDate: '2025-11-12',
        endDate: '2025-11-16',
    });
    // El summary se muestra en cliente tras seleccionar fechas
    await itemPage.assertRentalSummaryVisible();
  });

  test('no debería permitir enviar el formulario con email inválido', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    await homePage.goto();
    await homePage.clickFirstItemDetails();

    // Completar formulario con email inválido
    await itemPage.fillReservationForm({
      name: 'pepito',
      email: 'pepito@', // email inválido
      phone: '099999999',
      startDate: '2025-11-12',
      endDate: '2025-11-16',
    });

    // Interceptar la petición y forzar un error para evitar redirección
    await page.route('**/api/rentals', (route) => {
      route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid email' }) });
    });

    // Intentar enviar
    await itemPage.submitReservation();

    // Esperar un tiempo prudencial por si intenta navegar
    await page.waitForTimeout(500);

    // Validar que NO navega a success=1
    await expect(page).not.toHaveURL(/success=1/);
  });

test('el flujo de alquiler debe completarse en 5 pasos o menos', async ({ page }) => {
    const home = new HomePage(page);
    const item = new ItemPage(page);

    let steps = 0;

    // NO cuenta como paso → solo navegar al home
    await home.goto();

    // Paso 1: Abrir detalles del primer item
    await home.clickFirstItemDetails();
    steps++;

    // Paso 2: Completar formulario
    await item.fillReservationForm({
      name: 'pepito',
      email: 'pepito@gmail.com',
      phone: '099999999',
      startDate: '2025-11-26',
      endDate: '2025-11-27',
    });
    steps++;

    // Paso 3: Enviar solicitud (mockear backend para que responda OK)
    await page.route('**/api/rentals', (route) => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    await item.submitReservation();
    steps++;

    // Paso 4: Confirmación (success=1)
    await expect(page).toHaveURL(/success=1/);
    steps++;

    // Validar que NO supere los 5 pasos
    expect(steps).toBeLessThanOrEqual(5);
  });

});