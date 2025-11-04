import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ContactPage } from '../pages/contact-page';

test.describe('Contact page', () => {

  test('el usuario puede acceder a Contact desde el home', async ({ page }) => {
    const home = new HomePage(page);
    const contact = new ContactPage(page);

    await home.goto();
    await home.goToContact();
    await contact.assertIsVisible();
  });

  test('la página Contact muestra la barra de navegación', async ({ page }) => {
    const home = new HomePage(page);
    const contact = new ContactPage(page);

    await home.goto();
    await home.goToContact();
    await contact.assertIsVisible();
    await contact.assertNavBarVisible();
  });

  test('el usuario puede volver al home desde el botón inferior de Contact', async ({ page }) => {
    const home = new HomePage(page);
    const contact = new ContactPage(page);

    await home.goto();
    await home.goToContact();
    await contact.assertIsVisible();

    // Volver al Home
    await contact.goBackHome();

    // Validar que se volvió al home
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

});
