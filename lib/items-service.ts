import type { Item, Category } from "./types";

const items: Item[] = [
  {
    id: 1,
    name: "Silk Evening Gown",
    category: "dress",
    pricePerDay: 79,
    sizes: ["XS", "S", "M", "L"],
    color: "champagne",
    style: "evening",
    description: "Luxurious silk gown with flattering silhouette.",
    images: ["/images/dresses/silk-evening-gown.jpg"],
    alt: "Model wearing a champagne silk evening gown",
  },
  {
    id: 2,
    name: "Black Tie Dress",
    category: "dress",
    pricePerDay: 99,
    sizes: ["S", "M", "L", "XL"],
    color: "black",
    style: "black-tie",
    description: "Elegant black-tie dress for formal events.",
    images: ["/images/dresses/black-tie-dress.jpg"],
    alt: "Elegant black tie dress",
  },
  {
    id: 3,
    name: "Floral Midi Dress",
    category: "dress",
    pricePerDay: 49,
    sizes: ["XS", "S", "M"],
    color: "floral",
    style: "daytime",
    description: "Bright floral midi for daytime events.",
    images: ["/images/dresses/floral-midi-dress.jpg"],
    alt: "Floral midi dress perfect for daytime events",
  },
  {
    id: 4,
    name: "Velvet Cocktail Dress",
    category: "dress",
    pricePerDay: 59,
    sizes: ["S", "M", "L"],
    color: "burgundy",
    style: "cocktail",
    description: "Rich velvet cocktail dress in deep tones.",
    images: ["/images/dresses/velvet-cocktail-dress.jpg"],
    alt: "Velvet cocktail dress in deep tones",
  },
];

export function listItems(filters?: {
  q?: string;
  category?: Category;
  size?: string;
  color?: string;
  style?: string;
}) {
  const q = filters?.q?.toLowerCase().trim();
  return items.filter((it) => {
    if (filters?.category && it.category !== filters.category) return false;
    if (filters?.size && !it.sizes.includes(filters.size)) return false;
    if (filters?.color && it.color.toLowerCase() !== filters.color.toLowerCase()) return false;
    if (filters?.style && (it.style ?? "").toLowerCase() !== filters.style.toLowerCase()) return false;
    if (q) {
      const hay = [it.name, it.color, it.style ?? "", it.category].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getItem(id: number) {
  return items.find((i) => i.id === id) ?? null;
}

export function getAvailableSizes(): string[] {
  const allSizes = new Set<string>();
  items.forEach((item) => {
    item.sizes.forEach((size) => allSizes.add(size));
  });
  return Array.from(allSizes).sort();
}

export function getAvailableColors(): string[] {
  const allColors = new Set<string>();
  items.forEach((item) => {
    allColors.add(item.color);
  });
  return Array.from(allColors).sort();
}

export function getAvailableStyles(): string[] {
  const allStyles = new Set<string>();
  items.forEach((item) => {
    if (item.style) {
      allStyles.add(item.style);
    }
  });
  return Array.from(allStyles).sort();
}

function getNextId(): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

export function createItem(data: Omit<Item, "id">): Item {
  const newItem: Item = {
    id: getNextId(),
    ...data,
  };
  items.push(newItem);
  return newItem;
}

export function updateItem(id: number, data: Partial<Omit<Item, "id">>): Item | null {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;
  
  items[index] = { ...items[index], ...data };
  return items[index];
}

export function deleteItem(id: number): boolean {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;
  
  items.splice(index, 1);
  return true;
}

export function updateItemStock(id: number, stock: number): Item | null {
  return updateItem(id, { stock });
}

export { getItemRentals } from "./rentals-service";

