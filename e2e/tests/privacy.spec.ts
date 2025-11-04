import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { PrivacyPage } from '../pages/privacy-page';

test.describe('Privacy page', () => {

  test('el usuario puede acceder a Privacy desde el home', async ({ page }) => {
    const home = new HomePage(page);
    const privacy = new PrivacyPage(page);

    await home.goto();
    await home.goToPrivacy();
    await privacy.assertIsVisible();
  });

  test('la página Privacy muestra la barra de navegación', async ({ page }) => {
    const home = new HomePage(page);
    const privacy = new PrivacyPage(page);

    await home.goto();
    await home.goToPrivacy();
    await privacy.assertIsVisible();
    await privacy.assertNavBarVisible();
  });

  test('el usuario puede volver al home desde el botón inferior de Privacy', async ({ page }) => {
    const home = new HomePage(page);
    const privacy = new PrivacyPage(page);

    await home.goto();
    await home.goToPrivacy();
    await privacy.assertIsVisible();

    // Volver al Home
    await privacy.goBackHome();

    // Validar que se volvió al home
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible();
  });

});
