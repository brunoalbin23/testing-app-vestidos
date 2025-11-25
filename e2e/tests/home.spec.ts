import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';

test.describe('Home page', () => {
  test('debería mostrar la barra de navegación', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.assertNavBarVisible();
  });

  test('debería mostrar una sección "How it works" descriptiva con 3 pasos', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.assertHowItWorksVisible();
  });

  test('los recuadros de precio mantienen proporciones correctas', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.assertPriceBoxProportionate();
  });

  test('el home debería sanitizar inputs para evitar XSS', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    const payload = await home.attemptXSSInjection();

    await home.assertHomeSafeFromXSS(payload);
  });
});
