"use client";

import { useState, useEffect } from "react";
import { fetchAdminStats, exportData } from "@/lib/admin-client";
import type { AdminStats } from "@/lib/admin-client";

export default function DashboardStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchAdminStats();
        if (data) {
          setStats(data);
        } else {
          setError("No se pudieron cargar las estadísticas");
        }
      } catch (err) {
        setError("No se pudieron cargar las estadísticas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  async function handleExport() {
    setExporting(true);
    try {
      await exportData();
    } catch (err) {
      alert("No se pudieron exportar los datos");
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-slate-500">Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total de Artículos</p>
          <p className="text-2xl font-bold">{stats.stats.totalItems}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Alquileres Activos</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.stats.activeRentals}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Ingresos Totales</p>
          <p className="text-2xl font-bold">${stats.stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Duración Promedio</p>
          <p className="text-2xl font-bold">{stats.stats.averageRentalDuration} días</p>
        </div>
      </div>

      {/* Top items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
          <h3 className="font-semibold mb-4">Artículos Más Alquilados</h3>
          <div className="space-y-3">
            {stats.topItems.length > 0 ? (
              stats.topItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                    {item.totalRentals} alquileres
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Sin datos de alquiler aún</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
          <h3 className="font-semibold mb-4">Artículos con Mayor Ingreso</h3>
          <div className="space-y-3">
            {stats.topRevenue.length > 0 ? (
              stats.topRevenue.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">${item.pricePerDay}/día</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    ${item.totalRevenue.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Sin datos de ingreso aún</p>
            )}
          </div>
        </div>
      </div>

      {/* Botón de exportación */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
        <div>
          <p className="font-medium">Exportar Datos</p> 
          <p className="text-xs text-slate-500">Descargar todos los artículos y alquileres como JSON</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors"
        >
          {exporting ? "Exportando..." : "Exportar"}
        </button>
      </div>
    </div>
  );
}
