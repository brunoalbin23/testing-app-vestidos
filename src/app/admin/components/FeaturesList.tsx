"use client";

import { useState } from "react";

interface FeatureItem {
  name: string;
  endpoint?: string;
  description?: string;
  status: string;
}

interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

const features: FeatureCategory[] = [
  {
    category: "Autenticación",
    items: [
      { name: "Iniciar Sesión", endpoint: "POST /api/admin/login", status: "✓" },
      { name: "Cerrar Sesión", endpoint: "POST /api/admin/logout", status: "✓" },
      { name: "Token CSRF", endpoint: "GET /api/admin/csrf", status: "✓" },
    ],
  },
  {
    category: "Gestión de Artículos",
    items: [
      { name: "Listar Artículos", endpoint: "GET /api/admin/items", status: "✓" },
      { name: "Crear Artículo", endpoint: "POST /api/admin/items", status: "✓" },
      { name: "Obtener Artículo", endpoint: "GET /api/admin/items/[id]/get", status: "✓" },
      { name: "Actualizar Artículo", endpoint: "PUT /api/admin/items/[id]", status: "✓" },
      { name: "Eliminar Artículo", endpoint: "DELETE /api/admin/items/[id]", status: "✓" },
      { name: "Actualizar Stock", endpoint: "PUT /api/admin/items/[id]/stock", status: "✓" },
      { name: "Buscar Artículos", endpoint: "GET /api/admin/items/search", status: "✓" },
      { name: "Verificar Disponibilidad", endpoint: "GET /api/admin/items/availability", status: "✓" },
    ],
  },
  {
    category: "Gestión de Alquileres",
    items: [
      { name: "Listar Alquileres", endpoint: "GET /api/admin/rentals", status: "✓" },
      { name: "Obtener Alquiler", endpoint: "GET /api/admin/rentals/[id]", status: "✓" },
      { name: "Cancelar Alquiler", endpoint: "POST /api/admin/rentals/[id]/cancel", status: "✓" },
    ],
  },
  {
    category: "Análisis y Exportación",
    items: [
      { name: "Panel de Control", endpoint: "GET /api/admin/dashboard", status: "✓" },
      { name: "Estadísticas Detalladas", endpoint: "GET /api/admin/stats", status: "✓" },
      { name: "Exportar Datos", endpoint: "GET /api/admin/export", status: "✓" },
    ],
  },
  {
    category: "Características",
    items: [
      { name: "Protección CSRF", description: "Todas las solicitudes que modifican datos", status: "✓" },
      { name: "Validación de Entrada", description: "Validación en el servidor", status: "✓" },
      { name: "Manejo de Errores", description: "Respuestas de error consistentes", status: "✓" },
      { name: "Estadísticas en Tiempo Real", description: "Panel en vivo", status: "✓" },
      { name: "Exportación de Datos", description: "Copia de seguridad JSON", status: "✓" },
      { name: "Búsqueda Avanzada", description: "Filtrar y ordenar", status: "✓" },
    ],
  },
];

export default function FeaturesList() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Features"]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-blue-50 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>✓ ¡Todas las características del backend de administrador han sido implementadas!</strong>
        </p>
      </div>

      {features.map((category) => (
        <div key={category.category} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <button
            onClick={() => toggleCategory(category.category)}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between font-semibold"
          >
            <span>{category.category}</span>
            <span>{expandedCategories.includes(category.category) ? "−" : "+"}</span>
          </button>

          {expandedCategories.includes(category.category) && (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {category.items.map((item, idx) => (
                <div key={idx} className="px-6 py-3 flex items-start justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.endpoint && (
                      <p className="text-xs text-slate-500 font-mono mt-1">{item.endpoint}</p>
                    )}
                    {item.description && (
                      <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    )}
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-semibold">{item.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <h3 className="font-semibold mb-2">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/admin/api-explorer" className="text-blue-600 dark:text-blue-400 hover:underline">
                → Explorador de API
              </a>
            </li>
            <li>
              <a href="ADMIN_API.md" className="text-blue-600 dark:text-blue-400 hover:underline">
                → Documentación de API
              </a>
            </li>
            <li>
              <a href="ADMIN_IMPLEMENTATION.md" className="text-blue-600 dark:text-blue-400 hover:underline">
                → Guía de Implementación
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <h3 className="font-semibold mb-2">Estadísticas Clave</h3>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <li>• 3 endpoints de autenticación</li>
            <li>• 8 endpoints de gestión de artículos</li>
            <li>• 3 endpoints de gestión de alquileres</li>
            <li>• 3 endpoints de análisis y exportación</li>
            <li>• 17 endpoints de API en total</li>
          </ul>
        </div>
      </div>
    </div>
  );
}