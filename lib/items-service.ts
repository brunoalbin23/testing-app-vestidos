import type { Item, Category } from "./types";

// In-memory store for demo. Replace with a DB in production.
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

// Re-export getItemRentals from rentals-service for convenience
export { getItemRentals } from "./rentals-service";

