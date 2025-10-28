import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ContactPage } from '../pages/contact-page';

test('el usuario puede acceder a Contact desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const contact = new ContactPage(page);

  await home.goto();
  await home.goToContact();
  await contact.assertIsVisible();
});