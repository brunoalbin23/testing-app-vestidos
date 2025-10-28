import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { CatalogPage } from '../pages/catalog-page';

test('el usuario puede acceder al Catalogo desde el home', async ({ page }) => {
  const home = new HomePage(page);
  const catalog = new CatalogPage(page);

  await home.goto();
  await home.goToBrowse();
  await catalog.assertIsVisible();
});