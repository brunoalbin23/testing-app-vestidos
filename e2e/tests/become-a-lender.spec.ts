import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { BecomeALenderPage } from '../pages/becomeALender-page';

test('el usuario puede acceder a la página Become a Lender desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const lenderPage = new BecomeALenderPage(page);

  await home.goto();
  await home.clickBecomeLender();
  await lenderPage.assertIsVisible();
});