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

  test('verificar que no se pueda alquilar por más de 30 días un vestido', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    // Fechas dinámicas
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 31); //más de 30 días

    const formatDate = (date: Date) =>
      date.toISOString().split('T')[0];

    // Ir al home y abrir un ítem
    await homePage.goto();
    await homePage.clickFirstItemDetails();

    // Completar formulario con rango inválido
    await itemPage.fillReservationForm({
      name: 'pepito',
      email: 'pepito@gmail.com',
      phone: '099999999',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    await itemPage.submitReservation();

    // Validar regla de negocio
    await itemPage.expectDurationError();

    // Refuerzo: no debería navegar a success
    await expect(page).not.toHaveURL(/success=1/);
  });

  test('debería mostrar el costo del alquiler al seleccionar un rango de fechas', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    //Generar fechas dinámicas
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // mañana

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4); // 4 días de alquiler

    //Formatear a YYYY-MM-DD
    const formatDate = (date: Date) =>
      date.toISOString().split('T')[0];

    await homePage.goto();
    await homePage.clickFirstItemDetails();

    await itemPage.fillReservationForm({
      name: 'pepito',
      email: 'pepito@gmail.com',
      phone: '099999999',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    await itemPage.submitReservation();
    await itemPage.assertRentalSummaryVisible();
  });

  test('no debería permitir enviar el formulario con email inválido', async ({ page }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    // Fechas dinámicas válidas
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);

    const formatDate = (date: Date) =>
      date.toISOString().split('T')[0];

    // Navegar
    await homePage.goto();
    await homePage.clickFirstItemDetails();

    // Completar formulario con email inválido
    await itemPage.fillReservationForm({
      name: 'pepito',
      email: 'pepito@', //inválido
      phone: '099999999',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    // Intentar enviar
    await itemPage.submitReservation();

    // Validación correcta: NO hay redirección por éxito
    await expect(page).not.toHaveURL(/success=1/);

  });

  test('el flujo de alquiler debe completarse en 5 pasos o menos', async ({ page }) => {
    const home = new HomePage(page);
    const item = new ItemPage(page);

    let steps = 0;

    //Fechas dinámicas
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 6);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);

    const formatDate = (date: Date) =>
      date.toISOString().split('T')[0];

    //NO cuenta como paso → acceso al home
    await home.goto();

    //Paso 1: Abrir detalles del primer ítem
    await home.clickFirstItemDetails();
    steps++;

    //Paso 2: Completar formulario
    await item.fillReservationForm({
      name: 'pepito',
      email: 'pepito@gmail.com',
      phone: '099999999',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
    steps++;

    //Paso 3: Enviar solicitud
    await item.submitReservation();
    steps++;

    //Paso 4: Confirmación exitosa
    await expect(page).toHaveURL(/success=1/);
    steps++;

    //Regla UX: 5 pasos o menos
    expect(steps).toBeLessThanOrEqual(5);
  });

});