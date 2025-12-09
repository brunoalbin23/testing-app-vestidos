import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AdminDashboardPage } from '../pages/admin-dashboard-page';

export const test = base.extend<{
  adminPage: AdminDashboardPage;
}>({
  adminPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboard = new AdminDashboardPage(page);

    // Login antes de entregar el dashboard
    await loginPage.loginAsAdmin('admin', 'RompoTodo');

    // Entregar el dashboard al test
    await use(dashboard);
  },
});
