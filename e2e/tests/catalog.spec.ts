import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { CatalogPage } from '../pages/catalog-page';

test.describe('Catalog page', () => {

  test('el usuario puede acceder al Catalogo desde el home', async ({ page }) => {
    const home = new HomePage(page);
    const catalog = new CatalogPage(page);

    await home.goto();
    await home.goToBrowse();
    await catalog.assertIsVisible();
  });

  test('la página Browse muestra la barra de navegación', async ({ page }) => {
      const home = new HomePage(page);
      const catalog = new CatalogPage(page);
  
      await home.goto();
      await home.goToBrowse();
      await catalog.assertIsVisible();
      await catalog.assertNavBarVisible();
  });

  test('los filtros están visibles y contienen las opciones correctas', async ({ page }) => {
    const home = new HomePage(page);
    const catalog = new CatalogPage(page);

    await home.goto();
    await home.goToBrowse();
    await catalog.assertIsVisible();

    // Verificar que los filtros existan
    await catalog.assertFilterExists('category');
    await catalog.assertFilterExists('size');
    await catalog.assertFilterExists('color');
    await catalog.assertFilterExists('style');

    // Verificar que el filtro de talles tenga las opciones correctas
    await catalog.assertCategorieOptions(['Dresses', 'Shoes', 'Bags', 'Jackets']);
    await catalog.assertSizeOptions(['XS', 'S', 'M', 'L', 'XL']);
    await catalog.assertColorOptions(['Black','Blue', 'Burgundy', 'Floral', 'Green', 'Gold', 'Red']);
    await catalog.assertStyleOptions(['Black tie', 'Cocktail', 'Daytime', 'Evening']);
  });

});