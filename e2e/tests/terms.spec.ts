import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TermsPage } from '../pages/terms-page';

test('el usuario puede acceder a Terms desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const terms = new TermsPage(page);

  await home.goto();
  await home.goToTerms();
  await terms.assertIsVisible();
});