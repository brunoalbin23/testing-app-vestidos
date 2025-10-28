import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { FaqPage } from '../pages/faq-page';

test('el usuario puede acceder a FAQ desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const faq = new FaqPage(page);

  await home.goto();
  await home.goToFaq();
  await faq.assertIsVisible();
});