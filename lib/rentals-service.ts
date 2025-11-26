import type { Rental } from "./types";
import { readRentals, addRental, updateRentalInStorage, deleteRentalFromStorage } from "./storage";

export function getItemRentals(itemId: number) {
  const rentals = readRentals();
  return rentals.filter((r) => r.itemId === itemId && r.status === "active");
}

export function hasOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return !(aEnd < bStart || bEnd < aStart);
}

export function isItemAvailable(itemId: number, start: string, end: string) {
  const rs = getItemRentals(itemId);
  return rs.every((r) => !hasOverlap(start, end, r.start, r.end));
}

export function createRental(data: Omit<Rental, "id" | "createdAt" | "status">) {
  const ok = isItemAvailable(data.itemId, data.start, data.end);
  if (!ok) return { error: "Item is not available for the selected dates." as const };
  const id = crypto.randomUUID();
  const rental: Rental = { ...data, id, createdAt: new Date().toISOString(), status: "active" };
  addRental(rental);
  return { rental };
}

export function listRentals() {
  const rentals = readRentals();
  return rentals.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function cancelRental(id: string) {
  const rentals = readRentals();
  const r = rentals.find((x) => x.id === id);
  if (!r) return { error: "Not found" as const };
  r.status = "canceled";
  const ok = updateRentalInStorage(id, r);
  if (!ok) return { error: "Not found" as const };
  return { ok: true as const };
}

