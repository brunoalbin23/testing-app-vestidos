export type Category = "dress" | "shoes" | "bag" | "jacket";

export type Item = {
  id: number;
  name: string;
  category: Category;
  pricePerDay: number;
  sizes: string[]; // for shoes you can use "36-41"
  color: string;
  style?: string;
  description: string;
  images: string[];
  alt: string;
};

export type Rental = {
  id: string;
  itemId: number;
  start: string; // ISO date (yyyy-mm-dd)
  end: string;   // ISO date (yyyy-mm-dd)
  customer: { name: string; email: string; phone: string };
  createdAt: string;
  status: "active" | "canceled";
};

