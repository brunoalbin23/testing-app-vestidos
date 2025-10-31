"use client";

import { useState, useEffect } from "react";

export default function APIExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    // Obtener token CSRF al cargar el componente
    async function fetchCsrfToken() {
      try {
        const res = await fetch("/api/admin/csrf", {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setCsrfToken(data.token || "");
        }
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
      }
    }
    fetchCsrfToken();
  }, []);

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  async function handleRequest() {
    if (!selectedEndpoint) {
      setError("Please select an endpoint");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      let url = selectedEndpoint.startsWith("/") ? selectedEndpoint : `/${selectedEndpoint}`;
      
      // Reemplazar [id] con el ID del formulario si existe
      if (url.includes("[id]") && formData.id) {
        url = url.replace("[id]", formData.id);
      } else if (url.includes("[id]") && !formData.id) {
        setError("Item ID is required for this endpoint");
        setLoading(false);
        return;
      }
      
      // Intentar obtener token de múltiples fuentes
      let token = csrfToken || getCookie("gr_csrf");
      
      // Si aún no tenemos token, obtenerlo ahora
      if (!token && (method !== "GET")) {
        try {
          const csrfRes = await fetch("/api/admin/csrf", {
            credentials: 'include',
          });
          if (csrfRes.ok) {
            const csrfData = await csrfRes.json();
            token = csrfData.token;
            if (token) setCsrfToken(token);
          }
        } catch (err) {
          console.error("Failed to fetch CSRF:", err);
        }
      }
      
      let options: RequestInit = {
        method,
        credentials: "include",
        headers: {},
      };

      if (method !== "GET" && method !== "DELETE") {
        if (!token) {
          setError("CSRF token not found. Trying to get it...");
          // Intentar una vez más
          const csrfRes = await fetch("/api/admin/csrf", {
            credentials: 'include',
          });
          if (csrfRes.ok) {
            const csrfData = await csrfRes.json();
            token = csrfData.token;
            if (token) setCsrfToken(token);
          }
          
          if (!token) {
            setError("CSRF token not found. Please reload the page or check if you're logged in.");
            setLoading(false);
            return;
          }
        }
        const fd = new FormData();
        fd.append("csrf", token);
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "id" && value) fd.append(key, value);
        });
        options.body = fd;
      } else if (method === "DELETE") {
        if (!token) {
          setError("CSRF token not found. Trying to get it...");
          const csrfRes = await fetch("/api/admin/csrf", {
            credentials: 'include',
          });
          if (csrfRes.ok) {
            const csrfData = await csrfRes.json();
            token = csrfData.token;
            if (token) setCsrfToken(token);
          }
          
          if (!token) {
            setError("CSRF token not found. Please reload the page or check if you're logged in.");
            setLoading(false);
            return;
          }
        }
        const fd = new FormData();
        fd.append("csrf", token);
        options.body = fd;
      }

      const res = await fetch(url, options);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Error ${res.status}: ${res.statusText}`);
      } else {
        setResponse(data);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function getFieldsForEndpoint(): string[] {
    if (selectedEndpoint.includes("/items") && method === "POST") {
      return ["name", "category", "pricePerDay", "sizes", "color", "style", "description", "images", "alt", "stock"];
    }
    if (selectedEndpoint.includes("/items") && method === "PUT") {
      return ["name", "category", "pricePerDay", "sizes", "color", "style", "description", "images", "alt", "stock"];
    }
    if (selectedEndpoint.includes("/stock")) {
      return ["stock"];
    }
    return [];
  }

  const fields = getFieldsForEndpoint();
  const needsId = (method === "PUT" || method === "DELETE") && selectedEndpoint.includes("/items");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold mb-4">Test API Endpoint</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">HTTP Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Endpoint</label>
              <select
                value={selectedEndpoint}
                onChange={(e) => {
                  const optionText = e.target.options[e.target.selectedIndex].text;
                  const endpoint = e.target.value;
                  setSelectedEndpoint(endpoint);
                  setFormData({});
                  
                  // Extraer el método del texto de la opción (ej: "POST /api/admin/items")
                  const methodMatch = optionText.match(/^(GET|POST|PUT|DELETE)/);
                  if (methodMatch) {
                    setMethod(methodMatch[1]);
                  }
                }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
              >
                <option value="">Select endpoint...</option>
                <optgroup label="GET Requests">
                  <option value="/api/admin/items">GET /api/admin/items</option>
                  <option value="/api/admin/rentals">GET /api/admin/rentals</option>
                  <option value="/api/admin/csrf">GET /api/admin/csrf</option>
                </optgroup>
                <optgroup label="POST Requests">
                  <option value="/api/admin/items">POST /api/admin/items</option>
                </optgroup>
                <optgroup label="PUT Requests">
                  <option value="/api/admin/items/[id]">PUT /api/admin/items/[id]</option>
                  <option value="/api/admin/items/[id]/stock">PUT /api/admin/items/[id]/stock</option>
                </optgroup>
                <optgroup label="DELETE Requests">
                  <option value="/api/admin/items/[id]">DELETE /api/admin/items/[id]</option>
                </optgroup>
              </select>
            </div>
          </div>

          {needsId && (
            <div>
              <label className="block text-sm font-medium mb-1">Item ID</label>
              <input
                type="number"
                value={formData.id || ""}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="Enter item ID"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
              />
            </div>
          )}

          {fields.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium">Form Data</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-medium mb-1 capitalize">
                      {field} {field !== "style" && field !== "stock" ? "*" : ""}
                    </label>
                    {field === "description" ? (
                      <textarea
                        value={formData[field] || ""}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        rows={3}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                      />
                    ) : field === "category" ? (
                      <select
                        value={formData[field] || ""}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                      >
                        <option value="">Select category...</option>
                        <option value="dress">dress</option>
                        <option value="shoes">shoes</option>
                        <option value="bag">bag</option>
                        <option value="jacket">jacket</option>
                      </select>
                    ) : (
                      <input
                        type={field === "pricePerDay" || field === "stock" ? "number" : "text"}
                        value={formData[field] || ""}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        placeholder={field === "sizes" ? "XS, S, M, L" : field === "images" ? "/images/dresses/example.jpg" : ""}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {csrfToken && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                CSRF Token: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{csrfToken.slice(0, 20)}...</code>
              </div>
            )}
            <button
              type="button"
              onClick={async () => {
                const res = await fetch("/api/admin/csrf", { credentials: 'include' });
                if (res.ok) {
                  const data = await res.json();
                  setCsrfToken(data.token || "");
                  setError("");
                }
              }}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 underline"
            >
              Refresh CSRF Token
            </button>
          </div>

          <button
            onClick={handleRequest}
            disabled={loading || !selectedEndpoint}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-medium hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20 p-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {response && (
          <div className="mt-4 rounded-xl border border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20 p-4">
            <h3 className="text-sm font-semibold mb-2 text-green-800 dark:text-green-200">Response:</h3>
            <pre className="text-xs bg-white dark:bg-slate-900 p-3 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

