import { test } from '@playwright/test';
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

    await itemPage.submitReservation();

    // Validar que aparezca el mensaje de error
    await itemPage.expectDurationError();
  });
});