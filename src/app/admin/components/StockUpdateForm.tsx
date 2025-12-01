"use client";

import { useState, FormEvent } from "react";
import type { Item } from "@/lib/types";

type StockUpdateFormProps = {
  item: Item;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function StockUpdateForm({ item, onSuccess, onCancel }: StockUpdateFormProps) {
  const [stock, setStock] = useState(item.stock?.toString() || "0");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("stock", stock);

      const response = await fetch(`/api/admin/items/${item.id}/stock`, {
        method: "PUT",
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
      console.error("Stock update error:", err);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Update Stock: {item.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Current stock: {item.stock !== undefined ? item.stock : "Not set"}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20 p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="stock" className="block text-sm font-medium mb-1">
          Stock Quantity *
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
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
          {isSubmitting ? "Updating..." : "Update Stock"}
        </button>
      </div>
    </form>
  );
}


