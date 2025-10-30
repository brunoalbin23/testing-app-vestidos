/**
 * @deprecated This file is kept for backward compatibility.
 * Please import directly from:
 * - types: from "./types"
 * - Items functions: from "./items-service"
 * - Rentals functions: from "./rentals-service"
 */

// Re-export types
export type { Category, Item, Rental } from "./types";

// Re-export items functions
export { listItems, getItem, getItemRentals } from "./items-service";

// Re-export rentals functions
export {
  hasOverlap,
  isItemAvailable,
  createRental,
  listRentals,
  cancelRental,
} from "./rentals-service";
