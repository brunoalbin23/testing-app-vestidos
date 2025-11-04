import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TermsPage } from '../pages/terms-page';

test.describe('Terms page', () => {

  test('el usuario puede acceder a Terms desde el home', async ({ page }) => {
    const home = new HomePage(page);
    const terms = new TermsPage(page);

    await home.goto();
    await home.goToTerms();
    await terms.assertIsVisible();
  });

  test('la página Terms muestra la barra de navegación', async ({ page }) => {
    const home = new HomePage(page);
    const terms = new TermsPage(page);

    await home.goto();
    await home.goToTerms();
    await terms.assertIsVisible();
    await terms.assertNavBarVisible();
  });

  test('el usuario puede volver al home desde el botón inferior de Terms', async ({ page }) => {
    const home = new HomePage(page);
    const terms = new TermsPage(page);

    await home.goto();
    await home.goToTerms();
    await terms.assertIsVisible();

    // Volver al Home
    await terms.goBackHome();

    // Validar que se volvió al home
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Terms' })).toBeVisible();
  });

});
