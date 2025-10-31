export type { Category, Item, Rental } from "./types";

export { 
  listItems, 
  getItem, 
  getItemRentals, 
  getAvailableSizes, 
  getAvailableColors, 
  getAvailableStyles,
  createItem,
  updateItem,
  deleteItem,
  updateItemStock
} from "./items-service";

export {
  hasOverlap,
  isItemAvailable,
  createRental,
  listRentals,
  cancelRental,
} from "./rentals-service";
