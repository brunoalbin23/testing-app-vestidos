import { isAdmin, getOrCreateCsrfToken } from "@/lib/CsrfSessionManagement";
import { listItems, listRentals } from "@/lib/RentalManagementSystem";
import { redirect } from "next/navigation";
import InventoryManagement from "./components/InventoryManagement";
import DashboardStats from "./components/DashboardStats";
import FeaturesList from "./components/FeaturesList";

export default async function Page() {
  const admin = await isAdmin();
  if (!admin) redirect("/admin/login");
  const csrf = await getOrCreateCsrfToken();

  const items = listItems();
  const rentals = listRentals();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel de administración</h1>
        <div className="flex gap-3">
          <a
            href="/admin/api-explorer"
            className="text-sm rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Explorador API
          </a>
          <form action="/api/admin/logout" method="POST">
            <button className="text-sm rounded-lg border px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cerrar sesión</button>
          </form>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Características Implementadas</h2>
        <FeaturesList />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Estadísticas del Dashboard</h2>
        <DashboardStats />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Gestión de Inventario</h2>
        <InventoryManagement initialItems={items} csrf={csrf} />
      </section>

      <section className="mt-10">
        <h2 className="font-semibold">Alquileres Programados</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-4">ID Alquiler</th>
                <th className="py-2 pr-4">Artículo</th>
                <th className="py-2 pr-4">Fechas</th>
                <th className="py-2 pr-4">Cliente</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2 pr-4">{r.id.slice(0, 8)}</td>
                  <td className="py-2 pr-4">{r.itemId}</td>
                  <td className="py-2 pr-4">
                    {r.start} → {r.end}
                  </td>
                  <td className="py-2 pr-4">
                    {r.customer.name}
                    <div className="text-slate-500 text-xs">{r.customer.email} • {r.customer.phone}</div>
                  </td>
                  <td className="py-2 pr-4 capitalize">{r.status === "active" ? "Activo" : "Cancelado"}</td>
                  <td className="py-2 pr-4">
                    {r.status === "active" ? (
                      <form
                        action={`/api/admin/rentals/${r.id}/cancel`}
                        method="POST"
                      >
                        <input type="hidden" name="csrf" value={csrf} />
                        <button className="rounded-lg border px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-800">Cancelar</button>
                      </form>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {rentals.length === 0 && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={6}>Sin alquileres aún.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
