import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { BecomeALenderPage } from '../pages/becomeALender-page';

test.describe('Become a Lender page', () => {

  test('el usuario puede acceder a la página Become a Lender desde el home', async ({ page }) => {
    const home = new HomePage(page);
    const lenderPage = new BecomeALenderPage(page);

    await home.goto();
    await home.clickBecomeLender();
    await lenderPage.assertIsVisible();
  });

  test('la página Become a Lender muestra la barra de navegación', async ({ page }) => {
    const home = new HomePage(page);
    const lenderPage = new BecomeALenderPage(page);

    await home.goto();
    await home.clickBecomeLender();
    await lenderPage.assertIsVisible();
    await lenderPage.assertNavBarVisible();
  });

  test('el usuario puede volver al home desde el botón inferior de Become a Lender', async ({ page }) => {
    const home = new HomePage(page);
    const lenderPage = new BecomeALenderPage(page);

    await home.goto();
    await home.clickBecomeLender();
    await lenderPage.assertIsVisible();

    // Volver al Home
    await lenderPage.goBackHome();

    // Validar que se volvió al home
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Become a lender' })).toBeVisible();
  });

});
