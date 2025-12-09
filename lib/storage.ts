import fs from "fs";
import path from "path";
import type { Item, Rental } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ITEMS_FILE = path.join(DATA_DIR, "items.json");
const RENTALS_FILE = path.join(DATA_DIR, "rentals.json");

// Asegurar que el directorio data existe
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Leer items del archivo JSON
export function readItems(): Item[] {
  ensureDataDir();

  if (!fs.existsSync(ITEMS_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(ITEMS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading items file:", error);
    return [];
  }
}

// Escribir items al archivo JSON
export function writeItems(items: Item[]): void {
  ensureDataDir();

  try {
    fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing items file:", error);
  }
}

// Agregar un item
export function addItem(item: Item): void {
  const items = readItems();
  items.push(item);
  writeItems(items);
}

// Actualizar un item
export function updateItemInStorage(id: number, updatedItem: Item): boolean {
  const items = readItems();
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return false;
  }

  items[index] = updatedItem;
  writeItems(items);
  return true;
}

// Eliminar un item
export function deleteItemFromStorage(id: number): boolean {
  const items = readItems();
  const initialLength = items.length;
  const filtered = items.filter((i) => i.id !== id);

  if (filtered.length === initialLength) {
    return false;
  }

  writeItems(filtered);
  return true;
}

// Rentals persistence
export function readRentals(): Rental[] {
  ensureDataDir();

  if (!fs.existsSync(RENTALS_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(RENTALS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading rentals file:", error);
    return [];
  }
}

export function writeRentals(rentals: Rental[]): void {
  ensureDataDir();

  try {
    fs.writeFileSync(RENTALS_FILE, JSON.stringify(rentals, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing rentals file:", error);
  }
}

export function addRental(rental: Rental): void {
  const rentals = readRentals();
  rentals.push(rental);
  writeRentals(rentals);
}

export function updateRentalInStorage(id: string, updated: Rental): boolean {
  const rentals = readRentals();
  const idx = rentals.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  rentals[idx] = updated;
  writeRentals(rentals);
  return true;
}

export function deleteRentalFromStorage(id: string): boolean {
  const rentals = readRentals();
  const initial = rentals.length;
  const filtered = rentals.filter((r) => r.id !== id);
  if (filtered.length === initial) return false;
  writeRentals(filtered);
  return true;
}