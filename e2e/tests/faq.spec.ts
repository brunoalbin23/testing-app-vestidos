import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { FaqPage } from '../pages/faq-page';

test.describe('FAQ page', () => {

  test('el usuario puede acceder a FAQ desde el home', async ({ page }) => {
    const home = new HomePage(page);
    const faq = new FaqPage(page);

    await home.goto();
    await home.goToFaq();
    await faq.assertIsVisible();
  });

  test('el usuario puede volver al home desde FAQ', async ({ page }) => {
    const home = new HomePage(page);
    const faq = new FaqPage(page);

    // Ir a FAQ
    await home.goto();
    await home.goToFaq();
    await faq.assertIsVisible();

    // Volver al Home
    await faq.goBackHome();

    // Validar que estamos en Home
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible();
  });

  test('la página FAQ muestra la barra de navegación', async ({ page }) => {
    const home = new HomePage(page);
    const faq = new FaqPage(page);

    await home.goto();
    await home.goToFaq();
    await faq.assertIsVisible();
    await faq.assertNavBarVisible();
  });

});
