import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { NewsletterPage } from '../pages/newsletter-page';

test('el usuario puede suscribirse al newsletter desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const newsletter = new NewsletterPage(page);

  await home.goto();
  await home.subscribeToNewsletter('email@gmail');
  await newsletter.assertIsVisible();
});