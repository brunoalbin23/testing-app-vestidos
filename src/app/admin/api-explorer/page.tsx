import { isAdmin, getOrCreateCsrfToken } from "@/lib/CsrfSessionManagement";
import { redirect } from "next/navigation";
import APIExplorerComponent from "./components/APIExplorer";

export default async function APIExplorer() {
  if (!isAdmin()) redirect("/admin/login");
  const csrf = await getOrCreateCsrfToken();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">API Explorer</h1>
        <a
          href="/admin"
          className="text-sm rounded-lg border px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          ← Back to Dashboard
        </a>
      </div>

      <APIExplorerComponent />

      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Available API Endpoints</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium">GET /api/admin/items</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Get all items in inventory
              </p>
              <a
                href="/api/admin/items"
                target="_blank"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                Open in new tab →
              </a>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">GET /api/admin/rentals</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Get all rental bookings
              </p>
              <a
                href="/api/admin/rentals"
                target="_blank"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                Open in new tab →
              </a>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium">GET /api/admin/csrf</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Get CSRF token for API requests
              </p>
              <a
                href="/api/admin/csrf"
                target="_blank"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                Open in new tab →
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-4">API Documentation</h2>
          
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">POST /api/admin/items</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Create a new item</p>
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs overflow-x-auto">
{`FormData:
- csrf: string (required)
- name: string (required)
- category: "dress" | "shoes" | "bag" | "jacket" (required)
- pricePerDay: number (required)
- sizes: string (comma-separated, required)
- color: string (required)
- style: string (optional)
- description: string (required)
- images: string (comma-separated paths, required)
- alt: string (required)
- stock: number (optional)`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">PUT /api/admin/items/[id]</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Update an existing item</p>
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs overflow-x-auto">
{`FormData (all fields optional except csrf):
- csrf: string (required)
- name, category, pricePerDay, sizes, color, style, description, images, alt, stock`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">DELETE /api/admin/items/[id]</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Delete an item</p>
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs overflow-x-auto">
{`FormData:
- csrf: string (required)`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">PUT /api/admin/items/[id]/stock</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">Update item stock</p>
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs overflow-x-auto">
{`FormData:
- csrf: string (required)
- stock: number (required, non-negative)`}
              </pre>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Test</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Your current CSRF token: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{csrf}</code>
          </p>
          <p className="text-xs text-slate-500">
            You can use this token to make API requests. Use tools like Postman, curl, or the browser console.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Data Location</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            All data is stored in memory in the following files:
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
            <li>• <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">lib/items-service.ts</code> - Items inventory</li>
            <li>• <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">lib/rentals-service.ts</code> - Rentals data</li>
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            Note: Data is reset when the server restarts. For production, connect to a database.
          </p>
        </section>
      </div>
    </div>
  );
}

