import { test, expect } from '@playwright/test';
test.describe('Página de Inicio', () => { test('debe mostrar el encabezado principal', async ({ page }) => { await page.goto('/');
});
test('debe navegar a la página de búsqueda', async ({ page }) => { await page.goto('/');
await page.getByRole('link', { name: /Explorar/i }).click();

await expect(page).toHaveURL('/search');
}); });