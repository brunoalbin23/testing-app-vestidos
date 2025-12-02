"use client";

import { useState, FormEvent } from "react";
import type { Item, Category } from "@/lib/types";

type ItemFormProps = {
  item?: Item;
  csrf: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function ItemForm({ item, csrf, onSuccess, onCancel }: ItemFormProps) {
  const [name, setName] = useState(item?.name || "");
  const [category, setCategory] = useState<Category>(item?.category || "dress");
  const [pricePerDay, setPricePerDay] = useState(item?.pricePerDay.toString() || "");
  const [sizes, setSizes] = useState(item?.sizes.join(", ") || "");
  const [color, setColor] = useState(item?.color || "");
  const [style, setStyle] = useState(item?.style || "");
  const [description, setDescription] = useState(item?.description || "");
  const [images, setImages] = useState(item?.images.join(", ") || "");
  const [alt, setAlt] = useState(item?.alt || "");
  const [stock, setStock] = useState(item?.stock?.toString() || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Obtener el token CSRF de la cookie del navegador
      function getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
      }
      
      const cookieToken = getCookie('gr_csrf') || csrf;
      
      const formData = new FormData();
      formData.append("csrf", cookieToken);
      formData.append("name", name.trim());
      formData.append("category", category);
      formData.append("pricePerDay", pricePerDay);
      formData.append("sizes", sizes.trim());
      formData.append("color", color.trim());
      if (style) formData.append("style", style.trim());
      formData.append("description", description.trim());
      formData.append("images", images.trim());
      formData.append("alt", alt.trim());
      if (stock) formData.append("stock", stock);

      const url = item ? `/api/admin/items/${item.id}` : "/api/admin/items";
      const method = item ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "An error occurred. Please try again.");
        setIsSubmitting(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Item form error:", err);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20 p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="dress">Dress</option>
            <option value="shoes">Shoes</option>
            <option value="bag">Bag</option>
            <option value="jacket">Jacket</option>
          </select>
        </div>

        <div>
          <label htmlFor="pricePerDay" className="block text-sm font-medium mb-1">
            Price per day ($) *
          </label>
          <input
            id="pricePerDay"
            name="pricePerDay"
            type="number"
            min="0"
            step="0.01"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label htmlFor="sizes" className="block text-sm font-medium mb-1">
            Sizes (comma-separated) *
          </label>
          <input
            id="sizes"
            name="sizes"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="XS, S, M, L, XL"
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Color *
          </label>
          <input
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium mb-1">
            Style (optional)
          </label>
          <input
            id="style"
            name="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium mb-1">
            Stock quantity (optional)
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium mb-1">
            Images (comma-separated paths) *
          </label>
          <input
            id="images"
            name="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="/images/dresses/example.jpg"
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
        />
      </div>

      <div>
        <label htmlFor="alt" className="block text-sm font-medium mb-1">
          Alt text (for images) *
        </label>
        <input
          id="alt"
          name="alt"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
        />
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-medium hover:bg-fuchsia-500 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : item ? "Update Item" : "Create Item"}
        </button>
      </div>
    </form>
  );
}


