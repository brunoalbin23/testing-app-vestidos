import { test } from '../fixtures/admin-fixture';

test('admin puede ver el dashboard y desloguearse', async ({ adminPage }) => {
  await adminPage.assertIsVisible();
  await adminPage.logout();
});
