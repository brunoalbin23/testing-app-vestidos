import type { Item, Rental, Category } from "./types";
import * as itemsService from "./items-service";
import * as rentalsService from "./rentals-service";

/**
 * Servicio de validación para datos de items
 */
export function validateItemData(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push("Name is required and must be a non-empty string");
  }

  const validCategories: Category[] = ["dress", "shoes", "bag", "jacket"];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push(`Category must be one of: ${validCategories.join(", ")}`);
  }

  if (!data.pricePerDay || typeof data.pricePerDay !== "number" || data.pricePerDay <= 0) {
    errors.push("Price per day must be a positive number");
  }

  if (!Array.isArray(data.sizes) || data.sizes.length === 0) {
    errors.push("At least one size is required");
  }

  if (!data.color || typeof data.color !== "string" || data.color.trim().length === 0) {
    errors.push("Color is required");
  }

  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    errors.push("Description is required");
  }

  if (!Array.isArray(data.images) || data.images.length === 0) {
    errors.push("At least one image is required");
  }

  if (!data.alt || typeof data.alt !== "string" || data.alt.trim().length === 0) {
    errors.push("Alt text is required");
  }

  if (data.stock !== undefined && (typeof data.stock !== "number" || data.stock < 0)) {
    errors.push("Stock must be a non-negative number");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Valida datos de alquiler
 */
export function validateRentalData(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.itemId || typeof data.itemId !== "number") {
    errors.push("Item ID must be a valid number");
  }

  if (!data.start || !/^\d{4}-\d{2}-\d{2}$/.test(data.start)) {
    errors.push("Start date must be in format YYYY-MM-DD");
  }

  if (!data.end || !/^\d{4}-\d{2}-\d{2}$/.test(data.end)) {
    errors.push("End date must be in format YYYY-MM-DD");
  }

  if (data.start && data.end && data.start >= data.end) {
    errors.push("End date must be after start date");
  }

  if (!data.customer || typeof data.customer !== "object") {
    errors.push("Customer information is required");
  }

  if (!data.customer?.name || typeof data.customer.name !== "string") {
    errors.push("Customer name is required");
  }

  if (!data.customer?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customer.email)) {
    errors.push("Valid customer email is required");
  }

  if (!data.customer?.phone || typeof data.customer.phone !== "string") {
    errors.push("Customer phone is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Obtiene todas las estadísticas del sistema
 */
export function getSystemStats() {
  const items = itemsService.listItems();
  const rentals = rentalsService.listRentals();

  const activeRentals = rentals.filter(r => r.status === "active");
  const canceledRentals = rentals.filter(r => r.status === "canceled");

  let totalRevenue = 0;
  activeRentals.forEach(rental => {
    const item = itemsService.getItem(rental.itemId);
    if (item) {
      const start = new Date(rental.start);
      const end = new Date(rental.end);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      totalRevenue += days * item.pricePerDay;
    }
  });

  return {
    totalItems: items.length,
    totalRentals: rentals.length,
    activeRentals: activeRentals.length,
    canceledRentals: canceledRentals.length,
    totalRevenue,
    averageRentalDuration: activeRentals.length > 0
      ? Math.round(
          activeRentals.reduce((sum, r) => {
            const start = new Date(r.start);
            const end = new Date(r.end);
            return sum + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          }, 0) / activeRentals.length
        )
      : 0,
  };
}

/**
 * Obtiene items con información de uso
 */
export function getItemsWithUsageStats() {
  const items = itemsService.listItems();
  return items.map(item => {
    const rentals = itemsService.getItemRentals(item.id);
    const totalRentals = rentalsService.listRentals().filter(r => r.itemId === item.id);
    
    let totalRevenue = 0;
    totalRentals.forEach(rental => {
      if (rental.status === "active") {
        const start = new Date(rental.start);
        const end = new Date(rental.end);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        totalRevenue += days * item.pricePerDay;
      }
    });

    return {
      ...item,
      currentBookings: rentals.length,
      totalRentals: totalRentals.length,
      totalRevenue,
      utilizationRate: totalRentals.length > 0
        ? Math.round((totalRentals.filter(r => r.status === "active").length / totalRentals.length) * 100)
        : 0,
    };
  });
}

/**
 * Exporta datos para backup
 */
export function exportData() {
  return {
    items: itemsService.listItems(),
    rentals: rentalsService.listRentals(),
    exportDate: new Date().toISOString(),
  };
}
