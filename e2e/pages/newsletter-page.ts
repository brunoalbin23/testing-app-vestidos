import { Page, expect } from '@playwright/test';

export class NewsletterPage {
  constructor(private page: Page) {}

  async assertIsVisible() {
    // Asumimos que después de suscribirse se redirige a /api/newsletter
    await expect(this.page).toHaveURL('http://localhost:3000/api/newsletter');
    // Si hay algún mensaje de confirmación visible, se puede chequear también:
    await expect(this.page.getByText(/thank you for subscribing/i)).toBeVisible();
  }
}