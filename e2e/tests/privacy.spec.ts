import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { PrivacyPage } from '../pages/privacy-page';

test('el usuario puede acceder a Privacy desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const privacy = new PrivacyPage(page);

  await home.goto();
  await home.goToPrivacy();
  await privacy.assertIsVisible();
});