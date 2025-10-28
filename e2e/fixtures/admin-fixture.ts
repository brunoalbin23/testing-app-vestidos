import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { AdminDashboardPage } from '../pages/admin-dashboard-page';

export const test = base.extend<{
  adminPage: AdminDashboardPage;
}>({
  adminPage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboard = new AdminDashboardPage(page);

    // Login antes de entregar el dashboard
    await homePage.goto();
    await homePage.goToAdminLogin();
    await loginPage.loginAsAdmin('admin', 'admin123');

    // Entregar el dashboard al test
    await use(dashboard);
  },
});
