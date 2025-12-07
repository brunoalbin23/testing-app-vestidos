"use client";

import { useState, FormEvent } from "react";
import type { Item, Category } from "@/lib/types";

type ItemFormProps = {
  item?: Item;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function ItemForm({ item, onSuccess, onCancel }: ItemFormProps) {
  const [name, setName] = useState(item?.name || "");
  const [category, setCategory] = useState<Category>(item?.category || "dress");
  const [pricePerDay, setPricePerDay] = useState(item?.pricePerDay.toString() || "");
  const [sizes, setSizes] = useState<string[]>(item?.sizes || []);
  const COLOR_OPTIONS = ["Black","Blue", "Burgundy", "Floral", "Green", "Gold", "Red"];
  const [color, setColor] = useState(item?.color || COLOR_OPTIONS[0]);
  const STYLE_OPTIONS = ["Black tie", "Cocktail", "Daytime", "Evening"];
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
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("category", category);
      formData.append("pricePerDay", pricePerDay);
      formData.append("sizes", sizes.join(","));
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
            Nombre *
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
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="dress">Vestido</option>
            <option value="shoes">Zapatos</option>
            <option value="bag">Bolsa</option>
            <option value="jacket">Chaqueta</option>
          </select>
        </div>

        <div>
          <label htmlFor="pricePerDay" className="block text-sm font-medium mb-1">
            Precio por día ($) *
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
          <label className="block text-sm font-medium mb-1">
            Tallas *
          </label>

          <div className="flex flex-wrap gap-3">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSizes([...sizes, size]);
                    } else {
                      setSizes(sizes.filter((s) => s !== size));
                    }
                  }}
                  className="h-4 w-4 rounded border-slate-300 dark:border-slate-700"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Color *
          </label>
          <select
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            {COLOR_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium mb-1">
            Estilo *
          </label>

          <select
            id="style"
            name="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="">Seleccionar estilo...</option>
            {STYLE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium mb-1">
            Cantidad en stock (opcional)
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
            Imágenes (rutas separadas por comas) *
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
          Descripción *
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
          Texto alternativo (para imágenes) *
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
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-medium hover:bg-fuchsia-500 disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : item ? "Actualizar Artículo" : "Crear Artículo"}
        </button>
      </div>
    </form>
  );
}


