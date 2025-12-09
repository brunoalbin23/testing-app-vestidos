"use client";

import { useState, useEffect } from "react";
import type { Item } from "@/lib/types";
import ItemForm from "./ItemForm";
import StockUpdateForm from "./StockUpdateForm";

type InventoryManagementProps = {
  initialItems: Item[];
};

export default function InventoryManagement({ initialItems }: InventoryManagementProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [updatingStockId, setUpdatingStockId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    // No need for CSRF setup with JWT
  }, []);

  async function refreshItems() {
    const response = await fetch("/api/admin/items", {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setItems(data.items);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/items/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

      if (response.ok) {
        await refreshItems();
      } else {
        alert("Failed to delete item");
      }
    } catch (err) {
      alert("An error occurred");
    } finally {
      setDeletingId(null);
    }
  }

  function handleEdit(item: Item) {
    setEditingItem(item);
    setShowCreateForm(false);
    setUpdatingStockId(null);
  }

  function handleCancel() {
    setEditingItem(null);
    setShowCreateForm(false);
    setUpdatingStockId(null);
  }

  async function handleSuccess() {
    await refreshItems();
    handleCancel();
  }

  function handleCreate() {
    setShowCreateForm(true);
    setEditingItem(null);
    setUpdatingStockId(null);
  }

  function handleUpdateStock(id: number) {
    setUpdatingStockId(id);
    setEditingItem(null);
    setShowCreateForm(false);
  }

  if (showCreateForm) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
        <h3 className="text-lg font-semibold mb-4">Crear Nuevo Artículo</h3>
        <ItemForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    );
  }

  if (editingItem) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
        <h3 className="text-lg font-semibold mb-4">Editar Artículo: {editingItem.name}</h3>
        <ItemForm item={editingItem} onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {items.length} {items.length === 1 ? "artículo" : "artículos"} en inventario
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-medium hover:bg-fuchsia-500 transition-colors"
        >
          + Agregar Artículo
        </button>
      </div>

      {updatingStockId && (
        <div className="mb-6 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
          <StockUpdateForm
            item={items.find((i) => i.id === updatingStockId)!}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr className="text-left">
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-4 font-semibold">Nombre</th>
              <th className="py-3 px-4 font-semibold">Categoría</th>
              <th className="py-3 px-4 font-semibold">Tallas</th>
              <th className="py-3 px-4 font-semibold">Precio/día</th>
              <th className="py-3 px-4 font-semibold">Stock</th>
              <th className="py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4 font-medium">{item.name}</td>
                <td className="py-3 px-4 capitalize">{item.category}</td>
                <td className="py-3 px-4">{item.sizes.join(", ")}</td>
                <td className="py-3 px-4">${item.pricePerDay}</td>
                <td className="py-3 px-4">
                  {item.stock !== undefined ? (
                    <span className={item.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {item.stock}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleUpdateStock(item.id)}
                      className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Stock
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="px-3 py-1 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
                    >
                      {deletingId === item.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  Sin artículos en inventario. Haz clic en "Agregar Artículo" para comenzar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}