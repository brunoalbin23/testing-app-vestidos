import { expect, Locator, Page } from '@playwright/test';

export class ItemPage {
  readonly page: Page;
  readonly nextMonthButton: Locator;
  readonly prevMonthButton: Locator;
  readonly monthHeader: Locator;
  readonly calendarDays: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;

  // 🆕 NUEVOS LOCATORS PARA FECHAS
  readonly bookedDays: Locator;
  readonly availableDays: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextMonthButton = page.getByRole('button', { name: 'Next month' });
    this.prevMonthButton = page.getByRole('button', { name: 'Previous month' });
    this.monthHeader = page.locator('h3.text-base.font-semibold');
    this.calendarDays = page.locator('.grid.grid-cols-7.gap-1 div[title]');
    this.startDateInput = page.getByRole('textbox', { name: 'Start date' });
    this.endDateInput = page.getByRole('textbox', { name: 'End date' });

    // bookedDays: aquellos que tengan data attribute (si en el futuro se agrega)
    this.bookedDays = page.locator('div[title][data-is-booked="true"]');

    // availableDays: todos los días válidos del calendario
    this.availableDays = page.locator('div[title]');
  }

  async verifyCalendarVisible() {
    await expect(this.calendarDays.first()).toBeVisible();
    const count = await this.calendarDays.count();
    expect(count).toBeGreaterThan(0);
  }

  async goToNextMonth(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.nextMonthButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  async getCurrentMonthText(): Promise<string> {
    const text = await this.monthHeader.textContent();
    if (!text) {
      throw new Error('No se pudo obtener el texto del mes actual en el calendario.');
    }
    return text.trim();
  }

  async verifyMonthChanged(initialMonth: string) {
    const currentMonth = await this.getCurrentMonthText();
    expect(currentMonth).not.toEqual(initialMonth);
  }

  async fillReservationForm({
    name,
    email,
    phone,
    startDate,
    endDate,
  }: {
    name: string;
    email: string;
    phone: string;
    startDate: string;
    endDate: string;
  }) {
    await this.page.getByRole('textbox', { name: 'Full name' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Phone' }).fill(phone);
    await this.page.getByRole('textbox', { name: 'Start date' }).fill(startDate);
    await this.page.getByRole('textbox', { name: 'End date' }).fill(endDate);
  }

  async submitReservation() {
    await this.page.getByRole('button', { name: 'Request rental' }).click();
  }

  async expectDurationError() {
    const errorText = this.page.getByText('Rental duration cannot exceed');
    await expect(errorText).toBeVisible();
  }

  async assertRentalSummaryVisible() {
    const summary = this.page.locator('p', { hasText: 'Rental period' });

    await expect(summary).toBeVisible({ timeout: 10000 });
    await expect(this.page.getByText(/Total amount/i)).toBeVisible();
    await expect(this.page.getByText(/\$\d+\.\d{2}/)).toBeVisible();
  }
}